'use strict';

// Lets the Node specs run against the source or a built bundle, e.g. `TEST_TARGET=min jasmine`
var TARGETS = {
    src: '../../src',
    bundle: '../../numberToWords.js',
    min: '../../numberToWords.min.js'
};
var target = process.env.TEST_TARGET || 'src';

if (!TARGETS[target]) {
    throw new Error('Unknown TEST_TARGET: ' + target + ' (expected one of: ' + Object.keys(TARGETS).join(', ') + ')');
}

module.exports = require(TARGETS[target]);
