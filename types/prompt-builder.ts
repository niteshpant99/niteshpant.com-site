export interface PromptBox {
  id: string;
  tag: string;
  content: string;
  position: Position;
  parentId?: string;
  children?: string[];
  isCustomTag?: boolean;
}

export interface Position {
  x: number;
  y: number;
  level: number; // Hierarchical level for tree structure
}

export interface Connection {
  id: string;
  parentId: string;
  childId: string;
  points: Point[];
}

export interface Point {
  x: number;
  y: number;
}

export interface PromptStats {
  characterCount: number;
  wordCount: number;
  estimatedTokens: number;
  boxCount: number;
}

export interface ExportFormat {
  xml: string;
  markdown: string;
}

export interface PromptBuilderState {
  boxes: PromptBox[];
  connections: Connection[];
  customTags: string[];
  selectedBoxId?: string;
  stats: PromptStats;
}

export const DEFAULT_TAGS = ['persona', 'task', 'context', 'output'] as const;
export type DefaultTag = typeof DEFAULT_TAGS[number];

export const STORAGE_KEY = 'prompt-builder-state'; 