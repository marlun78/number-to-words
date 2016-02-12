'use strict';

var toOrdinal = typeof require !== 'undefined' ? require('../src/toOrdinal') : window.numberToWords.toOrdinal;

describe('toOrdinal', function () {
    var tests = [
        { input: -1, expect: '-1st' },
        { input: 0, expect: '0th' },
        { input: 1, expect: '1st' },
        { input: 1.9, expect: '1st' },
        { input: 2, expect: '2nd' },
        { input: 3, expect: '3rd' },
        { input: 4, expect: '4th' },
        { input: 5, expect: '5th' },
        { input: 6, expect: '6th' },
        { input: 7, expect: '7th' },
        { input: 8, expect: '8th' },
        { input: 9, expect: '9th' },
        { input: 10, expect: '10th' },
        { input: 11, expect: '11th' },
        { input: 12, expect: '12th' },
        { input: 13, expect: '13th' },
        { input: 121, expect: '121st' }
    ];

    function addTest(test) {
        it('should, if passed ' + test.input + ', return ' + test.expect, function () {
            expect(toOrdinal(test.input)).toEqual(test.expect);
        });
    }

    tests.forEach(addTest);
});
