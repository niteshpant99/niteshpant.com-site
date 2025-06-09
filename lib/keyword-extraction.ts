/**
 * Keyword Extraction System
 * Intelligently extracts meaningful keywords from essay titles
 * for particle typography display
 */

// Common stop words to filter out
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 
  'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 
  'above', 'below', 'between', 'among', 'is', 'are', 'was', 'were', 'be', 'been', 
  'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 
  'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 
  'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 
  'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'ours', 'theirs',
  'guide', 'how', 'what', 'when', 'where', 'why', 'who', 'which'
]);

// Technical/domain-specific terms that should be prioritized
const PRIORITY_KEYWORDS = new Set([
  'ai', 'artificial', 'intelligence', 'machine', 'learning', 'neural', 'network',
  'data', 'algorithm', 'code', 'coding', 'programming', 'software', 'tech', 'technology',
  'prompt', 'prompting', 'engineering', 'gpt', 'llm', 'model', 'training',
  'enshitification', 'tiktok', 'social', 'media', 'platform', 'digital',
  'startup', 'business', 'product', 'design', 'ux', 'ui', 'user', 'experience',
  'philosophy', 'thinking', 'mindset', 'strategy', 'framework', 'methodology',
  'optimization', 'performance', 'scaling', 'growth', 'innovation', 'disruption'
]);

export interface ExtractedKeywords {
  primary: string;     // Most important keyword
  secondary?: string;  // Second most important keyword  
  confidence: number;  // 0-1 confidence in extraction quality
}

/**
 * Extract meaningful keywords from essay title
 */
export function extractKeywords(title: string, tags?: string[]): ExtractedKeywords {
  // Clean and normalize the title
  const cleanTitle = title.toLowerCase()
    .replace(/[^\w\s-]/g, ' ')  // Remove punctuation except hyphens
    .replace(/\s+/g, ' ')       // Normalize whitespace
    .trim();
  
  // Split into words and filter
  const words = cleanTitle.split(' ')
    .filter(word => word.length > 2)  // Remove very short words
    .filter(word => !STOP_WORDS.has(word));
  
  // Score words based on various factors
  const wordScores = new Map<string, number>();
  
  for (const word of words) {
    let score = 1;
    
    // Priority keywords get high scores
    if (PRIORITY_KEYWORDS.has(word)) {
      score += 10;
    }
    
    // Longer words are often more meaningful
    if (word.length >= 6) {
      score += 2;
    }
    if (word.length >= 8) {
      score += 2;
    }
    
    // Capitalized words in original title (proper nouns)
    const originalWord = getOriginalCasing(word, title);
    if (originalWord && /^[A-Z]/.test(originalWord)) {
      score += 3;
    }
    
    // Technical terms, brand names, or unique words
    if (isLikelyTechnicalTerm(word)) {
      score += 5;
    }
    
    // Words that appear in tags get bonus
    if (tags && tags.some(tag => tag.toLowerCase().includes(word))) {
      score += 4;
    }
    
    // Compound words or hyphenated terms
    if (word.includes('-') || isLikelyCompoundWord(word)) {
      score += 3;
    }
    
    wordScores.set(word, score);
  }
  
  // Sort by score and select top keywords
  const sortedWords = Array.from(wordScores.entries())
    .sort((a, b) => b[1] - a[1]);
  
  const primary = sortedWords[0]?.[0];
  const secondary = sortedWords[1]?.[0];
  
  // Calculate confidence based on score difference and word quality
  let confidence = 0.5;
  if (primary && sortedWords[0][1] >= 5) {
    confidence = Math.min(0.9, 0.5 + (sortedWords[0][1] / 20));
  }
  
  // Handle special cases and extract compound terms
  const specialExtraction = extractSpecialTerms(title);
  if (specialExtraction) {
    return {
      primary: specialExtraction.primary,
      secondary: specialExtraction.secondary,
      confidence: Math.max(confidence, 0.8)
    };
  }
  
  return {
    primary: primary || 'essay',
    secondary: secondary && secondary !== primary ? secondary : undefined,
    confidence
  };
}

