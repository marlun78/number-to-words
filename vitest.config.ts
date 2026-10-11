import { fileURLToPath } from 'node:url';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

// The specs import the public API as 'number-to-words', and each project points that at a different build
function target(path: string) {
    return {
        alias: [
            {
                find: /^number-to-words$/,
                replacement: fileURLToPath(new URL(path, import.meta.url))
            }
        ]
    };
}

// Specs of internal modules only run against the source
const publicSpecs = {
    include: ['src/**/*.test.ts'],
    exclude: ['src/is-safe-number.test.ts']
};

// A function, because Vitest names each instance after its project, so projects can't share them
function browsers() {
    return {
        enabled: true,
        headless: true,
        provider: playwright(),
        instances: [
            { browser: 'chromium' as const },
            { browser: 'firefox' as const },
            { browser: 'webkit' as const }
        ]
    };
}

export default defineConfig({
    test: {
        projects: [
            {
                resolve: target('./src/index.ts'),
                test: { name: 'src', include: ['src/**/*.test.ts'] }
            },
            {
                resolve: target('./dist/index.js'),
                test: { name: 'esm', ...publicSpecs }
            },
            {
                resolve: target('./test/targets/cjs.ts'),
                test: { name: 'cjs', ...publicSpecs }
            },
            {
                resolve: target('./test/targets/iife.ts'),
                test: { name: 'iife', ...publicSpecs, browser: browsers() }
            },
            {
                resolve: target('./test/targets/iife-min.ts'),
                test: { name: 'iife-min', ...publicSpecs, browser: browsers() }
            }
        ]
    }
});
