import { describe, expect, it } from 'vitest';
import { toWordsOrdinal } from 'number-to-words';

describe('toWordsOrdinal', () => {
    const tests = [
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

    tests.forEach(test => {
        it(
            'should, if passed "' +
                test.input +
                '", return "' +
                test.expect +
                '"',
            () => {
                expect(toWordsOrdinal(test.input)).toBe(test.expect);
            }
        );
    });

    // Pins how input is converted to an integer, so the fix for #50 can't change it
    const conversions = [
        { label: '1.9', input: 1.9, expect: 'first' },
        { label: '-1.9', input: -1.9, expect: 'minus first' },
        { label: '-0.5', input: -0.5, expect: 'zeroth' },
        { label: '0.000001', input: 0.000001, expect: 'zeroth' }
    ];

    conversions.forEach(test => {
        it(
            'should, if passed ' +
                test.label +
                ', return "' +
                test.expect +
                '"',
            () => {
                expect(toWordsOrdinal(test.input)).toBe(test.expect);
            }
        );
    });

    it('should throw a TypeError if passed a value that is not a finite number', () => {
        expect(() => toWordsOrdinal(NaN)).toThrow(TypeError);
        expect(() => toWordsOrdinal(NaN)).toThrow(/Not a finite number/);
    });

    // #50: parseInt() read exponent notation as its leading digit, e.g. 1e21 ('1e+21') became 1
    [1e21, -1e21].forEach(input => {
        it('should throw a RangeError if passed ' + input, () => {
            expect(() => toWordsOrdinal(input)).toThrow(RangeError);
            expect(() => toWordsOrdinal(input)).toThrow(
                /Input is not a safe number/
            );
        });
    });

    [2e-7, -2e-7].forEach(input => {
        it('should, if passed ' + input + ', return "zeroth"', () => {
            expect(toWordsOrdinal(input)).toBe('zeroth');
        });
    });
});
