export function calculateWPM(text: string, sentence?: string) {
  if (!sentence) return 0;

  const typedWords = text.match(/\S+/g) || [];
const sentenceWords = sentence.match(/\S+/g) || [];

  let correctCount = 0;

  typedWords.forEach((word, i) => {
    if (word === sentenceWords[i]) correctCount++;
  });

  return correctCount;
}