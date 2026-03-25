import { READING_TIME } from '@/lib/constants';
import { storage } from '@/lib/storage';

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getReadTime(text: string, wordsPerMin: number = READING_TIME.WORDS_PER_MINUTE) {
  const wordCount = getWordCount(text);
  const minutes = Math.ceil(wordCount / wordsPerMin);
  return minutes;
}

function getWordCount(text: string) {
  const trimmedText = text.trim();

  if (trimmedText === "") {
    return 0;
  }
  const words = trimmedText.split(/\s+/);
  return words.length;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getErrorText(status: number): string {
  switch (status) {
    case 400:
      return "Invalid request. Please try again.";
    case 404:
      return "Comments not found.";
    case 409:
      return "You've already commented on this post.";
    case 500:
      return "Server error. Please try again later.";
    default:
      return "An unexpected error occurred.";
  }
}

export function getVisitorId(): string {
  let id = storage.getVisitorId();

  if (!id) {
    id = crypto.randomUUID();
    storage.setVisitorId(id);
  }

  return id;
}

