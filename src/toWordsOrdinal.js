'use strict';

var makeOrdinal = require('./makeOrdinal');
var toWords = require('./toWords');

module.exports = toWordsOrdinal;

/**
 * Converts a number into ordinal words.
 * @example toWordsOrdinal(12) => 'twelfth'
 * @param {number} number
 * @returns {string}
 */
function toWordsOrdinal(number) {
    var words = toWords(number);
    return makeOrdinal(words);
}