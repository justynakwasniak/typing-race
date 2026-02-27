export function calculateWPM(text: string) {
  const words = text.trim().split(/\s+/).length
  return words
}