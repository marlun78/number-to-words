// Smoke test of the built package for Node 18 and 20, which Vitest (Node 22+) can't run on.
// Loads the package by its name, so it also checks the "exports" in package.json.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const builds = {
    require: require('number-to-words'),
    import: await import('number-to-words')
};

for (const [name, numberToWords] of Object.entries(builds)) {
    for (const lib of [numberToWords, numberToWords.default]) {
        assert.equal(lib.toWords(13), 'thirteen', name);
        assert.equal(lib.toWords(-3), 'minus three', name);
        assert.equal(lib.toWords(2.9), 'two', name);
        assert.equal(
            lib.toWords(9007199254740991),
            'nine quadrillion, seven trillion, one hundred ninety-nine billion, two hundred fifty-four million, seven hundred forty thousand, nine hundred ninety-one',
            name
        );
        assert.equal(lib.toOrdinal(21), '21st', name);
        assert.equal(lib.toWordsOrdinal(21), 'twenty-first', name);
        assert.throws(() => lib.toWords(1e21), RangeError, name);
        assert.throws(() => lib.toWords(NaN), TypeError, name);
    }
}

console.log('Smoke test passed on Node ' + process.version);
