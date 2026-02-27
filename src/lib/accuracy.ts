export function calculateAccuracy(text: string, sentence: string) {
  const correct = text.split("").filter((c, i) => c === sentence[i]).length
  return sentence.length > 0 ? correct / sentence.length : 0
}