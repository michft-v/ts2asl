import { runConvertForTest } from "../utility";
describe("when converting switch", () => {
  let converted;
  beforeAll(() => {
    converted = runConvertForTest("switch");
  });
  it("then simpleSwitch can be converted to asl", async () => {
    expect(converted.simpleSwitch.asl).toMatchInlineSnapshot(`
      Object {
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
          "Assign result": Object {
            "Comment": "source: result = \\"\\"",
            "Next": "Foreach Initialize",
            "Result": "",
            "ResultPath": "$.vars.result",
            "Type": "Pass",
          },
          "Assign result_1": Object {
            "Comment": undefined,
            "InputPath": "$.tmp.eval.value",
            "Next": "Foreach Next",
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
          "Assign result_3": Object {
            "Comment": undefined,
            "InputPath": "$.tmp.eval.value",
            "Next": "Foreach Next",
            "ResultPath": "$.vars.result",
            "Type": "Pass",
          },
          "Evaluate Format('{}one', ...": Object {
            "Comment": "source: result of an expression cannot be placed in In ...",
            "Next": "Assign result_1",
            "Parameters": Object {
              "value.$": "States.Format('{}one', $.vars.result)",
            },
            "ResultPath": "$.tmp.eval",
            "Type": "Pass",
          },
          "Evaluate Format('{}three' ...": Object {
            "Comment": "source: result of an expression cannot be placed in In ...",
            "Next": "Assign result_3",
            "Parameters": Object {
              "value.$": "States.Format('{}three', $.vars.result)",
            },
            "ResultPath": "$.tmp.eval",
            "Type": "Pass",
          },
          "Evaluate Format('{}two', ...": Object {
            "Comment": "source: result of an expression cannot be placed in In ...",
            "Next": "Assign result_2",
            "Parameters": Object {
              "value.$": "States.Format('{}two', $.vars.result)",
            },
            "ResultPath": "$.tmp.eval",
            "Type": "Pass",
          },
          "Foreach CheckDone": Object {
            "Choices": Array [
              Object {
                "IsPresent": true,
                "Next": "Switch (item)",
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
          "Switch (item)": Object {
            "Choices": Array [
              Object {
                "Next": "Evaluate Format('{}one', ...",
                "NumericEquals": 1,
                "Variable": "$.foreach.currentItem",
              },
              Object {
                "Next": "Evaluate Format('{}two', ...",
                "NumericEquals": 2,
                "Variable": "$.foreach.currentItem",
              },
            ],
            "Comment": "source: switch (item) { case 1: result = \`\${result}one ...",
            "Default": "Evaluate Format('{}three' ...",
            "Type": "Choice",
          },
        },
      }
    `);
  });
  it("then createAwsAccount can be converted to asl", async () => {
    expect(converted.createAwsAccount.asl).toMatchInlineSnapshot(`
      Object {
        "StartAt": "Initialize",
        "States": Object {
          "Assign creationStatus": Object {
            "Comment": "source: creationStatus: string | undefined = undefined",
            "Next": "Do While Condition",
            "Result": Object {},
            "ResultPath": "$.vars.creationStatus",
            "Type": "Pass",
          },
          "Assign creationStatus_1": Object {
            "Comment": undefined,
            "InputPath": "$.vars.describeResult.CreateAccountStatus.State",
            "Next": "Switch (creationStatus)",
            "ResultPath": "$.vars.creationStatus",
            "Type": "Pass",
          },
          "CreateAccount": Object {
            "Comment": undefined,
            "HeartbeatSeconds": undefined,
            "Next": "Assign creationStatus",
            "Parameters": Object {
              "AccountName": "test",
              "Email": "something@email.com",
            },
            "Resource": "arn:aws:states:::aws-sdk:organizations:createAccount",
            "ResultPath": "$.vars.createAccount",
            "Retry": undefined,
            "TimeoutSeconds": undefined,
            "Type": "Task",
          },
          "DescribeCreateAccountStatus": Object {
            "Comment": undefined,
            "HeartbeatSeconds": undefined,
            "Next": "Assign creationStatus_1",
            "Parameters": Object {
              "CreateAccountRequestId.$": "$.vars.createAccount.CreateAccountStatus.Id",
            },
            "Resource": "arn:aws:states:::aws-sdk:organizations:describeCreateAccountStatus",
            "ResultPath": "$.vars.describeResult",
            "Retry": undefined,
            "TimeoutSeconds": undefined,
            "Type": "Task",
          },
          "Do While Condition": Object {
            "Choices": Array [
              Object {
                "Next": "DescribeCreateAccountStatus",
                "Not": Object {
                  "StringEquals": "SUCCEEDED",
                  "Variable": "$.vars.creationStatus",
                },
              },
            ],
            "Default": "Log (createAccount.Create ...",
            "Type": "Choice",
          },
          "Initialize": Object {
            "Next": "CreateAccount",
            "Parameters": Object {
              "vars.$": "$$.Execution.Input",
            },
            "ResultPath": "$",
            "Type": "Pass",
          },
          "Log (createAccount.Create ...": Object {
            "Comment": "source: console.log(createAccount.CreateAccountStatus. ...",
            "InputPath": "$.vars.createAccount.CreateAccountStatus.AccountId",
            "Next": "Return createAccount.Crea ...",
            "ResultPath": null,
            "Type": "Pass",
          },
          "Return createAccount.Crea ...": Object {
            "Comment": undefined,
            "End": true,
            "InputPath": "$.vars.createAccount.CreateAccountStatus.AccountId",
            "Type": "Pass",
          },
          "Switch (creationStatus)": Object {
            "Choices": Array [
              Object {
                "Next": "Throw Error",
                "StringEquals": "FAILED",
                "Variable": "$.vars.creationStatus",
              },
              Object {
                "Next": "Wait",
                "StringEquals": "IN_PROGRESS",
                "Variable": "$.vars.creationStatus",
              },
            ],
            "Comment": "source: switch (creationStatus) { case \\"FAILED\\": throw ...",
            "Default": "Do While Condition",
            "Type": "Choice",
          },
          "Throw Error": Object {
            "Cause": "account creation failed",
            "Comment": "source: throw new Error(\\"account creation failed\\");",
            "Error": "Error",
            "Type": "Fail",
          },
          "Wait": Object {
            "Comment": undefined,
            "Next": "Do While Condition",
            "Seconds": 1,
            "Type": "Wait",
          },
        },
      }
    `);
  });
});
