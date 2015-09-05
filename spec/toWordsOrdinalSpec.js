'use strict';

var toWordsOrdinal = typeof require !== 'undefined' ? require('../src/toWordsOrdinal') : window.numberToWords.toWordsOrdinal;

describe('toWordsOrdinal', function () {
    var tests = [
        { input: '0', expect: 'zeroth' },
        { input: '1', expect: 'first' },
        { input: '2', expect: 'second' },
        { input: '3', expect: 'third' },
        { input: '4', expect: 'fourth' },
        { input: '5', expect: 'fifth' },
        { input: '6', expect: 'sixth' },
        { input: '7', expect: 'seventh' },
        { input: '8', expect: 'eighth' },
        { input: '9', expect: 'ninth' },
        { input: '10', expect: 'tenth' },
        { input: '11', expect: 'eleventh' },
        { input: '12', expect: 'twelfth' },
        { input: '13', expect: 'thirteenth' },
        { input: '14', expect: 'fourteenth' },
        { input: '15', expect: 'fifteenth' },
        { input: '16', expect: 'sixteenth' },
        { input: '17', expect: 'seventeenth' },
        { input: '18', expect: 'eighteenth' },
        { input: '19', expect: 'nineteenth' },
        { input: '20', expect: 'twentieth' },
        { input: '21', expect: 'twenty-first' },
        { input: '22', expect: 'twenty-second' },
        { input: '23', expect: 'twenty-third' },
        { input: '24', expect: 'twenty-fourth' },
        { input: '25', expect: 'twenty-fifth' },
        { input: '26', expect: 'twenty-sixth' },
        { input: '27', expect: 'twenty-seventh' },
        { input: '28', expect: 'twenty-eighth' },
        { input: '29', expect: 'twenty-ninth' },
        { input: '30', expect: 'thirtieth' },
        { input: '40', expect: 'fortieth' },
        { input: '50', expect: 'fiftieth' },
        { input: '60', expect: 'sixtieth' },
        { input: '70', expect: 'seventieth' },
        { input: '80', expect: 'eightieth' },
        { input: '90', expect: 'ninetieth' },
        { input: '100', expect: 'one hundredth' },
        { input: '1000', expect: 'one thousandth' },
        { input: '1000000', expect: 'one millionth' },
        { input: '1000000000', expect: 'one billionth' },
        { input: '1000000000000', expect: 'one trillionth' },
        { input: '1000000000000000', expect: 'one quadrillionth' }
    ];

    function addTest(test) {
        it('should, if passed "' + test.input + '", return "' + test.expect + '"', function () {
            expect(toWordsOrdinal(test.input)).toEqual(test.expect);
        });
    }

    tests.forEach(addTest);
});
