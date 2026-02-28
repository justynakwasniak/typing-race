export function calculateWPM(text: string, sentence: string) {
  const typedWords = text.trim().split(/\s+/);
  const sentenceWords = sentence.split(/\s+/);
  let correctCount = 0;

  typedWords.forEach((word, i) => {
    if (word === sentenceWords[i]) correctCount++;
  });

  return correctCount;
}