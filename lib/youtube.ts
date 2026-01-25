export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  
  // If it's already just an ID (11 chars)
  if (url.length === 11 && !url.includes('/')) return url;
  
  // Extract from various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  
  return null;
}