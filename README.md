# Number To Words
Converts numbers into words.

```JavaScript
var numberConverter = require('number-to-words');
numberConverter.toWords(13);
// “thirteen”
```

Negative numbers:
```JavaScript
numberConverter.toWords(-3);
// “minus three”
```

Large numbers:
```JavaScript
numberConverter.toWords(9007199254740992);
// “nine quadrillion, seven trillion, one hundred ninety-nine billion, two hundred fifty-four million, seven hundred forty thousand, nine hundred ninety-two”
```

As ordinal:
```JavaScript
numberConverter.toWords(21, true);
// “twenty-first”
```
