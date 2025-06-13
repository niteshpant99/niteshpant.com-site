'use client';

import React from 'react';
import { X, Plus, Grip } from 'lucide-react';
import { Button } from '../ui/button';
import type { PromptBox } from '../../types/prompt-builder';

interface PromptBoxProps {
  box: PromptBox;
  allTags: string[];
  onUpdate: (id: string, field: 'tag' | 'content', value: string) => void;
  onRemove: (id: string) => void;
  onAddChild: (parentId: string) => void;
  canRemove: boolean;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export function PromptBox({
  box,
  allTags,
  onUpdate,
  onRemove,
  onAddChild,
  canRemove,
  isSelected,
  onSelect
}: PromptBoxProps) {
  const levelColors = [
    'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20',
    'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20',
    'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20',
    'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20',
    'border-pink-200 bg-pink-50 dark:border-pink-800 dark:bg-pink-950/20'
  ];

  const colorClass = levelColors[box.position.level % levelColors.length];
  
  return (
    <div
      className={`absolute z-10 transition-all duration-200 ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      style={{
        left: box.position.x,
        top: box.position.y,
        width: '240px' // Reduced from 280px to fit better in narrow layout
      }}
      onClick={() => onSelect?.(box.id)}
    >
      <div className={`bg-card rounded-lg border-2 ${colorClass} shadow-sm hover:shadow-md transition-shadow`}>
        {/* Header */}
        <div className="flex items-center gap-1 p-2 pb-1">
          <div className="cursor-grab active:cursor-grabbing">
            <Grip className="w-3 h-3 text-muted-foreground" />
          </div>
          
          <select
            value={box.tag}
            onChange={(e) => onUpdate(box.id, 'tag', e.target.value)}
            className="flex-1 px-1 py-0.5 border border-input rounded focus:outline-none focus:ring-1 focus:ring-ring bg-background text-foreground font-mono text-xs uppercase font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag.toUpperCase()}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddChild(box.id);
              }}
              className="p-0.5 h-5 w-5 hover:bg-primary/10"
              title="Add child box"
            >
              <Plus className="w-2.5 h-2.5" />
            </Button>
            
            {canRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(box.id);
                }}
                className="p-0.5 h-5 w-5 hover:bg-destructive/10 hover:text-destructive"
                title="Remove box"
              >
                <X className="w-2.5 h-2.5" />
              </Button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-2 pb-2">
          <textarea
            value={box.content}
            onChange={(e) => onUpdate(box.id, 'content', e.target.value)}
            rows={2}
            className="w-full px-2 py-1 border border-input rounded focus:outline-none focus:ring-1 focus:ring-ring bg-background text-foreground text-xs resize-y min-h-[60px]"
            placeholder={`Enter ${box.tag} content...`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Level indicator */}
        <div className="absolute -left-1.5 top-1">
          <div className="w-3 h-3 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
            {box.position.level}
          </div>
        </div>

        {/* Connection points */}
        <div className="absolute -right-1.5 top-1/2 transform -translate-y-1/2">
          <div className="w-2 h-2 rounded-full bg-primary opacity-60"></div>
        </div>
        <div className="absolute -left-1.5 top-1/2 transform -translate-y-1/2">
          <div className="w-2 h-2 rounded-full bg-primary opacity-60"></div>
        </div>
      </div>
    </div>
  );
} 