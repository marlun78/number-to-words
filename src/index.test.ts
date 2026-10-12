import { describe, expect, it } from "vitest";
import * as index from "number-to-words";

describe("index", () => {
  it("should expose a toOrdinal method", () => {
    expect(index.toOrdinal).toEqual(expect.any(Function));
  });
  it("should expose a toWords method", () => {
    expect(index.toWords).toEqual(expect.any(Function));
  });
  it("should expose a toWordsOrdinal method", () => {
    expect(index.toWordsOrdinal).toEqual(expect.any(Function));
  });
});
