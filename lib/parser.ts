import { ParsedData, StringifyOptions } from "./types";
import { isString, makeDataUrl, makeHeader } from "./utils";

enum GroupName {
    CHARSET = "charset",
    DATA = "data",
    ENCODED = "encoded",
    MIME = "mime"
}

export class DataUrl2 {
    /** @internal */
    private static readonly REGEX: {
        dataUrl: RegExp;
        newlines: RegExp;
    } = {
        dataUrl: /data:(?<mime>.*?)(?:;charset=(?<charset>.*?))?(?<encoded>;base64)?,(?<data>.+)/i,
        newlines: /(\r)|(\n)/g
    };

    static convert(options: StringifyOptions): string {
        return DataUrl2.stringify(options);
    }

    static format(options: StringifyOptions): string {
        return DataUrl2.stringify(options);
    }

    static parse(str: string): ParsedData | false {
        let match: RegExpExecArray | null;
        if (!isString(str)) return false;
        str = DataUrl2.stripNewlines(str);
        if (!(match = DataUrl2.REGEX.dataUrl.exec(str))) return false;
        if (!match.groups) return false;
        const isEncoded = !!match.groups[GroupName.ENCODED];
        const base64: "base64" | undefined = isEncoded ? "base64" : undefined;
        const data: Buffer = Buffer.from(match.groups[GroupName.DATA], base64);
        const charset: BufferEncoding | undefined = match.groups[GroupName.CHARSET] as BufferEncoding;
        const mimetype: string = match.groups[GroupName.MIME] || "text/plain";
        return { charset, data, mimetype };
    }

    static stringify(options: StringifyOptions): string {
        const header: string = makeHeader(options);
        return makeDataUrl(options.data, header);
    }

    /** @internal */
    private static stripNewlines(str: string): string {
        return str.replace(DataUrl2.REGEX.newlines, "");
    }
}
