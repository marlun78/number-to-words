'use strict';

module.exports = numberToWords;

var numberWordsToOrdinal = require('./numberWordsToOrdinal');

var TEN = 10;
var ONE_HUNDRED = 100;
var ONE_THOUSAND = 1000;
var ONE_MILLION = 1000000;
var ONE_BILLION = 1000000000;           //         1.000.000.000 (9)
var ONE_TRILLION = 1000000000000;       //     1.000.000.000.000 (12)
var ONE_QUADRILLION = 1000000000000000; // 1.000.000.000.000.000 (15)
var MAX = 9007199254740992;             // 9.007.199.254.740.992 (15)

var LESS_THAN_TWENTY = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];

var TENTHS_LESS_THAN_HUNDRED = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

if (typeof Number.isFinite !== 'function') {
    Number.isFinite = function isFinite(value) {
        return typeof value === 'number' && isFinite(value);
    };
}

function numberToWords(number, asOrdinal) {
    var words;
    if (!Number.isFinite(number)) {
        throw new TypeError('Not a finite number');
    }
    words = toWords(number);
    return asOrdinal ? numberWordsToOrdinal(words) : words;
}

function toWords(number, words) {
    var remainder, word;

    // We’re done
    if (number === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }

    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];

    } else if (number < ONE_HUNDRED) {
        remainder = number % TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }

    } else if (number < ONE_THOUSAND) {
        remainder = number % ONE_HUNDRED;
        word = toWords(Math.floor(number / ONE_HUNDRED)) + ' hundred';

    } else if (number < ONE_MILLION) {
        remainder = number % ONE_THOUSAND;
        word = toWords(Math.floor(number / ONE_THOUSAND)) + ' thousand,';

    } else if (number < ONE_BILLION) {
        remainder = number % ONE_MILLION;
        word = toWords(Math.floor(number / ONE_MILLION)) + ' million,';

    } else if (number < ONE_TRILLION) {
        remainder = number % ONE_BILLION;
        word = toWords(Math.floor(number / ONE_BILLION)) + ' billion,';

    } else if (number < ONE_QUADRILLION) {
        remainder = number % ONE_TRILLION;
        word = toWords(Math.floor(number / ONE_TRILLION)) + ' trillion,';

    } else if (number <= MAX) {
        remainder = number % ONE_QUADRILLION;
        word = toWords(Math.floor(number / ONE_QUADRILLION)) + ' quadrillion,';
    }

    words.push(word);
    return toWords(remainder, words);
}