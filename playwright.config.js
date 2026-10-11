'use strict';

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './spec/playwright',
    forbidOnly: !!process.env.CI,
    reporter: 'list',
    use: {
        baseURL: 'http://localhost:3456'
    },
    projects: [
        { name: 'chromium', use: devices['Desktop Chrome'] },
        { name: 'firefox', use: devices['Desktop Firefox'] },
        { name: 'webkit', use: devices['Desktop Safari'] }
    ],
    webServer: {
        command: 'npm run test:server',
        url: 'http://localhost:3456/spec/',
        reuseExistingServer: !process.env.CI
    }
});
