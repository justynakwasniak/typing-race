const sentences = [
  "The quick brown fox jumps over the lazy dog",
  "Typing fast requires practice and focus",
  "WebSocket makes real time communication possible",
];

export function getRandomSentence(): string {
  const index = Math.floor(Math.random() * sentences.length);
  return sentences[index];
}

export function addSentence(sentence: string) {
  sentences.push(sentence);
}