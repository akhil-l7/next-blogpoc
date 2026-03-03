export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getReadTime(text: string, wordsPerMin: number = 200) {
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

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };