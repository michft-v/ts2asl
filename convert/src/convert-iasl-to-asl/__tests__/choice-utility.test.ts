import { convertToASl } from "..";
import { createChoiceOperator } from "../choice-utility";
import * as iasl from "../../convert-asllib-to-iasl/ast";
import { identifier } from "aws-sdk/clients/frauddetector";

describe("when transpiling simple statements", () => {
  it("then current type operand is used", () => {
    const binaryExpression = {
      lhs: {
        identifier: "something",
        type: "numeric",
        _syntaxKind: iasl.SyntaxKind.Identifier
      } as iasl.Identifier,
      operator: "eq",
      rhs: {
        value: 23,
        _syntaxKind: iasl.SyntaxKind.Literal
      } as iasl.LiteralExpression,
      _syntaxKind: iasl.SyntaxKind.BinaryExpression
    } as iasl.BinaryExpression;

    const result = createChoiceOperator(binaryExpression);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "NumericEquals": 23,
        "Variable": "$.something",
      }
    `);
  });

  it("then not is-present is optimized to is-preset: false", () => {
    const binaryExpression = {
      operator: "not",
      rhs: {
        operator: "is-present",
        rhs: {
          identifier: "something",
          type: "numeric",
          _syntaxKind: iasl.SyntaxKind.Identifier
        },
        _syntaxKind: iasl.SyntaxKind.BinaryExpression
      } as iasl.BinaryExpression,
      _syntaxKind: iasl.SyntaxKind.BinaryExpression
    } as iasl.BinaryExpression;

    const result = createChoiceOperator(binaryExpression);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "IsPresent": false,
        "Variable": "something",
      }
    `);
  });
});

it("then not typeof is optimized to typeof: false", () => {
  const binaryExpression = {
    operator: "not",
    rhs: {
      lhs: {
        operand: {
          identifier: "number",
          type: "unknown",
          _syntaxKind: iasl.SyntaxKind.Identifier
        } as iasl.Identifier,
        _syntaxKind: iasl.SyntaxKind.TypeOfExpression
      } as iasl.TypeOfExpression,
      operator: "eq",
      rhs: {
        value: "number",
        type: "string",
        _syntaxKind: iasl.SyntaxKind.Literal
      } as iasl.LiteralExpression,
      _syntaxKind: iasl.SyntaxKind.BinaryExpression
    } as iasl.BinaryExpression,
    _syntaxKind: iasl.SyntaxKind.BinaryExpression
  } as iasl.BinaryExpression;

  const result = createChoiceOperator(binaryExpression);
  expect(result).toMatchInlineSnapshot(`
    Object {
      "IsNumeric": false,
      "Variable": "$.number",
    }
  `);
});

