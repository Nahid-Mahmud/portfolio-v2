export function calculateReadingTime(content: string): number {
  // Average reading speed of 200 words per minute
  const wordsPerMinute = 200;

  // Remove HTML tags and count words
  const textContent = content.replace(/<[^>]*>/g, " ");
  const wordCount = textContent.split(/\s+/).filter((word) => word.length > 0).length;

  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return Math.max(1, readingTime); // Minimum 1 minute
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
