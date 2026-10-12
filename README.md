[![NPM](https://nodei.co/npm/number-to-words.png)](https://www.npmjs.com/package/number-to-words)

# Number To Words

Contains some util methods for converting numbers into words, ordinal words and
ordinal numbers.

### Install

`npm install number-to-words`

```js
// ES modules
import { toWords } from "number-to-words";

// CommonJS
const { toWords } = require("number-to-words");
```

In a browser without a bundler, a script tag defines a global `numberToWords`:

```html
<script src="https://unpkg.com/number-to-words@2"></script>
<script>
  numberToWords.toWords(13); // => “thirteen”
</script>
```

TypeScript types are included.

### Requirements

Version 2 runs in any ES2015 environment: all current browsers and Node.js 18 or later.
For older environments, such as Internet Explorer or ES3/ES5-only script engines, use version 1.x:
`npm install number-to-words@1`.

### API

#### `toOrdinal(number)`

Converts an integer into a string with an ordinal postfix.
If number is decimal, the decimals will be removed.

```js
var converter = require("number-to-words");
converter.toOrdinal(21); // => “21st”
```

#### `toWords(number)`

Converts an integer into words.
If number is decimal, the decimals will be removed.

```js
var converter = require("number-to-words");
converter.toWords(13); // => “thirteen”

// Decimal numbers:
converter.toWords(2.9); // => “two”

// Negative numbers:
converter.toWords(-3); // => “minus three”

// Large numbers:
converter.toWords(9007199254740991); // => “nine quadrillion, seven trillion, one hundred ninety-nine billion, two hundred fifty-four million, seven hundred forty thousand, nine hundred ninety-one”
```

#### `toWordsOrdinal(number)`

Converts a number into ordinal words.
If number is decimal, the decimals will be removed.

```js
var converter = require("number-to-words");
converter.toWordsOrdinal(21); // => “twenty-first”
```

### Contributions, Comments and Bugs

Contributions, comments and/or bug reports are much appreciated. Open a pull request or add comments on the
[issues page](https://github.com/marlun78/number-to-words/issues). Thanks!

### Development

Working on this package requires Node.js 22 or later, because of the dev tools (Vitest, tsdown).
The published package itself supports Node.js 18 or later.

```sh
npm install
npm test                    # build, then run the specs against the source, ESM and CommonJS builds
npx playwright install      # once, before the first browser test run
npm run test:browser        # run the specs against the browser builds in Chromium, Firefox and WebKit
npm run lint
npm run typecheck
npm run format
```

### Upcoming v2.0

See [roadmap](ROADMAP.md) for details.

### Change Log

##### Version 2.0.0 (unreleased)

- Rewritten in TypeScript and ships its own types. The API is unchanged.
- **Breaking:** requires an ES2015 environment and Node.js 18 or later. Use 1.x for older environments.
- **Breaking:** the package only contains `dist/`. The browser builds moved from `numberToWords.js` and `numberToWords.min.js` to `dist/number-to-words.js` and `dist/number-to-words.min.js`, and deep imports such as `number-to-words/src/toWords` no longer work.
- **Breaking:** no longer published to Bower.
- New ES module build, and a default export so `import numberToWords from 'number-to-words'` keeps working.
- Built with tsdown, tested with Vitest, linted with oxlint and formatted with oxfmt.
- Fixed the `toWords(9007199254740992)` example in this readme, which actually throws a `RangeError`.

##### Version 1.2.5

- Bug fix in `toWords`, `toOrdinal` and `toWordsOrdinal`. Numbers in exponent notation were read as their first digit, e.g. `toWords(1e21)` returned “one” instead of throwing a `RangeError`, and `toWords(2e-7)` returned “two” instead of “zero” ([#50](https://github.com/marlun78/number-to-words/issues/50)). Thanks to @philppplik for the report.

##### Version 1.2.4

- Bug fix in `toOrdinal`. When passed -11, -12 and -13 it returned an incorrect suffix ([#15](https://github.com/marlun78/number-to-words/issues/15)). Thanks to @dmrzn.
- `toOrdinal` and `toWords` now throws a more precise error when passed an unsafe number ([#13](https://github.com/marlun78/number-to-words/pull/13)). Thanks to @adrianomelo.

##### Version 1.2.3

- Bug fix in `isFinite` for Phantom and IE ([#10](https://github.com/marlun78/number-to-words/pull/10)). Thanks to @jeremiahrhall.

##### Version 1.2.2

- Bug fix in `toOrdinal`. Input 11, 12, and 13 now yields the correct suffix ([#8](https://github.com/marlun78/number-to-words/pull/8)). Thanks to @pilyugin.

##### Version 1.2.1

- Bower package

##### Version 1.2.0

- Bundles are now available for browsers (`./numberToWords.js` and `./numberToWords.min.js`). They export a global `numberToWords` variable.
- Made unit tests runnable in browser. To run the unit tests in the browser, start a local server and visit localhost/spec with a browser.
- `toOrdinal`, `toWords` and `toWordsOrdinal` now also allow string values as input (replaced `Math.floor` with `parseInt`).

##### 1.1.0

- New methods `toOrdinal` and `toWordsOrdinal`
- Deprecated `toWords` second optional `asOrdinal` parameter, use `toWordsOrdinal()`-method instead
- `toWords` now converts any decimal input to an integer (with `Math.floor`)
- Bug fixed returning _“zeroth”_ instead of _“zero”_ when converting a number word into its ordinal

##### 1.0.1

- Minor package tweaks

##### 1.0.0

- Initial release
