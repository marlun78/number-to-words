'use strict';

module.exports = numberWords;

// TODO: Write tests - not 100% yet
// TODO: Minimize calls (MAX takes 32 calls)
// TODO: Add support for “st”, “nd”, “rd” and “th”

var TEN             = 10;
var ONE_HUNDRED     = 100;
var ONE_THOUSAND    = 1000;             // 1.000 (3)
var ONE_MILLION     = 1000000;          // 1.000.000 (6)
var ONE_BILLION     = 1000000000;       // 1.000.000.000 (9)
var ONE_TRILLION    = 1000000000000;    // 1.000.000.000.000 (12)
var ONE_QUADRILLION = 1000000000000000; // 1.000.000.000.000.000 (15)
var MAX             = 9007199254740992; // 9.007.199.254.740.992

var lessThanTwenty = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];
var lessThanOneHundred = [
    null, null, 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

if (typeof Number.isFinite !== 'function') {
    Number.isFinite = function isFinite(value) {
        return typeof value === 'number' && isFinite(value);
    };
}

function numberWords(number) {
    return toWords(number);
}

//var iterations = 0;
function toWords(number, words) {
    var remainder, currentWord;

    //iterations++;
    //console.log(iterations, number, words);

    if (!Number.isFinite(number)) throw TypeError;
    if (number === 0) return words ? words.join(' ') : lessThanTwenty[0];
    if (!words) words = [];

    if (number < 20) {
        remainder = 0;
        currentWord = lessThanTwenty[number];

    } else if (number < ONE_HUNDRED) {
        remainder = number % TEN;
        currentWord = lessThanOneHundred[Math.floor(number / TEN)];

    } else if (number < ONE_THOUSAND) {
        remainder = number % ONE_HUNDRED;
        currentWord = toWords(Math.floor(number / ONE_HUNDRED)) + ' hundred';

    } else if (number < ONE_MILLION) {
        remainder = number % ONE_THOUSAND;
        currentWord = toWords(Math.floor(number / ONE_THOUSAND)) + ' thousand';

    } else if (number < ONE_BILLION) {
        remainder = number % ONE_MILLION;
        currentWord = toWords(Math.floor(number / ONE_MILLION)) + ' million';

    } else if (number < ONE_TRILLION) {
        remainder = number % ONE_BILLION;
        currentWord = toWords(Math.floor(number / ONE_BILLION)) + ' billion';

    } else if (number < ONE_QUADRILLION) {
        remainder = number % ONE_TRILLION;
        currentWord = toWords(Math.floor(number / ONE_TRILLION)) + ' trillion';

    } else if (number <= MAX) {
        remainder = number % ONE_QUADRILLION;
        currentWord = toWords(Math.floor(number / ONE_QUADRILLION)) + ' quadrillion';

    }

    words.push(currentWord);
    return toWords(remainder, words);
}
