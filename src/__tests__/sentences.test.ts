import { getRandomSentence, addSentence } from "@/lib/sentences";

describe("sentences utilities", () => {
  test("getRandomSentence returns a string", () => {
    const result = getRandomSentence();
    expect(typeof result).toBe("string");
  });

  test("getRandomSentence returns one of predefined sentences", () => {
    const possible = [
      "The quick brown fox jumps over the lazy dog",
      "Typing fast requires practice and focus",
      "WebSocket makes real time communication possible",
    ];

    const result = getRandomSentence();
    expect(possible).toContain(result);
  });

  test("addSentence adds new sentence to pool", () => {
    const newSentence = "Testing makes code safer";

    addSentence(newSentence);

    const results = Array.from({ length: 20 }, () =>
      getRandomSentence()
    );

    expect(results).toContain(newSentence);
  });
});