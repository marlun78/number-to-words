'use strict';

var makeOrdinal = require('./makeOrdinal');
var toWords = require('./toWords');

/**
 * Converts a number into ordinal words.
 * @example toWordsOrdinal(12) => 'twelfth'
 * @param {number|string} number
 * @returns {string}
 */
function toWordsOrdinal(number) {
    var words = toWords(number);
    return makeOrdinal(words);
}

module.exports = toWordsOrdinal;
