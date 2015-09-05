'use strict';

var toWordsOrdinal = typeof require !== 'undefined' ? require('../src/toWordsOrdinal') : window.numberToWords.toWordsOrdinal;

describe('toWordsOrdinal', function () {
    var input = 18,
        output = 'eighteenth';
    it('should, if passed ' + input + ', return "' + output + '"',
        function () {
            expect(toWordsOrdinal(input)).toEqual(output);
        });
});