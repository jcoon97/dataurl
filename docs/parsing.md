# Parsing Data URLs

> Allowed Syntax:
> * `parseDataUrl(str: string): ParsedData | false`

If you have a data URL, for example from a file or a web page, represented as a `string`, then you can parse it to its
respective parts — its charset, data, and [media (formerly MIME) type](https://en.wikipedia.org/wiki/Media_type).

* [Examples](#examples)
* [Types](#types)

## Examples

`parseDataUrl` — Parse a small red dot (example from [Wikipedia](https://en.wikipedia.org/wiki/Data_URI_scheme#HTML)):

```typescript
const dataUrl: string = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
const rawData: ParsedData | false = DataUrl2.parse(dataUrl);

if (rawData) {
    const parsedData: ParsedData = rawData as ParsedData;
    console.log("Charset: ", parsedData.charset); // undefined
    console.log("Data: ", parsedData.data); // <Buffer 89 50 4e ...>
    console.log("Media (MIME) Type: ", parsedData.mimetype); // image/png
} else {
    console.error("Failed to parse data URL");
}
```

`parseDataUrl` - Parse a UTF-8 string to a data URL:

```typescript
const charStr: string = "こんにちは世界";
const b64Str: string = Buffer.from(charStr).toString("base64");
const rawDataUrl: string = `data:;charset=utf8;base64,${ b64Str }`;
const rawData: ParsedData | false = DataUrl2.parse(rawDataUrl);

if (rawData) {
    const parsedData: ParsedData = rawData as ParsedData;
    console.log("Charset: ", parsedData.charset); // utf8
    console.log("Data: ", parsedData.data); // <Buffer e3 81 93 ...>
    console.log("Media (MIME) Type: ", parsedData.mimetype); // text/plain
} else {
    console.error("Failed to parse data URL");
}
```

## Types

### ParsedData

```typescript
interface ParsedData {
    charset?: BufferEncoding;
    data: Buffer;
    mimetype: string;
}
```