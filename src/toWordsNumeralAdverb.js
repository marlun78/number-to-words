'use strict';

var toWords = require('./toWords');

numeralAdverbsLessThanFour = {
    one: 'once',
    two: 'twice',
    three: 'thrice'
}

/**
 * Converts a number into a numeral adverb.
 * @example toWordsNumeralAdverb(12) => 'twelve times'
 * @example toWordsNumeralAdverb(3, false) => 'thrice'
 * @example toWordsNumeralAdverb(3, true) => 'three times'
 * @param {number|string} number
 * @param {boolean} ignoreThrice if thrice should be ignored for those who don't like it 
 * @returns {string}
 */
function toWordsNumeralAdverb(number, ignoreThrice = false) {
    var words = toWords(number);
    if (numeralAdverbsLessThanFour.hasOwnProperty(words) && (number !== 3 || !ignoreThrice)) {
        return numeralAdverbsLessThanFour[words];
    } else {
        return words + ' times';
    }
}

module.exports = toWordsNumeralAdverb;