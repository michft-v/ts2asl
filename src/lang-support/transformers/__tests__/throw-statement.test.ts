import { testTransform } from "../../__tests__/test-transform";
import { throwStatementTransformer } from "../throw-statement";

describe("when converting throw statements", () => {
  it("then throw statement will become ASL.Fail", () => {
    expect(
      testTransform("throw new Error()", throwStatementTransformer)
    ).toMatchInlineSnapshot(
      `
      "ASL.fail({
          error: 'Error',
          comment: 'throw new Error()'
      })"
    `
    );
  });

  it("then throw statement will become ASL.Fail with argument", () => {
    expect(
      testTransform("throw new Error('bad luck')", throwStatementTransformer)
    ).toMatchInlineSnapshot(
      `
      "ASL.fail({
          error: 'Error',
          cause: 'bad luck',
          comment: 'throw new Error(\\\\'bad luck\\\\')'
      })"
    `
    );
  });

  it("then throw statement will become ASL.Fail with argument", () => {
    expect(
      testTransform('throw new Error("bad luck")', throwStatementTransformer)
    ).toMatchInlineSnapshot(

      `
      "ASL.fail({
          error: 'Error',
          cause: 'bad luck',
          comment: 'throw new Error(\\"bad luck\\")'
      })"
    `
    );
  });

  it("then throw statement will become ASL.Fail with argument", () => {
    expect(
      testTransform(
        'throw new SpecialError("bad luck")',
        throwStatementTransformer
      )
    ).toMatchInlineSnapshot(
      `
      "ASL.fail({
          error: 'SpecialError',
          cause: 'bad luck',
          comment: 'throw new SpecialError(\\"bad luck\\")'
      })"
    `
    );
  });

  // it("then throw statement of something ", () => {
  //   expect(testTransform("throw new Error('bad luck')", throwStatementTransformer)).toBe("ASL.Fail('bad luck')");
  // });
});
