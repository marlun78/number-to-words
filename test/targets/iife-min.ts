import code from "../../dist/number-to-words.min.js?raw";
import { loadScript } from "./load-script";

export const { toOrdinal, toWords, toWordsOrdinal } = loadScript(code);
