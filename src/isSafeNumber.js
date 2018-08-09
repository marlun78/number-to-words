'use strict';

var MAX_SAFE_INTEGER = require('./maxSafeInteger');

function isSafeNumber(value) {
    return typeof value === 'number' && Math.abs(value) <= MAX_SAFE_INTEGER;
}

module.exports = isSafeNumber;
