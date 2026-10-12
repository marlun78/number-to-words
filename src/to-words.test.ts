import { describe, expect, it } from 'vitest';
import { toWords } from 'number-to-words';

// Some tests pass input that the types don't allow
const toWordsAny = toWords as (input: unknown, asOrdinal?: boolean) => string;

describe('toWords', () => {
    const tests = [
        { input: -1, expect: 'minus one' },
        { input: 0, expect: 'zero' },
        { input: 1, expect: 'one' },
        { input: 1.9, expect: 'one' },
        { input: 2, expect: 'two' },
        { input: 3, expect: 'three' },
        { input: 4, expect: 'four' },
        { input: 5, expect: 'five' },
        { input: 6, expect: 'six' },
        { input: 7, expect: 'seven' },
        { input: 8, expect: 'eight' },
        { input: 9, expect: 'nine' },
        { input: 10, expect: 'ten' },
        { input: 11, expect: 'eleven' },
        { input: 12, expect: 'twelve' },
        { input: 13, expect: 'thirteen' },
        { input: 14, expect: 'fourteen' },
        { input: 15, expect: 'fifteen' },
        { input: 16, expect: 'sixteen' },
        { input: 17, expect: 'seventeen' },
        { input: 18, expect: 'eighteen' },
        { input: 19, expect: 'nineteen' },
        { input: 20, expect: 'twenty' },
        { input: 22, expect: 'twenty-two' },
        { input: 33, expect: 'thirty-three' },
        { input: 44, expect: 'forty-four' },
        { input: 55, expect: 'fifty-five' },
        { input: 66, expect: 'sixty-six' },
        { input: 77, expect: 'seventy-seven' },
        { input: 88, expect: 'eighty-eight' },
        { input: 99, expect: 'ninety-nine' },
        { input: 100, expect: 'one hundred' },
        { input: 111, expect: 'one hundred eleven' },
        { input: 1000, expect: 'one thousand' },
        { input: 2222, expect: 'two thousand, two hundred twenty-two' },
        { input: 10000, expect: 'ten thousand' },
        {
            input: 33333,
            expect: 'thirty-three thousand, three hundred thirty-three'
        },
        { input: 100000, expect: 'one hundred thousand' },
        {
            input: 444444,
            expect: 'four hundred forty-four thousand, four hundred forty-four'
        },
        { input: 1000000, expect: 'one million' },
        {
            input: 5555555,
            expect: 'five million, five hundred fifty-five thousand, five hundred fifty-five'
        },
        { input: 10000000, expect: 'ten million' },
        {
            input: 66666666,
            expect: 'sixty-six million, six hundred sixty-six thousand, six hundred sixty-six'
        },
        { input: 100000000, expect: 'one hundred million' },
        {
            input: 777777777,
            expect: 'seven hundred seventy-seven million, seven hundred seventy-seven thousand, seven hundred seventy-seven'
        },
        { input: 1000000000, expect: 'one billion' },
        {
            input: 8888888888,
            expect: 'eight billion, eight hundred eighty-eight million, eight hundred eighty-eight thousand, eight hundred eighty-eight'
        },
        { input: 10000000000, expect: 'ten billion' },
        {
            input: 99999999999,
            expect: 'ninety-nine billion, nine hundred ninety-nine million, nine hundred ninety-nine thousand, nine hundred ninety-nine'
        },
        { input: 100000000000, expect: 'one hundred billion' },
        {
            input: 111111111111,
            expect: 'one hundred eleven billion, one hundred eleven million, one hundred eleven thousand, one hundred eleven'
        },
        { input: 1000000000000, expect: 'one trillion' },
        {
            input: 2222222222222,
            expect: 'two trillion, two hundred twenty-two billion, two hundred twenty-two million, two hundred twenty-two thousand, two hundred twenty-two'
        },
        { input: 10000000000000, expect: 'ten trillion' },
        {
            input: 33333333333333,
            expect: 'thirty-three trillion, three hundred thirty-three billion, three hundred thirty-three million, three hundred thirty-three thousand, three hundred thirty-three'
        },
        { input: 100000000000000, expect: 'one hundred trillion' },
        {
            input: 444444444444444,
            expect: 'four hundred forty-four trillion, four hundred forty-four billion, four hundred forty-four million, four hundred forty-four thousand, four hundred forty-four'
        },
        { input: 1000000000000000, expect: 'one quadrillion' },
        {
            input: 5555555555555555,
            expect: 'five quadrillion, five hundred fifty-five trillion, five hundred fifty-five billion, five hundred fifty-five million, five hundred fifty-five thousand, five hundred fifty-five'
        },
        {
            input: Number.MAX_SAFE_INTEGER,
            expect: 'nine quadrillion, seven trillion, one hundred ninety-nine billion, two hundred fifty-four million, seven hundred forty thousand, nine hundred ninety-one'
        }
    ];

    tests.forEach(test => {
        it(
            'should, if passed ' +
                formatNumber(test.input) +
                ', return ' +
                test.expect,
            () => {
                expect(toWords(test.input)).toBe(test.expect);
            }
        );
    });

    // Note! This is deprecated, use toWordsOrdinal() instead!
    it('should return the number with an ordinal word if passed a second truthy argument', () => {
        expect(toWords(1, true)).toBe('first');
        expect(toWords(2, true)).toBe('second');
        expect(toWords(3, true)).toBe('third');
        expect(toWords(10, true)).toBe('tenth');
        expect(toWords(17, true)).toBe('seventeenth');
        expect(toWords(30, true)).toBe('thirtieth');
        expect(toWords(123, true)).toBe('one hundred twenty-third');
    });

    it('should throw a RangeError if input is greater or lesser than MAX_SAFE_INTEGER', () => {
        const unsafe = Number.MAX_SAFE_INTEGER + 100;

        expect(() => toWords(unsafe)).toThrow(/Input is not a safe number/);
        expect(() => toWords(-unsafe)).toThrow(/Input is not a safe number/);
    });

    // Pins how input is converted to an integer, so the fix for #50 can't change it
    const conversions = [
        { label: '-1.9', input: -1.9, expect: 'minus one' },
        { label: '-0.5', input: -0.5, expect: 'zero' },
        { label: '-0', input: -0, expect: 'zero' },
        { label: '0.000001', input: 0.000001, expect: 'zero' },
        { label: '"12"', input: '12', expect: 'twelve' },
        { label: '"-12.9"', input: '-12.9', expect: 'minus twelve' },
        { label: '" 12"', input: ' 12', expect: 'twelve' },
        { label: '"12abc"', input: '12abc', expect: 'twelve' },
        { label: '"0x1A"', input: '0x1A', expect: 'zero' },
        { label: '[12]', input: [12], expect: 'twelve' }
    ];

    conversions.forEach(test => {
        it(
            'should, if passed ' + test.label + ', return ' + test.expect,
            () => {
                expect(toWordsAny(test.input)).toBe(test.expect);
            }
        );
    });

    const notFinite = [
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

    notFinite.forEach(test => {
        it('should throw a TypeError if passed ' + test.label, () => {
            expect(() => toWordsAny(test.input)).toThrow(TypeError);
            expect(() => toWordsAny(test.input)).toThrow(/Not a finite number/);
        });
    });

    // #50: parseInt() read exponent notation as its leading digit, e.g. 1e21 ('1e+21') became 1
    [1e21, 1.5e21, -1e21, 1e100, Number.MAX_VALUE].forEach(input => {
        it('should throw a RangeError if passed ' + input, () => {
            expect(() => toWords(input)).toThrow(RangeError);
            expect(() => toWords(input)).toThrow(/Input is not a safe number/);
        });
    });

    [1e-7, 2e-7, 1.2345e-7, 9.99e-7, -2e-7, Number.MIN_VALUE].forEach(input => {
        it('should, if passed ' + input + ', return zero', () => {
            expect(toWords(input)).toBe('zero');
        });
    });
});

function formatNumber(number: number): string {
    const result = String(number)
        .split('')
        .reverse()
        .map((num, index) => (index % 3 === 2 ? '.' + num : num))
        .reverse();
    return result.join('') + ' (' + result.length + ')';
}
