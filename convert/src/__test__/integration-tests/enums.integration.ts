import { convertDeployExecute } from "../utility";
jest.setTimeout(99999999);

describe("when converting enums", () => {
    it("will execute compareEnum as if it were node", async () => {
        const resultFromSfn = await convertDeployExecute("enums", "compareEnum");
        const { compareEnum } = require("../resources/enums");
        const resultFromNode = await compareEnum();
        expect(resultFromSfn).toEqual(resultFromNode);
    });
    it("will execute compareStringEnum as if it were node", async () => {
        const resultFromSfn = await convertDeployExecute("enums", "compareStringEnum");
        const { compareStringEnum } = require("../resources/enums");
        const resultFromNode = await compareStringEnum();
        expect(resultFromSfn).toEqual(resultFromNode);
    });
});