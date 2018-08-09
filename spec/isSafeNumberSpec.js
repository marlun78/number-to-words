'use strict';

var MAX_SAFE_INTEGER = require('../src/maxSafeInteger');
var isSafeNumber = require('../src/isSafeNumber');

describe('isSafeNumber', function() {
    it('should return true if input is a number between -MAX_SAFE_INTEGER and MAX_SAFE_INTEGER (including)', function() {
        expect(isSafeNumber(-MAX_SAFE_INTEGER)).toBe(true);
        expect(isSafeNumber(-1)).toBe(true);
        expect(isSafeNumber(0)).toBe(true);
        expect(isSafeNumber(1)).toBe(true);
        expect(isSafeNumber(MAX_SAFE_INTEGER)).toBe(true);
    });
    it('should return false if input is too large or too small', function() {
        var unsafe = MAX_SAFE_INTEGER + 100;

        expect(isSafeNumber(unsafe)).toBe(false);
        expect(isSafeNumber(-unsafe)).toBe(false);
    });
    it('should return false if input is not a number', function() {
        expect(isSafeNumber()).toBe(false);
        expect(isSafeNumber(null)).toBe(false);
        expect(isSafeNumber([])).toBe(false);
        expect(isSafeNumber({})).toBe(false);
        expect(isSafeNumber('')).toBe(false);
        expect(isSafeNumber('x')).toBe(false);
        expect(isSafeNumber(function() {})).toBe(false);
        expect(isSafeNumber(NaN)).toBe(false);
    });
});
