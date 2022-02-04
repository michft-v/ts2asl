import { testTransform } from "../../__tests__/test-transform";
import { callStatementTransformer } from "../call-statement";

describe("when converting call statements", () => {
  it("statement becomes invoke", () => {
    expect(testTransform("SayHello(arg);", callStatementTransformer))
      .toMatchInlineSnapshot(`
      "asl.typescriptInvoke({
          target: SayHello,
          parameters: () => arg,
          comment: \\"SayHello(arg)\\"
      });"
    `);
  });
  it("statement becomes invoke on property access expression", () => {
    expect(testTransform("SayHello(arg.xxx);", callStatementTransformer))
      .toMatchInlineSnapshot(`
      "asl.typescriptInvoke({
          target: SayHello,
          parameters: () => arg.xxx,
          comment: \\"SayHello(arg.xxx)\\"
      });"
    `);
  });
  it("statement becomes invoke on literal", () => {
    expect(testTransform("SayHello(43);", callStatementTransformer))
      .toMatchInlineSnapshot(`
      "asl.typescriptInvoke({
          target: SayHello,
          parameters: () => 43,
          comment: \\"SayHello(43)\\"
      });"
    `);
  });
  it("statement becomes invoke on literal object expression", () => {
    expect(testTransform("SayHello({ number: 43 });", callStatementTransformer))
      .toMatchInlineSnapshot(`
      "asl.typescriptInvoke({
          target: SayHello,
          parameters: () => ({ number: 43 }),
          comment: \\"SayHello({ number: 43 })\\"
      });"
    `);
  });
  it("statement becomes invoke on bool literal", () => {
    expect(testTransform("SayHello(true);", callStatementTransformer))
      .toMatchInlineSnapshot(`
      "asl.typescriptInvoke({
          target: SayHello,
          parameters: () => true,
          comment: \\"SayHello(true)\\"
      });"
    `);
  });
  it("call statement without args is supported", () => {
    expect(testTransform("SayHello();", callStatementTransformer))
      .toMatchInlineSnapshot(`
      "asl.typescriptInvoke({
          target: SayHello,
          comment: \\"SayHello()\\"
      });"
    `);
  });
  it("call statement with await is supported", () => {
    expect(testTransform("await SayHello();", callStatementTransformer))
      .toMatchInlineSnapshot(`
      "await asl.typescriptInvoke({
          target: SayHello,
          comment: \\"SayHello()\\"
      });"
    `);
  });
  it("call statement inside variable assignment is supported", () => {
    expect(
      testTransform("const z = await SayHello();", callStatementTransformer)
    ).toMatchInlineSnapshot(`
      "const z = await asl.typescriptInvoke({
          target: SayHello,
          comment: \\"SayHello()\\"
      });"
    `);
  });
  it("call statement to ASL is untouched", () => {
    expect(
      testTransform("ASL.Parallel();", callStatementTransformer)
    ).toMatchInlineSnapshot(`"ASL.Parallel();"`);
  });
});
