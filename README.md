

[![NPM](https://nodei.co/npm/number-to-words.png)](https://www.npmjs.com/package/number-to-words)


# Number To Words
Contains some util methods for converting numbers into words, ordinal words and
ordinal numbers.


### Install
`npm install number-to-words`


### API

#### `toOrdinal(number)`
Converts an integer into a string with an ordinal postfix.
If number is decimal, the decimals will be removed.
```js
var converter = require('number-to-words');
converter.toOrdinal(21); // => “21st”
```

#### `toWords(number)`
Converts an integer into words.
If number is decimal, the decimals will be removed.
```js
var converter = require('number-to-words');
converter.toWords(13); // => “thirteen”

// Decimal numbers:
converter.toWords(2.9); // => “two”

// Negative numbers:
converter.toWords(-3); // => “minus three”

// Large numbers:
converter.toWords(9007199254740992); // => “nine quadrillion, seven trillion, one hundred ninety-nine billion, two hundred fifty-four million, seven hundred forty thousand, nine hundred ninety-two”
```

#### `toWordsOrdinal(number)`
Converts a number into ordinal words.
If number is decimal, the decimals will be removed.
```js
var converter = require('number-to-words');
converter.toWordsOrdinal(21); // => “twenty-first”
```


### Contributions, Comments and Bugs
Contributions, comments and/or bug reports are much appreciated. Open a pull request or add comments on the
[issues page](https://github.com/marlun78/number-to-words/issues). Thanks!


### Upcoming v2.0
See [roadmap](ROADMAP.md) for details.


### Change Log

##### Version 1.2.4 (final 1.x release)
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
