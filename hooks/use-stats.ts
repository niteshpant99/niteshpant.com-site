import { useMemo } from 'react';
import type { PromptBox, PromptStats } from '../types/prompt-builder';

export function useStats(boxes: PromptBox[]): PromptStats {
  return useMemo(() => {
    const allContent = boxes
      .filter(box => box.content.trim())
      .map(box => box.content)
      .join(' ');

    const characterCount = allContent.length;
    const wordCount = allContent.trim() ? allContent.trim().split(/\s+/).length : 0;
    
    // Simple token estimation: ~4 characters per token (rough approximation)
    const estimatedTokens = Math.ceil(characterCount / 4);
    
    const boxCount = boxes.filter(box => box.content.trim()).length;

    return {
      characterCount,
      wordCount,
      estimatedTokens,
      boxCount
    };
  }, [boxes]);
} 