import { StringifyOptions } from "./types";

/** @internal */
export function isString(type: unknown): boolean {
    return typeof type === "string";
}

/** @internal */
export function makeDataUrl(data: Buffer | string, header: string): string {
    return header + Buffer.from(data).toString("base64");
}

/** @internal */
export function makeHeader(options: StringifyOptions): string {
    let urlTemplate = `data:${options.mimetype}`;
    if (options.charset) urlTemplate += `;charset=${options.charset}`;
    if (options.encoded !== false) urlTemplate += `;base64`;
    urlTemplate += `,`;
    return urlTemplate;
}