/**
 * Extract special compound terms or recognizable patterns
 */
function extractSpecialTerms(title: string): ExtractedKeywords | null {
  const titleLower = title.toLowerCase();
  
  // TikTokification -> TikTok + suffix
  if (titleLower.includes('tiktokification')) {
    return {
      primary: 'TikTok',
      secondary: 'Enshitification',
      confidence: 0.95
    };
  }
  
  // Enshitification patterns
  if (titleLower.includes('enshitification')) {
    return {
      primary: 'Enshitification',
      secondary: extractFromContext(title, 'enshitification'),
      confidence: 0.9
    };
  }
  
  // Prompting/Prompt Engineering
  if (titleLower.includes('prompt') && (titleLower.includes('guide') || titleLower.includes('engineering'))) {
    return {
      primary: 'Prompt',
      secondary: 'Engineering',
      confidence: 0.9
    };
  }
  
  // AI/ML patterns
  if (titleLower.includes('artificial intelligence') || titleLower.includes('machine learning')) {
    return {
      primary: 'AI',
      secondary: titleLower.includes('machine') ? 'Machine Learning' : undefined,
      confidence: 0.85
    };
  }
  
  return null;
}

/**
 * Get original casing of a word from the title
 */
function getOriginalCasing(word: string, title: string): string | null {
  const regex = new RegExp(`\\b${word}\\b`, 'i');
  const match = title.match(regex);
  return match ? match[0] : null;
}

/**
 * Check if word is likely a technical term
 */
function isLikelyTechnicalTerm(word: string): boolean {
  // Contains numbers or specific patterns
  if (/\d/.test(word)) return true;
  
  // Technical suffixes
  if (word.endsWith('tion') || word.endsWith('ing') || word.endsWith('ification')) {
    return true;
  }
  
  // All caps acronyms when found in original
  if (word.length <= 5 && word.toUpperCase() === word) {
    return true;
  }
  
  return false;
}

/**
 * Check if word is likely compound
 */
function isLikelyCompoundWord(word: string): boolean {
  return word.length > 8 && (
    word.includes('tech') ||
    word.includes('data') ||
    word.includes('auto') ||
    word.includes('meta') ||
    word.includes('proto')
  );
}

/**
 * Extract contextual word near a target term
 */
function extractFromContext(title: string, targetWord: string): string | undefined {
  const words = title.toLowerCase().split(/\s+/);
  const targetIndex = words.findIndex(word => word.includes(targetWord));
  
  if (targetIndex === -1) return undefined;
  
  // Look for significant words before or after
  const contextWords = [
    words[targetIndex - 1],
    words[targetIndex + 1]
  ].filter(word => 
    word && 
    word.length > 3 && 
    !STOP_WORDS.has(word)
  );
  
  return contextWords[0];
}

/**
 * Create display text with proper casing and formatting
 */
export function formatForDisplay(keyword: string, originalTitle: string): string {
  // Preserve original casing when possible
  const originalMatch = getOriginalCasing(keyword, originalTitle);
  if (originalMatch) {
    return originalMatch;
  }
  
  // Special formatting for known terms
  const specialFormats: Record<string, string> = {
    'ai': 'AI',
    'ui': 'UI',
    'ux': 'UX',
    'api': 'API',
    'gpt': 'GPT',
    'llm': 'LLM',
    'tiktok': 'TikTok',
    'enshitification': 'Enshitification'
  };
  
  const lowerKeyword = keyword.toLowerCase();
  if (specialFormats[lowerKeyword]) {
    return specialFormats[lowerKeyword];
  }
  
  // Capitalize first letter
  return keyword.charAt(0).toUpperCase() + keyword.slice(1);
} 