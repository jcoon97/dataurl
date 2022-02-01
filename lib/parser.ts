import { ParsedData, StringifyOptions } from "./types";

enum GroupName {
    CHARSET = "charset",
    DATA = "data",
    ENCODED = "encoded",
    MIME = "mime"
}

interface DataRegex {
    dataUrl: RegExp;
    newlines: RegExp;
}

const REGEX: DataRegex = {
    dataUrl: /data:(?<mime>.*?)(?:;charset=(?<charset>.*?))?(?<encoded>;base64)?,(?<data>.+)/i,
    newlines: /(\r)|(\n)/g
};

export const convertDataUrl = (options: StringifyOptions): string => stringifyDataUrl(options);

export const formatDataUrl = (options: StringifyOptions): string => stringifyDataUrl(options);

function isString(type: unknown): boolean {
    return typeof type === "string";
}

function makeDataUrl(data: Buffer | string, header: string): string {
    return header + Buffer.from(data).toString("base64");
}

function makeHeader(options: StringifyOptions): string {
    let urlTemplate = `data:${options.mimetype}`;
    if (options.charset) urlTemplate += `;charset=${options.charset}`;
    if (options.encoded !== false) urlTemplate += `;base64`;
    urlTemplate += `,`;
    return urlTemplate;
}

export function parseDataUrl(str: string): ParsedData | false {
    let match: RegExpExecArray | null;
    if (!isString(str)) return false;
    str = stripNewlines(str);
    if (!(match = REGEX.dataUrl.exec(str))) return false;
    if (!match.groups) return false;
    const isEncoded = !!match.groups[GroupName.ENCODED];
    const base64: "base64" | undefined = isEncoded ? "base64" : undefined;
    const data: Buffer = Buffer.from(match.groups[GroupName.DATA], base64);
    const charset: BufferEncoding | undefined = match.groups[GroupName.CHARSET] as BufferEncoding;
    const mimetype: string = match.groups[GroupName.MIME] || "text/plain";
    return { charset, data, mimetype };
}

export function stringifyDataUrl(options: StringifyOptions): string {
    const header: string = makeHeader(options);
    return makeDataUrl(options.data, header);
}

function stripNewlines(str: string): string {
    return str.replace(REGEX.newlines, "");
}
