import { testTranspile } from "./test-transpile";

describe("when transpiling block statements", () => {
  it("then single statement in block will be single state", () => {
    const code = `
    ASL.Choice({
      Choices: [
          {
              Variable: results[0].status,
              StringEquals: "failed",
              NextInvoke: () => {
                  ASL.Fail({ Error: 'Error', Cause: 'task failed' })
              }
          }
      ]
  });
  `;
    const result = testTranspile(code);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "StartAt": "Choice",
        "States": Object {
          "Choice": Object {
            "Choices": Array [
              Object {
                "Next": "Fail",
                "StringEquals": "failed",
                "Variable": "$.results[0].status",
              },
            ],
            "End": true,
            "Type": "Choice",
          },
          "Fail": Object {
            "Cause": "task failed",
            "Error": "Error",
            "Type": "Fail",
          },
        },
      }
    `);
  });

  it("then multiple statement in block will become parallel with single branch", () => {
    const code = `
    ASL.Choice({
      Choices: [
          {
              Variable: "$.results[0].status",
              StringEquals: "failed",
              NextInvoke: () => {
                  const x = ASL.Invoke({ Resource: 'some-lambda' });
                  ASL.Pass({ data: {name : 'Peter', age: 42} });
              }
          }
      ]
  });
  `;
    const result = testTranspile(code);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "StartAt": "Choice",
        "States": Object {
          "Block": Object {
            "Branches": Array [
              Object {
                "StartAt": "Assign_x",
                "States": Object {
                  "Assign_x": Object {
                    "Next": "Pass",
                    "Resource": "some-lambda",
                    "ResultPath": "$.x",
                    "Type": "Invoke",
                  },
                  "Pass": Object {
                    "End": true,
                    "Type": "Pass",
                    "data": Object {
                      "age": 42,
                      "name": "Peter",
                    },
                  },
                },
              },
            ],
            "Type": "Parallel",
          },
          "Choice": Object {
            "Choices": Array [
              Object {
                "Next": "Block",
                "StringEquals": "failed",
                "Variable": "$.results[0].status",
              },
            ],
            "End": true,
            "Type": "Choice",
          },
        },
      }
    `);
  });
});
