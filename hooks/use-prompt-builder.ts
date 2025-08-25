import { useState, useCallback, useEffect } from 'react';
import type { 
  PromptBox, 
  PromptBuilderState, 
  Position,
  Connection,
  ExportFormat 
} from '../types/prompt-builder';
import { DEFAULT_TAGS, STORAGE_KEY } from '../types/prompt-builder';
import { db } from '../lib/db';

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

export function usePromptBuilder() {
  const [state, setState] = useState<PromptBuilderState>({
    boxes: DEFAULT_BOXES,
    connections: DEFAULT_CONNECTIONS,
    customTags: [],
    stats: { characterCount: 0, wordCount: 0, estimatedTokens: 0, boxCount: 0 }
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const savedState = JSON.parse(saved);
        setState(prev => ({
          ...prev,
          ...savedState
        }));
      }
    } catch (error) {
      console.error('Failed to load saved state:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        boxes: state.boxes,
        connections: state.connections,
        customTags: state.customTags
      }));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }, [state.boxes, state.connections, state.customTags, isLoaded]);

  // Debounced autosave to IndexedDB (best-effort, non-blocking)
  useEffect(() => {
    if (!isLoaded) return;
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      if (controller.signal.aborted) return;
      try {
        const now = Date.now();
        await db.prompts.put({
          id: 0, // reserve a stable record id for autosave
          name: 'Autosave',
          createdAt: now,
          updatedAt: now,
          state: {
            boxes: state.boxes,
            connections: state.connections,
            customTags: state.customTags,
          },
        });
      } catch (err) {
        console.warn('IndexedDB autosave failed (non-blocking):', err);
      }
    }, 800);
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [state.boxes, state.connections, state.customTags, isLoaded]);

  const updateBox = useCallback((id: string, field: 'tag' | 'content', value: string) => {
    setState(prev => ({
      ...prev,
      boxes: prev.boxes.map(box =>
        box.id === id ? { ...box, [field]: value } : box
      )
    }));
  }, []);

  const indentBox = useCallback((id: string) => {
    setState(prev => {
      const index = prev.boxes.findIndex(b => b.id === id);
      if (index <= 0) return prev;
      const prevBox = prev.boxes[index - 1];
      const targetLevel = prevBox.position.level + 1;
      const boxes = prev.boxes.map((b, i) =>
        i === index ? { ...b, parentId: prevBox.id, position: { ...b.position, level: targetLevel } } : b
      );
      return { ...prev, boxes };
    });
  }, []);

  const outdentBox = useCallback((id: string) => {
    setState(prev => {
      const index = prev.boxes.findIndex(b => b.id === id);
      if (index < 0) return prev;
      const box = prev.boxes[index];
      const newLevel = Math.max(0, box.position.level - 1);
      let newParentId: string | undefined = undefined;
      if (newLevel > 0) {
        // find an ancestor candidate whose level is newLevel - 1 by walking backwards
        for (let i = index - 1; i >= 0; i--) {
          const candidate = prev.boxes[i];
          if (candidate.position.level === newLevel - 1) {
            newParentId = candidate.id;
            break;
          }
        }
      }
      const boxes = prev.boxes.map((b) =>
        b.id === id ? { ...b, parentId: newParentId, position: { ...b.position, level: newLevel } } : b
      );
      return { ...prev, boxes };
    });
  }, []);

  const moveBoxUp = useCallback((id: string) => {
    setState(prev => {
      const idx = prev.boxes.findIndex(b => b.id === id);
      if (idx <= 0) return prev;
      const boxes = prev.boxes.slice();
      const tmp = boxes[idx - 1];
      boxes[idx - 1] = boxes[idx];
      boxes[idx] = tmp;
      return { ...prev, boxes };
    });
  }, []);

  const moveBoxDown = useCallback((id: string) => {
    setState(prev => {
      const idx = prev.boxes.findIndex(b => b.id === id);
      if (idx < 0 || idx >= prev.boxes.length - 1) return prev;
      const boxes = prev.boxes.slice();
      const tmp = boxes[idx + 1];
      boxes[idx + 1] = boxes[idx];
      boxes[idx] = tmp;
      return { ...prev, boxes };
    });
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
    type Node = { box: PromptBox; children: Node[] };
    const stack: Node[] = [];
    const roots: Node[] = [];

    const contentBoxes = state.boxes.filter(b => b.content.trim());

    for (const b of contentBoxes) {
      const node: Node = { box: b, children: [] };
      while (stack.length && stack[stack.length - 1].box.position.level >= b.position.level) {
        stack.pop();
      }
      if (stack.length === 0) {
        roots.push(node);
      } else {
        stack[stack.length - 1].children.push(node);
      }
      stack.push(node);
    }

    const renderXml = (nodes: Node[]): string => {
      return nodes.map(n => {
        const inner = [n.box.content, renderXml(n.children)].filter(Boolean).join('\n');
        return `<${n.box.tag}>\n${inner}\n</${n.box.tag}>`;
      }).join('\n\n');
    };

    const renderMd = (nodes: Node[], baseLevel = 2): string => {
      return nodes.map(n => {
        const heading = '#'.repeat(baseLevel + n.box.position.level) + ' ' + (n.box.tag.charAt(0).toUpperCase() + n.box.tag.slice(1));
        const childrenMd = renderMd(n.children, baseLevel);
        return [heading, '', n.box.content, childrenMd].filter(Boolean).join('\n');
      }).join('\n\n');
    };

    const xml = renderXml(roots);
    const markdown = renderMd(roots);

    return { xml, markdown };
  }, [state.boxes]);

  const allTags = [...DEFAULT_TAGS, ...state.customTags];

  const replaceState = useCallback((next: {
    boxes: PromptBox[];
    connections: Connection[];
    customTags: string[];
  }) => {
    setState(prev => ({
      ...prev,
      boxes: next.boxes,
      connections: next.connections,
      customTags: next.customTags,
    }));
  }, []);

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
      exportPrompt,
      indentBox,
      outdentBox,
      moveBoxUp,
      moveBoxDown,
      replaceState
    }
  };
} 