import { toOrdinal } from "./to-ordinal";
import { toWords } from "./to-words";
import { toWordsOrdinal } from "./to-words-ordinal";

export { toOrdinal, toWords, toWordsOrdinal };

// Keeps `import numberToWords from 'number-to-words'` working like it did with 1.x
const numberToWords: {
  toOrdinal: typeof toOrdinal;
  toWords: typeof toWords;
  toWordsOrdinal: typeof toWordsOrdinal;
} = { toOrdinal, toWords, toWordsOrdinal };

export default numberToWords;
