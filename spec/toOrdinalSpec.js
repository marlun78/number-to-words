'use strict';

var toOrdinal = typeof require !== 'undefined' ? require('./support/numberToWords').toOrdinal : window.numberToWords.toOrdinal;
var MAX_SAFE_INTEGER = 9007199254740991;

describe('toOrdinal', function () {
    var tests = [
        { input: -121, expect: '-121st' },
        { input: -13, expect: '-13th' },
        { input: -12, expect: '-12th' },
        { input: -11, expect: '-11th' },
        { input: -3, expect: '-3rd' },
        { input: -2, expect: '-2nd' },
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

    it('should throw a RangeError if input is greater or lesser than MAX_SAFE_INTEGER', function() {
        var unsafe = MAX_SAFE_INTEGER + 100;

        expect(function() {
            toOrdinal(unsafe);
        }).toThrowError(/Input is not a safe number/);

        expect(function() {
            toOrdinal(-unsafe);
        }).toThrowError(/Input is not a safe number/);
    });

    // Pins how input is converted to an integer, so the fix for #50 can't change it
    var conversions = [
        { label: '-1.9', input: -1.9, expect: '-1st' },
        { label: '-0.5', input: -0.5, expect: '0th' },
        { label: '-0', input: -0, expect: '0th' },
        { label: '0.000001', input: 0.000001, expect: '0th' },
        { label: '"12"', input: '12', expect: '12th' },
        { label: '"-12.9"', input: '-12.9', expect: '-12th' },
        { label: '" 12"', input: ' 12', expect: '12th' },
        { label: '"12abc"', input: '12abc', expect: '12th' },
        { label: '"0x1A"', input: '0x1A', expect: '0th' },
        { label: '[12]', input: [12], expect: '12th' }
    ];

    conversions.forEach(function (test) {
        it('should, if passed ' + test.label + ', return ' + test.expect, function () {
            expect(toOrdinal(test.input)).toEqual(test.expect);
        });
    });

    var notFinite = [
        { label: 'NaN', input: NaN },
        { label: 'Infinity', input: Infinity },
        { label: '-Infinity', input: -Infinity },
        { label: '""', input: '' },
        { label: '"abc"', input: 'abc' },
        { label: 'true', input: true },
        { label: 'null', input: null },
        { label: 'undefined', input: undefined },
        { label: '{}', input: {} }
    ];

    notFinite.forEach(function (test) {
        it('should throw a TypeError if passed ' + test.label, function () {
            expect(function () {
                toOrdinal(test.input);
            }).toThrowError(TypeError, /Not a finite number/);
        });
    });

    // #50: parseInt() read exponent notation as its leading digit, e.g. 1e21 ('1e+21') became 1
    [1e21, 1.5e21, -1e21, 1e100, Number.MAX_VALUE].forEach(function (input) {
        it('should throw a RangeError if passed ' + input, function () {
            expect(function () {
                toOrdinal(input);
            }).toThrowError(RangeError, /Input is not a safe number/);
        });
    });

    [1e-7, 2e-7, 1.2345e-7, 9.99e-7, -2e-7, Number.MIN_VALUE].forEach(function (input) {
        it('should, if passed ' + input + ', return 0th', function () {
            expect(toOrdinal(input)).toEqual('0th');
        });
    });
});
