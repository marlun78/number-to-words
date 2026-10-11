'use strict';

var toWordsOrdinal = typeof require !== 'undefined' ? require('./support/numberToWords').toWordsOrdinal : window.numberToWords.toWordsOrdinal;

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

    // Pins how input is converted to an integer, so the fix for #50 can't change it
    var conversions = [
        { label: '1.9', input: 1.9, expect: 'first' },
        { label: '-1.9', input: -1.9, expect: 'minus first' },
        { label: '-0.5', input: -0.5, expect: 'zeroth' },
        { label: '0.000001', input: 0.000001, expect: 'zeroth' }
    ];

    conversions.forEach(function (test) {
        it('should, if passed ' + test.label + ', return "' + test.expect + '"', function () {
            expect(toWordsOrdinal(test.input)).toEqual(test.expect);
        });
    });

    it('should throw a TypeError if passed a value that is not a finite number', function () {
        expect(function () {
            toWordsOrdinal(NaN);
        }).toThrowError(TypeError, /Not a finite number/);
    });

    // #50: parseInt() read exponent notation as its leading digit, e.g. 1e21 ('1e+21') became 1
    [1e21, -1e21].forEach(function (input) {
        it('should throw a RangeError if passed ' + input, function () {
            expect(function () {
                toWordsOrdinal(input);
            }).toThrowError(RangeError, /Input is not a safe number/);
        });
    });

    [2e-7, -2e-7].forEach(function (input) {
        it('should, if passed ' + input + ', return "zeroth"', function () {
            expect(toWordsOrdinal(input)).toEqual('zeroth');
        });
    });
});
