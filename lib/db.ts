import Dexie, { Table } from 'dexie';
import type { PromptBuilderState } from '../types/prompt-builder';

export interface SavedPromptRecord {
  id?: number;
  name: string;
  createdAt: number;
  updatedAt: number;
  state: Pick<PromptBuilderState, 'boxes' | 'connections' | 'customTags'>;
}

class PowerPromptDB extends Dexie {
  prompts!: Table<SavedPromptRecord, number>;

  constructor() {
    super('power-prompt-db');
    this.version(1).stores({
      prompts: '++id, name, updatedAt, createdAt'
    });
  }
}

export const db = new PowerPromptDB();




