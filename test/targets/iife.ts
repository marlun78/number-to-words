import code from "../../dist/number-to-words.js?raw";
import { loadScript } from "./load-script";

export const { toOrdinal, toWords, toWordsOrdinal } = loadScript(code);
