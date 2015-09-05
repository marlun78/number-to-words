'use strict';

var makeOrdinal = typeof require !== 'undefined' ? require('../src/makeOrdinal') : window.numberToWords._makeOrdinal;

describe('makeOrdinal', function () {
    var tests = [
        { input: 'zero', expect: 'zeroth' },
        { input: 'one', expect: 'first' },
        { input: 'two', expect: 'second' },
        { input: 'three', expect: 'third' },
        { input: 'four', expect: 'fourth' },
        { input: 'five', expect: 'fifth' },
        { input: 'six', expect: 'sixth' },
        { input: 'seven', expect: 'seventh' },
        { input: 'eight', expect: 'eighth' },
        { input: 'nine', expect: 'ninth' },
        { input: 'ten', expect: 'tenth' },
        { input: 'eleven', expect: 'eleventh' },
        { input: 'twelve', expect: 'twelfth' },
        { input: 'thirteen', expect: 'thirteenth' },
        { input: 'fourteen', expect: 'fourteenth' },
        { input: 'fifteen', expect: 'fifteenth' },
        { input: 'sixteen', expect: 'sixteenth' },
        { input: 'seventeen', expect: 'seventeenth' },
        { input: 'eighteen', expect: 'eighteenth' },
        { input: 'nineteen', expect: 'nineteenth' },
        { input: 'twenty', expect: 'twentieth' },
        { input: 'twenty-one', expect: 'twenty-first' },
        { input: 'twenty-two', expect: 'twenty-second' },
        { input: 'twenty-three', expect: 'twenty-third' },
        { input: 'twenty-four', expect: 'twenty-fourth' },
        { input: 'twenty-five', expect: 'twenty-fifth' },
        { input: 'twenty-six', expect: 'twenty-sixth' },
        { input: 'twenty-seven', expect: 'twenty-seventh' },
        { input: 'twenty-eight', expect: 'twenty-eighth' },
        { input: 'twenty-nine', expect: 'twenty-ninth' },
        { input: 'thirty', expect: 'thirtieth' },
        { input: 'forty', expect: 'fortieth' },
        { input: 'fifty', expect: 'fiftieth' },
        { input: 'sixty', expect: 'sixtieth' },
        { input: 'seventy', expect: 'seventieth' },
        { input: 'eighty', expect: 'eightieth' },
        { input: 'ninety', expect: 'ninetieth' },
        { input: 'hundred', expect: 'hundredth' },
        { input: 'thousand', expect: 'thousandth' },
        { input: 'million', expect: 'millionth' },
        { input: 'billion', expect: 'billionth' },
        { input: 'trillion', expect: 'trillionth' },
        { input: 'quadrillion', expect: 'quadrillionth' }
    ];

    function addTest(test) {
        it('should, if passed "' + test.input + '", return "' + test.expect + '"', function () {
            expect(makeOrdinal(test.input)).toEqual(test.expect);
        });
    }

    tests.forEach(addTest);
});
