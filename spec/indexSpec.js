'use strict';

var index = typeof require !== 'undefined' ? require('../src') : window.numberToWords;

describe('index', function () {
    it('should expose a toOrdinal method', function () {
        expect(index.toOrdinal).toEqual(jasmine.any(Function));
    });
    it('should expose a toWords method', function () {
        expect(index.toWords).toEqual(jasmine.any(Function));
    });
    it('should expose a toWordsOrdinal method', function () {
        expect(index.toWordsOrdinal).toEqual(jasmine.any(Function));
    });
});
