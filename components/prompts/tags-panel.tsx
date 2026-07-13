'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface TagsPanelProps {
  customTags: string[];
  allTags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export function TagsPanel({ customTags, allTags, onAddTag, onRemoveTag }: TagsPanelProps) {
  const [newTagInput, setNewTagInput] = React.useState('');

  const handleAdd = () => {
    if (!newTagInput.trim()) return;
    onAddTag(newTagInput.trim());
    setNewTagInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="bg-card rounded-md border border-border p-4 space-y-3">
      <h4 className="text-sm font-medium text-foreground">Custom Tags</h4>

      {customTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {customTags.map((tag) => (
            <div key={tag} className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
              <span className="font-mono uppercase">{tag}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveTag(tag)}
                className="p-0 h-auto w-auto hover:bg-transparent"
              >
                <span className="text-xs">×</span>
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Input
          value={newTagInput}
          onChange={(e) => setNewTagInput(e.target.value)}
          placeholder="Add custom tag..."
          className="flex-1 text-sm h-8"
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={handleAdd}
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          disabled={!newTagInput.trim() || allTags.includes(newTagInput.trim().toLowerCase())}
        >
          +
        </Button>
      </div>
    </div>
  );
}




