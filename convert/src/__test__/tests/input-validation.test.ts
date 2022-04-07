import { runConvertForTest } from "../utility";
describe("when converting input-validation", () => {
  let converted;
  beforeAll(() => {
    converted = runConvertForTest("input-validation");
  });
  it("then main can be converted to asl", async () => {
    expect(converted.main.asl).toMatchInlineSnapshot(`
      Object {
        "Comment": "ASL Generated using ts2asl version 0.1.29.",
        "StartAt": "Initialize",
        "States": Object {
          "Assign input.delayInSeconds": Object {
            "Comment": undefined,
            "Next": "If (input.delayInSeconds ...",
            "Result": 5,
            "ResultPath": "$.vars.delayInSeconds",
            "Type": "Pass",
          },
          "If (input.delayInSeconds ...": Object {
            "Choices": Array [
              Object {
                "Next": "Throw ValidationError",
                "Or": Array [
                  Object {
                    "NumericGreaterThan": 10,
                    "Variable": "$.vars.delayInSeconds",
                  },
                  Object {
                    "NumericLessThan": 1,
                    "Variable": "$.vars.delayInSeconds",
                  },
                ],
              },
            ],
            "Comment": "source: if (input.delayInSeconds > 10 || input.delayIn ...",
            "Default": "Wait",
            "Type": "Choice",
          },
          "If (typeof input.delayInS ...": Object {
            "Choices": Array [
              Object {
                "Next": "Assign input.delayInSeconds",
                "Not": Object {
                  "And": Array [
                    Object {
                      "IsPresent": true,
                      "Variable": "$.vars.delayInSeconds",
                    },
                    Object {
                      "IsNumeric": true,
                      "Variable": "$.vars.delayInSeconds",
                    },
                  ],
                },
              },
            ],
            "Comment": "source: if (typeof input.delayInSeconds !== \\"number\\")  ...",
            "Default": "If (input.delayInSeconds ...",
            "Type": "Choice",
          },
          "Initialize": Object {
            "Next": "If (typeof input.delayInS ...",
            "Parameters": Object {
              "vars.$": "$$.Execution.Input",
            },
            "ResultPath": "$",
            "Type": "Pass",
          },
          "Return input.delayInSeconds": Object {
            "Comment": undefined,
            "End": true,
            "InputPath": "$.vars.delayInSeconds",
            "Type": "Pass",
          },
          "Throw ValidationError": Object {
            "Cause": "delay in seconds must be numeric value no greater than 10 and no smaller than 1",
            "Comment": "source: throw new ValidationError(\\"delay in seconds mu ...",
            "Error": "ValidationError",
            "Type": "Fail",
          },
          "Wait": Object {
            "Comment": undefined,
            "Next": "Return input.delayInSeconds",
            "SecondsPath": "$.vars.delayInSeconds",
            "Type": "Wait",
          },
        },
      }
    `);
  });
  it("then notEquals can be converted to asl", async () => {
    expect(converted.notEquals.asl).toMatchInlineSnapshot(`
      Object {
        "Comment": "ASL Generated using ts2asl version 0.1.29.",
        "StartAt": "Initialize",
        "States": Object {
          "Assign input.delayInSeconds": Object {
            "Comment": undefined,
            "End": true,
            "Result": 5,
            "ResultPath": "$.vars.delayInSeconds",
            "Type": "Pass",
          },
          "Empty Default Choice": Object {
            "End": true,
            "ResultPath": null,
            "Type": "Pass",
          },
          "If (typeof input.delayInS ...": Object {
            "Choices": Array [
              Object {
                "Next": "Assign input.delayInSeconds",
                "Not": Object {
                  "And": Array [
                    Object {
                      "IsPresent": true,
                      "Variable": "$.vars.delayInSeconds",
                    },
                    Object {
                      "IsNumeric": true,
                      "Variable": "$.vars.delayInSeconds",
                    },
                  ],
                },
              },
            ],
            "Comment": "source: if (typeof input.delayInSeconds != \\"number\\") { ...",
            "Default": "Empty Default Choice",
            "Type": "Choice",
          },
          "Initialize": Object {
            "Next": "If (typeof input.delayInS ...",
            "Parameters": Object {
              "vars.$": "$$.Execution.Input",
            },
            "ResultPath": "$",
            "Type": "Pass",
          },
        },
      }
    `);
  });
});
