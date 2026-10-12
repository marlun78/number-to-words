import { makeOrdinal } from "./make-ordinal";
import { toWords } from "./to-words";

/**
 * Converts a number into ordinal words.
 * @example toWordsOrdinal(12) => 'twelfth'
 */
export function toWordsOrdinal(number: number | string): string {
  const words = toWords(number);

  return makeOrdinal(words);
}
