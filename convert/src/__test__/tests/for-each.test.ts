import { runConvertForTest } from "../utility";
describe("when converting for-each", () => {
  let converted;
  beforeAll(() => {
    converted = runConvertForTest("for-each");
  });
  it("then simpleForeach can be converted to asl", async () => {
    expect(converted.simpleForeach.asl).toMatchInlineSnapshot(`
      Object {
        "Comment": "ASL Generated using ts2asl version 0.1.29.",
        "StartAt": "Initialize",
        "States": Object {
          "Assign arr": Object {
            "Comment": "source: arr = [1, 2, 3]",
            "Next": "Assign result",
            "Result": Array [
              1,
              2,
              3,
            ],
            "ResultPath": "$.vars.arr",
            "Type": "Pass",
          },
          "Assign first": Object {
            "Comment": "source: first = true",
            "Next": "Foreach Initialize",
            "Result": true,
            "ResultPath": "$.vars.first",
            "Type": "Pass",
          },
          "Assign first_1": Object {
            "Comment": undefined,
            "Next": "Foreach Next",
            "Result": false,
            "ResultPath": "$.vars.first",
            "Type": "Pass",
          },
          "Assign result": Object {
            "Comment": "source: result = \\"\\"",
            "Next": "Assign first",
            "Result": "",
            "ResultPath": "$.vars.result",
            "Type": "Pass",
          },
          "Assign result_1": Object {
            "Comment": undefined,
            "InputPath": "$.tmp.eval.value",
            "Next": "Assign first_1",
            "ResultPath": "$.vars.result",
            "Type": "Pass",
          },
          "Assign result_2": Object {
            "Comment": undefined,
            "InputPath": "$.tmp.eval.value",
            "Next": "Foreach Next",
            "ResultPath": "$.vars.result",
            "Type": "Pass",
          },
          "Evaluate States.Format('{ ...": Object {
            "Comment": "source: result of an expression cannot be placed in In ...",
            "Next": "Assign result_1",
            "Parameters": Object {
              "value.$": "States.Format('{}', $.foreach.currentItem)",
            },
            "ResultPath": "$.tmp.eval",
            "Type": "Pass",
          },
          "Evaluate States.Format('{ ..._1": Object {
            "Comment": "source: result of an expression cannot be placed in In ...",
            "Next": "Assign result_2",
            "Parameters": Object {
              "value.$": "States.Format('{}, {}', $.vars.result, $.foreach.currentItem)",
            },
            "ResultPath": "$.tmp.eval",
            "Type": "Pass",
          },
          "Foreach CheckDone": Object {
            "Choices": Array [
              Object {
                "IsPresent": true,
                "Next": "If (first)",
                "Variable": "$.foreach.items[0]",
              },
            ],
            "Default": "Foreach Exit",
            "Type": "Choice",
          },
          "Foreach Exit": Object {
            "Next": "Return result",
            "Result": Object {},
            "ResultPath": "$.foreach",
            "Type": "Pass",
          },
          "Foreach Initialize": Object {
            "Next": "Foreach CheckDone",
            "Parameters": Object {
              "currentItem.$": "$.vars.arr[0]",
              "items.$": "$.vars.arr",
            },
            "ResultPath": "$.foreach",
            "Type": "Pass",
          },
          "Foreach Next": Object {
            "Next": "Foreach CheckDone",
            "Parameters": Object {
              "currentItem.$": "$.foreach.items[1]",
              "items.$": "$.foreach.items[1:]",
            },
            "ResultPath": "$.foreach",
            "Type": "Pass",
          },
          "If (first)": Object {
            "Choices": Array [
              Object {
                "Next": "Evaluate States.Format('{ ...",
                "Not": Object {
                  "BooleanEquals": false,
                  "Variable": "$.vars.first",
                },
              },
            ],
            "Comment": "source: if (first) { //first element should not be pre ...",
            "Default": "Evaluate States.Format('{ ..._1",
            "Type": "Choice",
          },
          "Initialize": Object {
            "Next": "Assign arr",
            "Parameters": Object {
              "vars.$": "$$.Execution.Input",
            },
            "ResultPath": "$",
            "Type": "Pass",
          },
          "Return result": Object {
            "Comment": undefined,
            "End": true,
            "InputPath": "$.vars.result",
            "Type": "Pass",
          },
        },
      }
    `);
  });
  it("then foreachWithBreak can be converted to asl", async () => {
    expect(converted.foreachWithBreak.asl).toMatchInlineSnapshot(`
      Object {
        "Comment": "ASL Generated using ts2asl version 0.1.29.",
        "StartAt": "Initialize",
        "States": Object {
          "Assign arr": Object {
            "Comment": "source: arr = [1, 2, 3]",
            "Next": "Assign result",
            "Result": Array [
              1,
              2,
              3,
            ],
            "ResultPath": "$.vars.arr",
            "Type": "Pass",
          },
          "Assign first": Object {
            "Comment": "source: first = true",
            "Next": "Foreach Initialize",
            "Result": true,
            "ResultPath": "$.vars.first",
            "Type": "Pass",
          },
          "Assign first_1": Object {
            "Comment": undefined,
            "Next": "If (item === 2)",
            "Result": false,
            "ResultPath": "$.vars.first",
            "Type": "Pass",
          },
          "Assign result": Object {
            "Comment": "source: result = \\"\\"",
            "Next": "Assign first",
            "Result": "",
            "ResultPath": "$.vars.result",
            "Type": "Pass",
          },
          "Assign result_1": Object {
            "Comment": undefined,
            "InputPath": "$.tmp.eval.value",
            "Next": "Assign first_1",
            "ResultPath": "$.vars.result",
            "Type": "Pass",
          },
          "Assign result_2": Object {
            "Comment": undefined,
            "InputPath": "$.tmp.eval.value",
            "Next": "If (item === 2)",
            "ResultPath": "$.vars.result",
            "Type": "Pass",
          },
          "Break": Object {
            "Comment": undefined,
            "Next": "Foreach Exit",
            "ResultPath": null,
            "Type": "Pass",
          },
          "Evaluate States.Format('{ ...": Object {
            "Comment": "source: result of an expression cannot be placed in In ...",
            "Next": "Assign result_1",
            "Parameters": Object {
              "value.$": "States.Format('{}', $.foreach.currentItem)",
            },
            "ResultPath": "$.tmp.eval",
            "Type": "Pass",
          },
          "Evaluate States.Format('{ ..._1": Object {
            "Comment": "source: result of an expression cannot be placed in In ...",
            "Next": "Assign result_2",
            "Parameters": Object {
              "value.$": "States.Format('{}, {}', $.vars.result, $.foreach.currentItem)",
            },
            "ResultPath": "$.tmp.eval",
            "Type": "Pass",
          },
          "Foreach CheckDone": Object {
            "Choices": Array [
              Object {
                "IsPresent": true,
                "Next": "If (first)",
                "Variable": "$.foreach.items[0]",
              },
            ],
            "Default": "Foreach Exit",
            "Type": "Choice",
          },
          "Foreach Exit": Object {
            "Next": "Return result",
            "Result": Object {},
            "ResultPath": "$.foreach",
            "Type": "Pass",
          },
          "Foreach Initialize": Object {
            "Next": "Foreach CheckDone",
            "Parameters": Object {
              "currentItem.$": "$.vars.arr[0]",
              "items.$": "$.vars.arr",
            },
            "ResultPath": "$.foreach",
            "Type": "Pass",
          },
          "Foreach Next": Object {
            "Next": "Foreach CheckDone",
            "Parameters": Object {
              "currentItem.$": "$.foreach.items[1]",
              "items.$": "$.foreach.items[1:]",
            },
            "ResultPath": "$.foreach",
            "Type": "Pass",
          },
          "If (first)": Object {
            "Choices": Array [
              Object {
                "Next": "Evaluate States.Format('{ ...",
                "Not": Object {
                  "BooleanEquals": false,
                  "Variable": "$.vars.first",
                },
              },
            ],
            "Comment": "source: if (first) { //first element should not be pre ...",
            "Default": "Evaluate States.Format('{ ..._1",
            "Type": "Choice",
          },
          "If (item === 2)": Object {
            "Choices": Array [
              Object {
                "Next": "Break",
                "NumericEquals": 2,
                "Variable": "$.foreach.currentItem",
              },
            ],
            "Comment": "source: if (item === 2) { break; // this break will pr ...",
            "Default": "Foreach Next",
            "Type": "Choice",
          },
          "Initialize": Object {
            "Next": "Assign arr",
            "Parameters": Object {
              "vars.$": "$$.Execution.Input",
            },
            "ResultPath": "$",
            "Type": "Pass",
          },
          "Return result": Object {
            "Comment": undefined,
            "End": true,
            "InputPath": "$.vars.result",
            "Type": "Pass",
          },
        },
      }
    `);
  });
  it("then foreachWithContinue can be converted to asl", async () => {
    expect(converted.foreachWithContinue.asl).toMatchInlineSnapshot(`
      Object {
        "Comment": "ASL Generated using ts2asl version 0.1.29.",
        "StartAt": "Initialize",
        "States": Object {
          "Assign arr": Object {
            "Comment": "source: arr = [1, 2, 3]",
            "Next": "Assign result",
            "Result": Array [
              1,
              2,
              3,
            ],
            "ResultPath": "$.vars.arr",
            "Type": "Pass",
          },
          "Assign first": Object {
            "Comment": "source: first = true",
            "Next": "Foreach Initialize",
            "Result": true,
            "ResultPath": "$.vars.first",
            "Type": "Pass",
          },
          "Assign first_1": Object {
            "Comment": undefined,
            "Next": "Foreach Next",
            "Result": false,
            "ResultPath": "$.vars.first",
            "Type": "Pass",
          },
          "Assign result": Object {
            "Comment": "source: result = \\"\\"",
            "Next": "Assign first",
            "Result": "",
            "ResultPath": "$.vars.result",
            "Type": "Pass",
          },
          "Assign result_1": Object {
            "Comment": undefined,
            "InputPath": "$.tmp.eval.value",
            "Next": "Assign first_1",
            "ResultPath": "$.vars.result",
            "Type": "Pass",
          },
          "Assign result_2": Object {
            "Comment": undefined,
            "InputPath": "$.tmp.eval.value",
            "Next": "Foreach Next",
            "ResultPath": "$.vars.result",
            "Type": "Pass",
          },
          "Continue": Object {
            "Comment": undefined,
            "Next": "Foreach Next",
            "ResultPath": null,
            "Type": "Pass",
          },
          "Evaluate States.Format('{ ...": Object {
            "Comment": "source: result of an expression cannot be placed in In ...",
            "Next": "Assign result_1",
            "Parameters": Object {
              "value.$": "States.Format('{}', $.foreach.currentItem)",
            },
            "ResultPath": "$.tmp.eval",
            "Type": "Pass",
          },
          "Evaluate States.Format('{ ..._1": Object {
            "Comment": "source: result of an expression cannot be placed in In ...",
            "Next": "Assign result_2",
            "Parameters": Object {
              "value.$": "States.Format('{}, {}', $.vars.result, $.foreach.currentItem)",
            },
            "ResultPath": "$.tmp.eval",
            "Type": "Pass",
          },
          "Foreach CheckDone": Object {
            "Choices": Array [
              Object {
                "IsPresent": true,
                "Next": "If (item === 2)",
                "Variable": "$.foreach.items[0]",
              },
            ],
            "Default": "Foreach Exit",
            "Type": "Choice",
          },
          "Foreach Exit": Object {
            "Next": "Return result",
            "Result": Object {},
            "ResultPath": "$.foreach",
            "Type": "Pass",
          },
          "Foreach Initialize": Object {
            "Next": "Foreach CheckDone",
            "Parameters": Object {
              "currentItem.$": "$.vars.arr[0]",
              "items.$": "$.vars.arr",
            },
            "ResultPath": "$.foreach",
            "Type": "Pass",
          },
          "Foreach Next": Object {
            "Next": "Foreach CheckDone",
            "Parameters": Object {
              "currentItem.$": "$.foreach.items[1]",
              "items.$": "$.foreach.items[1:]",
            },
            "ResultPath": "$.foreach",
            "Type": "Pass",
          },
          "If (first)": Object {
            "Choices": Array [
              Object {
                "Next": "Evaluate States.Format('{ ...",
                "Not": Object {
                  "BooleanEquals": false,
                  "Variable": "$.vars.first",
                },
              },
            ],
            "Comment": "source: if (first) { //first element should not be pre ...",
            "Default": "Evaluate States.Format('{ ..._1",
            "Type": "Choice",
          },
          "If (item === 2)": Object {
            "Choices": Array [
              Object {
                "Next": "Continue",
                "NumericEquals": 2,
                "Variable": "$.foreach.currentItem",
              },
            ],
            "Comment": "source: if (item === 2) { continue; // this break will ...",
            "Default": "If (first)",
            "Type": "Choice",
          },
          "Initialize": Object {
            "Next": "Assign arr",
            "Parameters": Object {
              "vars.$": "$$.Execution.Input",
            },
            "ResultPath": "$",
            "Type": "Pass",
          },
          "Return result": Object {
            "Comment": undefined,
            "End": true,
            "InputPath": "$.vars.result",
            "Type": "Pass",
          },
        },
      }
    `);
  });
  it("then foreachEarlyReturn can be converted to asl", async () => {
    expect(converted.foreachEarlyReturn.asl).toMatchInlineSnapshot(`
      Object {
        "Comment": "ASL Generated using ts2asl version 0.1.29.",
        "StartAt": "Initialize",
        "States": Object {
          "Assign Return_var": Object {
            "Comment": undefined,
            "InputPath": "$.tmp.eval.value",
            "Next": "Return result",
            "ResultPath": "$.tmp.return_var",
            "Type": "Pass",
          },
          "Assign arr": Object {
            "Comment": "source: arr = [1, 2, 3]",
            "Next": "Foreach Initialize",
            "Result": Array [
              1,
              2,
              3,
            ],
            "ResultPath": "$.vars.arr",
            "Type": "Pass",
          },
          "Evaluate States.Format('f ...": Object {
            "Comment": "source: result of an expression cannot be placed in In ...",
            "Next": "Assign Return_var",
            "Parameters": Object {
              "value.$": "States.Format('found {}!', $.foreach.currentItem)",
            },
            "ResultPath": "$.tmp.eval",
            "Type": "Pass",
          },
          "Foreach CheckDone": Object {
            "Choices": Array [
              Object {
                "IsPresent": true,
                "Next": "If (item === 2)",
                "Variable": "$.foreach.items[0]",
              },
            ],
            "Default": "Foreach Exit",
            "Type": "Choice",
          },
          "Foreach Exit": Object {
            "Next": "Throw Error",
            "Result": Object {},
            "ResultPath": "$.foreach",
            "Type": "Pass",
          },
          "Foreach Initialize": Object {
            "Next": "Foreach CheckDone",
            "Parameters": Object {
              "currentItem.$": "$.vars.arr[0]",
              "items.$": "$.vars.arr",
            },
            "ResultPath": "$.foreach",
            "Type": "Pass",
          },
          "Foreach Next": Object {
            "Next": "Foreach CheckDone",
            "Parameters": Object {
              "currentItem.$": "$.foreach.items[1]",
              "items.$": "$.foreach.items[1:]",
            },
            "ResultPath": "$.foreach",
            "Type": "Pass",
          },
          "If (item === 2)": Object {
            "Choices": Array [
              Object {
                "Next": "Evaluate States.Format('f ...",
                "NumericEquals": 2,
                "Variable": "$.foreach.currentItem",
              },
            ],
            "Comment": "source: if (item === 2) { return \`found \${item}!\`; //r ...",
            "Default": "Foreach Next",
            "Type": "Choice",
          },
          "Initialize": Object {
            "Next": "Assign arr",
            "Parameters": Object {
              "vars.$": "$$.Execution.Input",
            },
            "ResultPath": "$",
            "Type": "Pass",
          },
          "Return result": Object {
            "Comment": undefined,
            "End": true,
            "InputPath": "$.tmp.return_var",
            "Type": "Pass",
          },
          "Throw Error": Object {
            "Cause": "should not get here",
            "Comment": "source: throw new Error(\\"should not get here\\");",
            "Error": "Error",
            "Type": "Fail",
          },
        },
      }
    `);
  });
  it("then nestedForeach can be converted to asl", async () => {
    expect(converted.nestedForeach.asl).toMatchInlineSnapshot(`
      Object {
        "Comment": "ASL Generated using ts2asl version 0.1.29.",
        "StartAt": "Initialize",
        "States": Object {
          "Assign combined": Object {
            "Comment": "source: combined = { number, letter, global, inner: ou ...",
            "Next": "Log (combined)",
            "Parameters": Object {
              "global.$": "$.vars.global",
              "inner.$": "$.vars.outer.middle.inner",
              "letter.$": "$.foreach_2.currentItem",
              "number.$": "$.foreach.currentItem",
            },
            "ResultPath": "$.vars.combined",
            "Type": "Pass",
          },
          "Assign global": Object {
            "Comment": "source: global = \\"prefix\\"",
            "Next": "Assign outer",
            "Result": "prefix",
            "ResultPath": "$.vars.global",
            "Type": "Pass",
          },
          "Assign letters": Object {
            "Comment": "source: letters = [\\"a\\", \\"b\\", \\"c\\", \\"d\\"]",
            "Next": "Assign global",
            "Result": Array [
              "a",
              "b",
              "c",
              "d",
            ],
            "ResultPath": "$.vars.letters",
            "Type": "Pass",
          },
          "Assign numbers": Object {
            "Comment": "source: numbers = [0, 1, 2, 3]",
            "Next": "Assign letters",
            "Result": Array [
              0,
              1,
              2,
              3,
            ],
            "ResultPath": "$.vars.numbers",
            "Type": "Pass",
          },
          "Assign outer": Object {
            "Comment": "source: outer = { middle: { inner: 3 } }",
            "Next": "Foreach Initialize",
            "Result": Object {
              "middle": Object {
                "inner": 3,
              },
            },
            "ResultPath": "$.vars.outer",
            "Type": "Pass",
          },
          "Foreach CheckDone": Object {
            "Choices": Array [
              Object {
                "IsPresent": true,
                "Next": undefined,
                "Variable": "$.foreach.items[0]",
              },
            ],
            "Default": "Foreach Exit",
            "Type": "Choice",
          },
          "Foreach CheckDone 2": Object {
            "Choices": Array [
              Object {
                "IsPresent": true,
                "Next": "Assign combined",
                "Variable": "$.foreach_2.items[0]",
              },
            ],
            "Default": "Foreach Exit 2",
            "Type": "Choice",
          },
          "Foreach Exit": Object {
            "End": true,
            "Result": Object {},
            "ResultPath": "$.foreach",
            "Type": "Pass",
          },
          "Foreach Exit 2": Object {
            "Next": "Foreach Next",
            "Result": Object {},
            "ResultPath": "$.foreach_2",
            "Type": "Pass",
          },
          "Foreach Initialize": Object {
            "Next": "Foreach CheckDone",
            "Parameters": Object {
              "currentItem.$": "$.vars.numbers[0]",
              "items.$": "$.vars.numbers",
            },
            "ResultPath": "$.foreach",
            "Type": "Pass",
          },
          "Foreach Initialize 2": Object {
            "Next": "Foreach CheckDone 2",
            "Parameters": Object {
              "currentItem.$": "$.vars.letters[0]",
              "items.$": "$.vars.letters",
            },
            "ResultPath": "$.foreach_2",
            "Type": "Pass",
          },
          "Foreach Next": Object {
            "Next": "Foreach CheckDone",
            "Parameters": Object {
              "currentItem.$": "$.foreach.items[1]",
              "items.$": "$.foreach.items[1:]",
            },
            "ResultPath": "$.foreach",
            "Type": "Pass",
          },
          "Foreach Next 2": Object {
            "Next": "Foreach CheckDone 2",
            "Parameters": Object {
              "currentItem.$": "$.foreach_2.items[1]",
              "items.$": "$.foreach_2.items[1:]",
            },
            "ResultPath": "$.foreach_2",
            "Type": "Pass",
          },
          "Initialize": Object {
            "Next": "Assign numbers",
            "Parameters": Object {
              "vars.$": "$$.Execution.Input",
            },
            "ResultPath": "$",
            "Type": "Pass",
          },
          "Log (combined)": Object {
            "Comment": "source: console.log(combined)",
            "InputPath": "$.vars.combined",
            "Next": "Foreach Next 2",
            "ResultPath": null,
            "Type": "Pass",
          },
        },
      }
    `);
  });
  it("then emptyForeach can be converted to asl", async () => {
    expect(converted.emptyForeach.asl).toMatchInlineSnapshot(`
      Object {
        "Comment": "ASL Generated using ts2asl version 0.1.29.",
        "StartAt": "Initialize",
        "States": Object {
          "Assign numbers": Object {
            "Comment": "source: numbers = [0, 1, 2, 3]",
            "Next": "Return \\"ok\\"",
            "Result": Array [
              0,
              1,
              2,
              3,
            ],
            "ResultPath": "$.vars.numbers",
            "Type": "Pass",
          },
          "Initialize": Object {
            "Next": "Assign numbers",
            "Parameters": Object {
              "vars.$": "$$.Execution.Input",
            },
            "ResultPath": "$",
            "Type": "Pass",
          },
          "Return \\"ok\\"": Object {
            "Comment": undefined,
            "End": true,
            "Result": "ok",
            "Type": "Pass",
          },
        },
      }
    `);
  });
});
