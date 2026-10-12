import { createRequire } from "node:module";
import type * as NumberToWords from "../../src/index";

// Loads the CommonJS build with Node's own require(), the way CommonJS consumers do
const require = createRequire(import.meta.url);
const numberToWords: typeof NumberToWords = require("../../dist/index.cjs");

export const { toOrdinal, toWords, toWordsOrdinal } = numberToWords;
