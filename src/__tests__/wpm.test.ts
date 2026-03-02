import { calculateWPM } from "@/lib/wpm";

describe("calculateWPM", () => {
  const sentence = "hello world from jest";

  test("returns full count for exact match", () => {
    expect(calculateWPM("hello world from jest", sentence)).toBe(4);
  });

  test("returns partial count for partially correct text", () => {
    expect(calculateWPM("hello wrong from wrong", sentence)).toBe(2);
  });

  test("returns 0 for completely wrong text", () => {
    expect(calculateWPM("xxx yyy zzz qqq", sentence)).toBe(0);
  });

  test("returns 0 for empty text", () => {
    expect(calculateWPM("", sentence)).toBe(0);
  });

  test("returns 0 if sentence is undefined", () => {
    expect(calculateWPM("hello world")).toBe(0);
  });

  test("handles shorter text than sentence", () => {
    expect(calculateWPM("hello world", sentence)).toBe(2);
  });

  test("handles longer text than sentence", () => {
    expect(calculateWPM("hello world from jest extra words", sentence)).toBe(4);
  });

  test("handles multiple spaces correctly", () => {
    expect(calculateWPM("hello   world  from   jest", sentence)).toBe(4);
  });
});