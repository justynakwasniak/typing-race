export function calculateAccuracy(text: string, sentence?: string) {
  if (!sentence) return 0;

  const correct = text
    .split("")
    .filter((c, i) => c === sentence[i]).length;

  return sentence.length > 0 ? correct / sentence.length : 0;
}