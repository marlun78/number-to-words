'use strict';

var toWordsOrdinal = require('../src/toWordsOrdinal');

describe('toWordsOrdinal', function () {
    var input = 18,
        output = 'eighteenth';
    it('should, if passed ' + input + ', return "' + output + '"',
        function () {
            expect(toWordsOrdinal(input)).toEqual(output);
        });
});