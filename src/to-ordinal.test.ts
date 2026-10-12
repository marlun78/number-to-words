import { describe, expect, it } from "vitest";
import { toOrdinal } from "number-to-words";

// Some tests pass input that the types don't allow
const toOrdinalAny = toOrdinal as (input: unknown) => string;

describe("toOrdinal", () => {
  const tests = [
    { input: -121, expect: "-121st" },
    { input: -13, expect: "-13th" },
    { input: -12, expect: "-12th" },
    { input: -11, expect: "-11th" },
    { input: -3, expect: "-3rd" },
    { input: -2, expect: "-2nd" },
    { input: -1, expect: "-1st" },
    { input: 0, expect: "0th" },
    { input: 1, expect: "1st" },
    { input: 1.9, expect: "1st" },
    { input: 2, expect: "2nd" },
    { input: 3, expect: "3rd" },
    { input: 4, expect: "4th" },
    { input: 5, expect: "5th" },
    { input: 6, expect: "6th" },
    { input: 7, expect: "7th" },
    { input: 8, expect: "8th" },
    { input: 9, expect: "9th" },
    { input: 10, expect: "10th" },
    { input: 11, expect: "11th" },
    { input: 12, expect: "12th" },
    { input: 13, expect: "13th" },
    { input: 121, expect: "121st" }
  ];

  tests.forEach((test) => {
    it("should, if passed " + test.input + ", return " + test.expect, () => {
      expect(toOrdinal(test.input)).toBe(test.expect);
    });
  });

  it("should throw a RangeError if input is greater or lesser than MAX_SAFE_INTEGER", () => {
    const unsafe = Number.MAX_SAFE_INTEGER + 100;

    expect(() => toOrdinal(unsafe)).toThrow(/Input is not a safe number/);
    expect(() => toOrdinal(-unsafe)).toThrow(/Input is not a safe number/);
  });

  // Pins how input is converted to an integer, so the fix for #50 can't change it
  const conversions = [
    { label: "-1.9", input: -1.9, expect: "-1st" },
    { label: "-0.5", input: -0.5, expect: "0th" },
    { label: "-0", input: -0, expect: "0th" },
    { label: "0.000001", input: 0.000001, expect: "0th" },
    { label: '"12"', input: "12", expect: "12th" },
    { label: '"-12.9"', input: "-12.9", expect: "-12th" },
    { label: '" 12"', input: " 12", expect: "12th" },
    { label: '"12abc"', input: "12abc", expect: "12th" },
    { label: '"0x1A"', input: "0x1A", expect: "0th" },
    { label: "[12]", input: [12], expect: "12th" }
  ];

  conversions.forEach((test) => {
    it("should, if passed " + test.label + ", return " + test.expect, () => {
      expect(toOrdinalAny(test.input)).toBe(test.expect);
    });
  });

  const notFinite = [
    { label: "NaN", input: NaN },
    { label: "Infinity", input: Infinity },
    { label: "-Infinity", input: -Infinity },
    { label: '""', input: "" },
    { label: '"abc"', input: "abc" },
    { label: "true", input: true },
    { label: "null", input: null },
    { label: "undefined", input: undefined },
    { label: "{}", input: {} }
  ];

  notFinite.forEach((test) => {
    it("should throw a TypeError if passed " + test.label, () => {
      expect(() => toOrdinalAny(test.input)).toThrow(TypeError);
      expect(() => toOrdinalAny(test.input)).toThrow(/Not a finite number/);
    });
  });

  // #50: parseInt() read exponent notation as its leading digit, e.g. 1e21 ('1e+21') became 1
  [1e21, 1.5e21, -1e21, 1e100, Number.MAX_VALUE].forEach((input) => {
    it("should throw a RangeError if passed " + input, () => {
      expect(() => toOrdinal(input)).toThrow(RangeError);
      expect(() => toOrdinal(input)).toThrow(/Input is not a safe number/);
    });
  });

  [1e-7, 2e-7, 1.2345e-7, 9.99e-7, -2e-7, Number.MIN_VALUE].forEach((input) => {
    it("should, if passed " + input + ", return 0th", () => {
      expect(toOrdinal(input)).toBe("0th");
    });
  });
});
