import { defineConfig } from 'tsdown';
import pkg from './package.json' with { type: 'json' };

const shared = {
    entry: { index: 'src/index.ts' },
    target: 'es2015',
    tsconfig: 'tsconfig.lib.json',
    // Named exports plus a default export are intended, see src/index.ts
    outputOptions: { exports: 'named' as const }
};

// Script-tag builds that define a global `numberToWords`
const iife = {
    ...shared,
    format: 'iife' as const,
    globalName: 'numberToWords',
    platform: 'browser' as const,
    dts: false,
    outputOptions: { ...shared.outputOptions, entryFileNames: '[name].js' },
    banner: `/*! number-to-words v${pkg.version} | ${pkg.license} License | ${pkg.homepage} */`
};

export default defineConfig([
    {
        ...shared,
        format: ['esm', 'cjs'],
        platform: 'neutral',
        dts: true,
        publint: true,
        attw: true
    },
    { ...iife, entry: { 'number-to-words': 'src/index.ts' } },
    { ...iife, entry: { 'number-to-words.min': 'src/index.ts' }, minify: true }
]);
