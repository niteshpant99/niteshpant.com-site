import { useState, useCallback, useEffect } from 'react';
import type {
  PromptBox,
  PromptBuilderState,
  Connection,
  ExportFormat
} from '../types/prompt-builder';
import { DEFAULT_TAGS, STORAGE_KEY } from '../types/prompt-builder';

const DEFAULT_BOXES: PromptBox[] = [
  {
    id: '1',
    tag: 'persona',
    content: 'You are a senior marketing copywriter who specializes in authentic, benefit-driven communication for overwhelmed professionals.',
    position: { x: 0, y: 0, level: 0 }
  },
  {
    id: '2',
    tag: 'context',
    content: 'Product: ZenFlow - a productivity app for the overwhelmed\nAudience: Busy professionals and students',
    position: { x: 0, y: 0, level: 1 }
  },
  {
    id: '3',
    tag: 'task',
    content: 'Create a compelling marketing email that will drive ZenFlow sign-ups.',
    position: { x: 0, y: 0, level: 2 }
  },
  {
    id: '4',
    tag: 'output',
    content: 'Deliver your response with a subject line, email body, and CTA text.',
    position: { x: 0, y: 0, level: 3 }
  }
];

const DEFAULT_CONNECTIONS: Connection[] = [];

const DEFAULT_STATE: PromptBuilderState = {
  boxes: DEFAULT_BOXES,
  connections: DEFAULT_CONNECTIONS,
  customTags: [],
  stats: { characterCount: 0, wordCount: 0, estimatedTokens: 0, boxCount: 0 }
};

// Cache loaded state at module level to avoid re-reading during re-renders
let cachedState: PromptBuilderState | null = null;

function getStoredState(): PromptBuilderState {
  if (cachedState) return cachedState;

  if (typeof window === 'undefined') {
    return DEFAULT_STATE;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const savedState = JSON.parse(saved);
      const loadedState: PromptBuilderState = {
        ...DEFAULT_STATE,
        ...savedState
      };
      cachedState = loadedState;
      return loadedState;
    }
  } catch (error) {
    console.error('Failed to load saved state:', error);
  }

  cachedState = DEFAULT_STATE;
  return DEFAULT_STATE;
}

export function usePromptBuilder() {
  const [state, setState] = useState<PromptBuilderState>(getStoredState());

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      cachedState = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        boxes: state.boxes,
        connections: state.connections,
        customTags: state.customTags
      }));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }, [state]);

  const updateBox = useCallback((id: string, field: 'tag' | 'content', value: string) => {
    setState(prev => ({
      ...prev,
      boxes: prev.boxes.map(box =>
        box.id === id ? { ...box, [field]: value } : box
      )
    }));
  }, []);

  const addBox = useCallback(() => {
    const newId = Date.now().toString();
    const level = state.boxes.length;
    
    const newBox: PromptBox = {
      id: newId,
      tag: DEFAULT_TAGS[0],
      content: '',
      position: { x: 0, y: 0, level }
    };

    setState(prev => ({
      ...prev,
      boxes: [...prev.boxes, newBox]
    }));
  }, [state.boxes]);

  const removeBox = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      boxes: prev.boxes.filter(box => box.id !== id)
    }));
  }, []);

  const addCustomTag = useCallback((tag: string) => {
    const cleanTag = tag.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    if (cleanTag && !state.customTags.includes(cleanTag) && !DEFAULT_TAGS.includes(cleanTag as any)) {
      setState(prev => ({
        ...prev,
        customTags: [...prev.customTags, cleanTag]
      }));
    }
  }, [state.customTags]);

  const removeCustomTag = useCallback((tag: string) => {
    setState(prev => ({
      ...prev,
      customTags: prev.customTags.filter(t => t !== tag),
      boxes: prev.boxes.map(box =>
        box.tag === tag ? { ...box, tag: DEFAULT_TAGS[0] } : box
      )
    }));
  }, []);

  const clearAllContent = useCallback(() => {
    setState(prev => ({
      ...prev,
      boxes: prev.boxes.map(box => ({ ...box, content: '' }))
    }));
  }, []);

  const resetToDefault = useCallback(() => {
    setState({
      boxes: DEFAULT_BOXES,
      connections: DEFAULT_CONNECTIONS,
      customTags: [],
      stats: { characterCount: 0, wordCount: 0, estimatedTokens: 0, boxCount: 0 }
    });
    
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear saved state:', error);
    }
  }, []);

  const exportPrompt = useCallback((): ExportFormat => {
    const xml = state.boxes
      .filter(box => box.content.trim())
      .map(box => `<${box.tag}>\n${box.content}\n</${box.tag}>`)
      .join('\n\n');

    const markdown = state.boxes
      .filter(box => box.content.trim())
      .map(box => `## ${box.tag.charAt(0).toUpperCase() + box.tag.slice(1)}\n\n${box.content}`)
      .join('\n\n');

    return { xml, markdown };
  }, [state.boxes]);

  const allTags = [...DEFAULT_TAGS, ...state.customTags];

  return {
    state,
    allTags,
    actions: {
      updateBox,
      addBox,
      removeBox,
      addCustomTag,
      removeCustomTag,
      clearAllContent,
      resetToDefault,
      exportPrompt
    }
  };
} 