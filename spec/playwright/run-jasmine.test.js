'use strict';

const path = require('path');
const { test, expect } = require('@playwright/test');

// spec/index.html runs the Jasmine specs against numberToWords.js, so each bundle is served in its place
const BUNDLES = ['numberToWords.js', 'numberToWords.min.js'];

for (const bundle of BUNDLES) {
    test(`Jasmine specs pass against ${bundle}`, async ({ page }) => {
        const pageErrors = [];
        page.on('pageerror', error => pageErrors.push(error.message));
        await page.route('**/numberToWords.js', route =>
            route.fulfill({ path: path.join(__dirname, '..', '..', bundle) })
        );

        await page.goto('/spec/');
        await page.waitForFunction(() => window.jsApiReporter && window.jsApiReporter.finished);

        const result = await page.evaluate(() => {
            const specs = window.jsApiReporter.specs();
            return {
                overallStatus: window.jsApiReporter.runDetails.overallStatus,
                specCount: specs.length,
                failures: specs
                    .filter(spec => spec.status === 'failed')
                    .map(spec => `${spec.fullName}: ${spec.failedExpectations.map(e => e.message).join('; ')}`)
            };
        });

        expect(pageErrors).toEqual([]);
        expect(result.failures).toEqual([]);
        expect(result.specCount).toBeGreaterThan(0);
        expect(result.overallStatus).toBe('passed');
    });
}
