import { calculateAccuracy } from "@/lib/accuracy";

describe("calculateAccuracy", () => {
  const sentence = "hello world";

  test("returns 100% accuracy for exact match", () => {
    expect(calculateAccuracy("hello world", sentence)).toBe(1);
  });

  test("returns partial accuracy for partially correct text", () => {
    expect(calculateAccuracy("hallo wcrld", sentence)).toBeCloseTo(9 / 11);
  });

  test("returns 0 for completely wrong text", () => {
    expect(calculateAccuracy("xxxxxxxxxxx", sentence)).toBe(0);
  });

  test("returns 0 for empty text", () => {
    expect(calculateAccuracy("", sentence)).toBe(0);
  });

  test("returns 0 if sentence is undefined", () => {
    expect(calculateAccuracy("hello")).toBe(0);
  });

  test("handles shorter text than sentence", () => {
    expect(calculateAccuracy("hello", sentence)).toBeCloseTo(5 / 11);
  });

  test("handles longer text than sentence", () => {
    expect(calculateAccuracy("hello world!!!", sentence)).toBeCloseTo(11 / 11);
  });
});