describe("when transpiling complex statements", () => {
  it("then assignment ends up in result path", () => {
    const binaryExpression = {
      lhs: {
        lhs: {
          lhs: {
            lhs: {
              lhs: {
                identifier: "item.sk.S",
                _syntaxKind: "identifier"
              },
              operator: "eq",
              rhs: {
                identifier: "threshold.metric",
                _syntaxKind: "identifier"
              },
              _syntaxKind: "binary-expression"
            },
            operator: "and",
            rhs: {
              lhs: {
                identifier: "threshold.ceiling",
                _syntaxKind: "identifier"
              },
              operator: "lte",
              rhs: {
                identifier: "numericTotal",
                _syntaxKind: "identifier"
              },
              _syntaxKind: "binary-expression"
            },
            _syntaxKind: "binary-expression"
          },
          operator: "and",
          rhs: {
            lhs: {
              identifier: "threshold.ceiling",
              _syntaxKind: "identifier"
            },
            operator: "gt",
            rhs: {
              identifier: "numericLastSentOnValue",
              _syntaxKind: "identifier"
            },
            _syntaxKind: "binary-expression"
          },
          _syntaxKind: "binary-expression"
        },
        operator: "and",
        rhs: {
          lhs: {
            operator: "not",
            rhs: {
              operator: "is-present",
              rhs: {
                identifier: "item.lastBeginDateValue.S",
                _syntaxKind: "identifier"
              },
              _syntaxKind: "binary-expression"
            },
            _syntaxKind: "binary-expression"
          },
          operator: "or",
          rhs: {
            lhs: {
              identifier: "item.beginDate.S",
              _syntaxKind: "identifier"
            },
            operator: "eq",
            rhs: {
              identifier: "item.lastBeginDateValue.S",
              _syntaxKind: "identifier"
            },
            _syntaxKind: "binary-expression"
          },
          _syntaxKind: "binary-expression"
        },
        _syntaxKind: "binary-expression"
      },
      operator: "or",
      rhs: {
        lhs: {
          lhs: {
            lhs: {
              identifier: "item.sk.S",
              _syntaxKind: "identifier"
            },
            operator: "eq",
            rhs: {
              identifier: "threshold.metric",
              _syntaxKind: "identifier"
            },
            _syntaxKind: "binary-expression"
          },
          operator: "and",
          rhs: {
            lhs: {
              identifier: "threshold.ceiling",
              _syntaxKind: "identifier"
            },
            operator: "lte",
            rhs: {
              identifier: "numericTotal",
              _syntaxKind: "identifier"
            },
            _syntaxKind: "binary-expression"
          },
          _syntaxKind: "binary-expression"
        },
        operator: "and",
        rhs: {
          lhs: {
            operator: "not",
            rhs: {
              operator: "is-present",
              rhs: {
                identifier: "item.lastBeginDateValue.S",
                _syntaxKind: "identifier"
              },
              _syntaxKind: "binary-expression"
            },
            _syntaxKind: "binary-expression"
          },
          operator: "or",
          rhs: {
            lhs: {
              identifier: "item.beginDate.S",
              _syntaxKind: "identifier"
            },
            operator: "eq",
            rhs: {
              identifier: "item.lastBeginDateValue.S",
              _syntaxKind: "identifier"
            },
            _syntaxKind: "binary-expression"
          },
          _syntaxKind: "binary-expression"
        },
        _syntaxKind: "binary-expression"
      },
      _syntaxKind: "binary-expression"
    } as iasl.BinaryExpression;

    const result = createChoiceOperator(binaryExpression);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "Or": Array [
          Object {
            "And": Array [
              Object {
                "And": Array [
                  Object {
                    "And": Array [
                      Object {
                        "StringEqualsPath": "$.threshold.metric",
                        "Variable": "$.item.sk.S",
                      },
                      Object {
                        "StringLessThanEqualsPath": "$.numericTotal",
                        "Variable": "$.threshold.ceiling",
                      },
                    ],
                  },
                  Object {
                    "StringGreaterThanPath": "$.numericLastSentOnValue",
                    "Variable": "$.threshold.ceiling",
                  },
                ],
              },
              Object {
                "Or": Array [
                  Object {
                    "IsPresent": false,
                    "Variable": "item.lastBeginDateValue.S",
                  },
                  Object {
                    "StringEqualsPath": "$.item.lastBeginDateValue.S",
                    "Variable": "$.item.beginDate.S",
                  },
                ],
              },
            ],
          },
          Object {
            "And": Array [
              Object {
                "And": Array [
                  Object {
                    "StringEqualsPath": "$.threshold.metric",
                    "Variable": "$.item.sk.S",
                  },
                  Object {
                    "StringLessThanEqualsPath": "$.numericTotal",
                    "Variable": "$.threshold.ceiling",
                  },
                ],
              },
              Object {
                "Or": Array [
                  Object {
                    "IsPresent": false,
                    "Variable": "item.lastBeginDateValue.S",
                  },
                  Object {
                    "StringEqualsPath": "$.item.lastBeginDateValue.S",
                    "Variable": "$.item.beginDate.S",
                  },
                ],
              },
            ],
          },
        ],
      }
    `);
  });
});
