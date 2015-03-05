'use strict';

var isFinite = require('./isFinite');

module.exports = toOrdinal;

/**
 * Converts an integer into its ordinal equivalent.
 * If number is decimal, the decimals will be removed.
 * @example toOrdinal(12) => '12th'
 * @param {number} number
 * @returns {string}
 */
function toOrdinal(number) {
    if (!isFinite(number)) {
        throw new TypeError('Not a finite number');
    }
    var str = String(Math.floor(number));
    var lastChar = str.charAt(str.length - 1);
    return str + (lastChar === '1' ? 'st'
                : lastChar === '2' ? 'nd'
                : lastChar === '3' ? 'rd'
                : 'th');
}