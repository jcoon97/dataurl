# Convert/"Stringify" Data URLs

> Allowed Syntax:
> * `convertDataUrl(options: StringifyOptions): string`
> * `formatDataUrl(options: StringifyOptions): string`
> * `stringifyDataUrl(options: StringifyOptions): string`

If you have, for example, a file that you would like to convert/"stringify" to a data URL, then this can be done using
one of the aforementioned functions. Each function call will require two arguments as described
in [types](#types): `data`, which can be of type `Buffer` or `string`, and `mimetype`, which is of type `string`.

* [Examples](#examples)
* [Types](#types)
* [Final Note](#final-note)

## Examples

`stringifyDataUrl` — "Stringify" an image of a small red dot (example
from [Wikipedia](https://en.wikipedia.org/wiki/Data_URI_scheme#HTML)) to its data URL representation:

```typescript
const TEST_FILE: Buffer = fs.readFileSync(path.join(...));

const result: string = stringifyDataUrl({
    data: TEST_FILE,
    mimetype: "image/png"
});

console.log(result); // data:image/png;base64,iVBORw0KGgoAAAAN...
```

## Types

### StringifyOptions

```typescript
interface StringifyOptions {
    charset?: BufferEncoding;
    data: Buffer | string;
    encoded?: boolean;
    mimetype: string;
}
```

## Final Note

When a convert/"stringify" function is called — `convertDataUrl`, `formatDataUrl`, or `stringifyDataUrl`
— `stringifyDataUrl` will be called internally to process the request. It's up to you to choose which naming convention
you prefer in your code base.