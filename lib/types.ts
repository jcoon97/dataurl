interface WithCharset {
    charset: BufferEncoding;
}

interface WithData<T> {
    data: T;
}

interface WithEncoded {
    encoded: boolean;
}

interface WithMimeType {
    mimetype: string;
}

export type ParsedData = Partial<WithCharset> & WithData<Buffer> & WithMimeType;

export type StringifyOptions = Partial<WithCharset> & WithData<Buffer | string> & Partial<WithEncoded> & WithMimeType;
