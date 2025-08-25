'use client';

import React, { useRef, useState } from 'react';
import { Plus, RotateCcw, Eraser, Copy, Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { StatsPanel } from './stats-panel';
import { ExportPanel } from './export-panel';
import { usePromptBuilder } from '../../hooks/use-prompt-builder';
import { useStats } from '../../hooks/use-stats';

export function PromptCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { state, allTags, actions } = usePromptBuilder();
  const stats = useStats(state.boxes);
  const [newTagInput, setNewTagInput] = React.useState('');
  const [copiedXml, setCopiedXml] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  const exportData = actions.exportPrompt();

  const copyToClipboard = async (content: string, type: 'xml' | 'markdown') => {
    if (!content.trim()) {
      alert('No content to copy. Please add some content to your sections.');
      return;
    }

    try {
      await navigator.clipboard.writeText(content);
      if (type === 'xml') {
        setCopiedXml(true);
        setTimeout(() => setCopiedXml(false), 2000);
      } else {
        setCopiedMarkdown(true);
        setTimeout(() => setCopiedMarkdown(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for browsers without clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (type === 'xml') {
        setCopiedXml(true);
        setTimeout(() => setCopiedXml(false), 2000);
      } else {
        setCopiedMarkdown(true);
        setTimeout(() => setCopiedMarkdown(false), 2000);
      }
    }
  };

  const handleAddCustomTag = () => {
    if (newTagInput.trim()) {
      actions.addCustomTag(newTagInput.trim());
      setNewTagInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCustomTag();
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Nitesh's Power Prompt Tool</h1>
        <p className="text-sm text-muted-foreground">Create structured prompts with visual hierarchy</p>
      </div>

      {/* Stats Panel - Mobile First */}
      <StatsPanel stats={stats} />

      {/* Controls */}
      <div className="bg-card rounded-md border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-foreground">Controls</h3>
          <div className="flex items-center gap-1">
            <Button
              onClick={actions.clearAllContent}
              variant="outline"
              size="sm"
              className="text-xs px-2"
            >
              <Eraser className="w-3 h-3 mr-1" />
              Clear
            </Button>
            <Button
              onClick={actions.resetToDefault}
              variant="outline"
              size="sm"
              className="text-xs px-2"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        {/* Tag Management */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Custom Tags</h4>
          
          {state.customTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {state.customTags.map((tag) => (
                <div key={tag} className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
                  <span className="font-mono uppercase">{tag}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => actions.removeCustomTag(tag)}
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
              onClick={handleAddCustomTag}
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              disabled={!newTagInput.trim() || allTags.includes(newTagInput.trim().toLowerCase())}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Copy Buttons */}
      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => copyToClipboard(exportData.xml, 'xml')}
          variant="default"
          size="sm"
          className="flex-1 text-xs"
        >
          {copiedXml ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
          {copiedXml ? 'Copied!' : 'Copy XML'}
        </Button>
        <Button
          onClick={() => copyToClipboard(exportData.markdown, 'markdown')}
          variant="outline"
          size="sm"
          className="flex-1 text-xs"
        >
          {copiedMarkdown ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
          {copiedMarkdown ? 'Copied!' : 'Copy MD'}
        </Button>
      </div>

      {/* Canvas */}
      <div className="bg-card rounded-md border border-border p-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-foreground">Prompt Structure</h3>
          <Button
            onClick={() => actions.addBox()}
            variant="outline"
            size="sm"
            className="text-xs px-2"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Section
          </Button>
        </div>
        
        <div className="space-y-4">
          {state.boxes.map((box, index) => (
            <div key={box.id} className="space-y-3">
              <div className="flex items-center gap-3">
                <select
                  value={box.tag}
                  onChange={(e) => actions.updateBox(box.id, 'tag', e.target.value)}
                  className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground font-mono text-sm uppercase font-medium min-w-[100px]"
                >
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag.toUpperCase()}
                    </option>
                  ))}
                </select>
                {state.boxes.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => actions.removeBox(box.id)}
                    className="p-2 h-8 w-8"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
              
              <textarea
                value={box.content}
                onChange={(e) => actions.updateBox(box.id, 'content', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground text-sm resize-y"
                placeholder={`Enter your ${box.tag} content here...`}
              />
            </div>
          ))}

          {state.boxes.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <div className="text-sm font-medium mb-1">No prompt sections yet</div>
              <div className="text-xs">Click "Add Section" to get started</div>
            </div>
          )}
        </div>
      </div>

      {/* Export Panel */}
      <ExportPanel exportData={exportData} onExport={actions.exportPrompt} />
    </div>
  );
} 