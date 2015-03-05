

[![NPM](https://nodei.co/npm/number-to-words.png)](https://www.npmjs.com/package/number-to-words)


# Number To Words
Contains some util methods for converting numbers into words, ordinal words and
ordinal numbers.


### Install
`npm install number-to-words`


### API

##### `toOrdinal(number)`
Converts a number to its ordinal equivalent.
```js
var converter = require('number-to-words');
converter.toOrdinal(21); // => “21st”
```

##### `toWords(number)`
Converts a number to its ordinal equivalent.
```js
var converter = require('number-to-words');
converter.toWords(13); // => “thirteen”

// Negative numbers:
converter.toWords(-3); // => “minus three”

// Large numbers:
converter.toWords(9007199254740992); // => “nine quadrillion, seven trillion, one hundred ninety-nine billion, two hundred fifty-four million, seven hundred forty thousand, nine hundred ninety-two”
```

##### `toWordsOrdinal(number)`
Converts a number to its ordinal equivalent.
```js
var converter = require('number-to-words');
converter.toWordsOrdinal(21); // => “twenty-first”
```


### Comments / Bugs
Comments and bug reports are much appreciated. Please enter them on the [issues page](https://github.com/marlun78/number-to-words/issues). Thanks!


### Change Log

##### 1.1.0
- New methods `toOrdinal` and `toWordsOrdinal`
- Deprecated `toWords` second optional `asOrdinal` parameter
- `toWords` now converts any decimal input to an integer (with `Math.floor`)
- Bug fixed returning _“zeroth”_ instead of _“zero”_ when converting a number word into its ordinal

##### 1.0.1
- Minor package tweaks

##### 1.0.0
- Initial release
