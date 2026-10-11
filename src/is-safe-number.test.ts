import { describe, expect, it } from 'vitest';
import { isSafeNumber } from './is-safe-number';
import { MAX_SAFE_INTEGER } from './max-safe-integer';

describe('isSafeNumber', () => {
    it('should return true if input is a number between -MAX_SAFE_INTEGER and MAX_SAFE_INTEGER (including)', () => {
        expect(isSafeNumber(-MAX_SAFE_INTEGER)).toBe(true);
        expect(isSafeNumber(-1)).toBe(true);
        expect(isSafeNumber(0)).toBe(true);
        expect(isSafeNumber(1)).toBe(true);
        expect(isSafeNumber(MAX_SAFE_INTEGER)).toBe(true);
    });
    it('should return false if input is too large or too small', () => {
        const unsafe = MAX_SAFE_INTEGER + 100;

        expect(isSafeNumber(unsafe)).toBe(false);
        expect(isSafeNumber(-unsafe)).toBe(false);
    });
    it('should return false if input is not a number', () => {
        // @ts-expect-error: called without input on purpose
        expect(isSafeNumber()).toBe(false);
        expect(isSafeNumber(null)).toBe(false);
        expect(isSafeNumber([])).toBe(false);
        expect(isSafeNumber({})).toBe(false);
        expect(isSafeNumber('')).toBe(false);
        expect(isSafeNumber('x')).toBe(false);
        expect(isSafeNumber(() => {})).toBe(false);
        expect(isSafeNumber(NaN)).toBe(false);
    });
});
