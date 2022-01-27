import { readFileSync } from "fs";
import { join } from "path";
import { DataUrl2, ParsedData } from "../lib";

const TEST_FILE: Buffer = readFileSync(join(__dirname, "./images/reddot.png"));
const TEST_DATA_URL = `data:image/png;base64,${TEST_FILE.toString("base64")}`;

describe("DataURL2 Tests", () => {
    test("Parse (PNG Image)", () => {
        const rawResponse: ParsedData | false = DataUrl2.parse(TEST_DATA_URL);
        expect(rawResponse).not.toBe(false);

        const parsedResponse: ParsedData = rawResponse as ParsedData;
        expect(parsedResponse.charset).toBeUndefined();
        expect(parsedResponse.data).toEqual(TEST_FILE);
        expect(parsedResponse.mimetype).toEqual("image/png");
    });

    test("Parse (HTML, Un-encoded)", () => {
        const data = "<p>Hello, World</p>";
        const type = "text/html";
        const rawDataUrl = `data:${type},${data}`;
        const rawResponse: ParsedData | false = DataUrl2.parse(rawDataUrl);
        expect(rawResponse).not.toBe(false);

        const parsedResponse: ParsedData = rawResponse as ParsedData;
        expect(parsedResponse.data.toString()).toEqual(data);
        expect(parsedResponse.mimetype).toEqual("text/html");
    });

    test("Parse (Plain, Encoded, UTF-8)", () => {
        const charStr = "我々は空間に浮遊している紳士淑女";
        const dataStr: string = Buffer.from(charStr).toString("base64");
        const rawDataUrl = `data:;charset=utf8;base64,${dataStr}`;
        const rawResponse: ParsedData | false = DataUrl2.parse(rawDataUrl);
        expect(rawResponse).not.toBe(false);

        const parsedResponse: ParsedData = rawResponse as ParsedData;
        expect(parsedResponse.data.toString(parsedResponse.charset as BufferEncoding)).toEqual(charStr);
        expect(parsedResponse.mimetype).toEqual("text/plain");
    });

    test("Convert/Stringify (PNG Image)", () => {
        const result: string = DataUrl2.convert({
            data: TEST_FILE,
            mimetype: "image/png"
        });

        expect(result).toEqual(TEST_DATA_URL);
    });
});
