'use client';

import React from 'react';
import { BarChart3, FileText, Hash, Zap } from 'lucide-react';
import type { PromptStats } from '../../types/prompt-builder';

interface StatsPanelProps {
  stats: PromptStats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="bg-card rounded-md border border-border p-3 space-y-3">
      <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
        <BarChart3 className="w-4 h-4" />
        Statistics
      </h4>
      
      <div className="grid grid-cols-4 gap-2">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Hash className="w-3 h-3 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-sm font-medium text-foreground">
            {stats.characterCount.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Chars</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <FileText className="w-3 h-3 text-green-600 dark:text-green-400" />
          </div>
          <div className="text-sm font-medium text-foreground">
            {stats.wordCount.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Words</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Zap className="w-3 h-3 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-sm font-medium text-foreground">
            {stats.estimatedTokens.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Tokens</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <div className="w-1.5 h-1.5 bg-orange-600 dark:bg-orange-400 rounded-full"></div>
          </div>
          <div className="text-sm font-medium text-foreground">
            {stats.boxCount}
          </div>
          <div className="text-xs text-muted-foreground">Boxes</div>
        </div>
      </div>
    </div>
  );
} 