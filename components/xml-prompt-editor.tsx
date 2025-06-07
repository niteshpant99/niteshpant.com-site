'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Copy, Check, Plus, X, RotateCcw, Eraser, ChevronDown } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface PromptSection {
  id: string;
  tag: string;
  content: string;
  isCustom?: boolean;
}

const DEFAULT_TAG_OPTIONS = ['persona', 'task', 'context', 'output'] as const;

const defaultSections: PromptSection[] = [
  { id: '1', tag: 'persona', content: 'You are a senior marketing copywriter who specializes in authentic, benefit-driven communication for overwhelmed professionals.' },
  { id: '2', tag: 'task', content: 'Create a compelling marketing email that will drive ZenFlow sign-ups.' },
  { id: '3', tag: 'context', content: 'Product: ZenFlow - a productivity app for the overwhelmed\nAudience: Busy professionals and students' },
  { id: '4', tag: 'output', content: 'Deliver your response with a subject line, email body, and CTA text.' }
];

const STORAGE_KEY = 'xml-prompt-editor-state';

export function XMLPromptEditor() {
  const [sections, setSections] = useState<PromptSection[]>(defaultSections);
  const [copied, setCopied] = useState(false);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [newTagInput, setNewTagInput] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isXmlSectionCollapsed, setIsXmlSectionCollapsed] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { sections: savedSections, customTags: savedCustomTags, isXmlSectionCollapsed: savedCollapsed } = JSON.parse(saved);
        setSections(savedSections || defaultSections);
        setCustomTags(savedCustomTags || []);
        setIsXmlSectionCollapsed(savedCollapsed || false);
      }
    } catch (error) {
      console.error('Failed to load saved state:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever sections or customTags change
  useEffect(() => {
    if (!isLoaded) return; // Don't save until we've loaded
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        sections,
        customTags,
        isXmlSectionCollapsed
      }));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  }, [sections, customTags, isXmlSectionCollapsed, isLoaded]);

  const allTags = React.useMemo(() => [...DEFAULT_TAG_OPTIONS, ...customTags], [customTags]);

  const updateSection = useCallback((id: string, field: 'tag' | 'content', value: string) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  }, []);

  const addSection = useCallback(() => {
    const newSection: PromptSection = {
      id: Date.now().toString(),
      tag: allTags[0] || 'persona',
      content: '',
      isCustom: false
    };
    setSections(prev => [...prev, newSection]);
  }, [allTags]);

  const removeSection = useCallback((id: string) => {
    setSections(prev => prev.filter(section => section.id !== id));
  }, []);

  const addCustomTag = useCallback(() => {
    if (newTagInput.trim() && !allTags.includes(newTagInput.trim().toLowerCase())) {
      const cleanTag = newTagInput.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
      setCustomTags(prev => [...prev, cleanTag]);
      setNewTagInput('');
    }
  }, [newTagInput, allTags]);

  const removeCustomTag = useCallback((tagToRemove: string) => {
    setCustomTags(prev => prev.filter(tag => tag !== tagToRemove));
    // Update any sections using this tag back to a default tag
    setSections(prev => prev.map(section => 
      section.tag === tagToRemove ? { ...section, tag: 'persona' } : section
    ));
  }, []);

  const clearAllContent = useCallback(() => {
    setSections(prev => prev.map(section => ({ ...section, content: '' })));
  }, []);

  const resetToDefault = useCallback(() => {
    setSections(defaultSections);
    setCustomTags([]);
    setNewTagInput('');
    setIsXmlSectionCollapsed(false);
    // Clear localStorage
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear saved state:', error);
    }
  }, []);

  const toggleXmlSection = useCallback(() => {
    setIsXmlSectionCollapsed(prev => !prev);
  }, []);

  const generateXML = useCallback(() => {
    return sections
      .filter(section => section.content.trim())
      .map(section => `<${section.tag}>\n${section.content}\n</${section.tag}>`)
      .join('\n\n');
  }, [sections]);

  const copyToClipboard = useCallback(async () => {
    try {
      const xmlContent = generateXML();
      if (!xmlContent.trim()) {
        alert('No content to copy. Please add some content to your sections.');
        return;
      }
      await navigator.clipboard.writeText(xmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for browsers without clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = generateXML();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [generateXML]);

  return (
    <div className="max-w-4xl mx-auto p-2 bg-card rounded-lg border border-border">
      <div className="text-left -mt-4">
        {/* <h3 className="text-xl font-bold text-foreground">
          Interactive XML Prompt Builder
        </h3> */}
        <div className="flex items-center justify-between">
          <p className="text-label font-bold">
            Write. Copy. AI.
          </p>
          <div className="flex gap-2">
            <Button
              onClick={clearAllContent}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Eraser className="w-4 h-4" />
              Clear Contents
            </Button>
            <Button
              onClick={copyToClipboard}
              variant="default"
              size="sm"
              className="flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              COPY
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <select
                  value={section.tag}
                  onChange={(e) => updateSection(section.id, 'tag', e.target.value)}
                  className="px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground font-mono text-sm uppercase font-medium min-w-[90px]"
                >
                  {DEFAULT_TAG_OPTIONS.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag.toUpperCase()}
                    </option>
                  ))}
                  {customTags.length > 0 && (
                    <optgroup label="Custom Tags">
                      {customTags.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag.toUpperCase()}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
                {sections.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeSection(section.id)}
                    className="p-2 h-8 w-8"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
            
            <div>
              <textarea
                value={section.content}
                onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground text-sm resize-y"
                placeholder={`Enter your ${section.tag} content here...`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Custom Tag Management */}
      <div className="border-t border-border pt-4 pb-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">Manage Tags</h4>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {customTags.map((tag) => (
            <div key={tag} className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
              <span className="font-mono uppercase">{tag}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeCustomTag(tag)}
                className="p-0 h-auto w-auto hover:bg-transparent"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
            placeholder="Enter custom tag name..."
            className="flex-1 text-sm"
            onKeyDown={(e) => e.key === 'Enter' && addCustomTag()}
          />
          <Button
            onClick={addCustomTag}
            variant="outline"
            size="sm"
            disabled={!newTagInput.trim() || allTags.includes(newTagInput.trim().toLowerCase())}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex gap-2 mt-3">
          <Button
            onClick={addSection}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Section
          </Button>
          <Button
            onClick={resetToDefault}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All
          </Button>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between mb-3">
          <div 
              className="flex items-baseline gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={toggleXmlSection}
            >
              <ChevronDown 
                className={`w-5 h-5 text-foreground transition-transform duration-200 ${
                  isXmlSectionCollapsed ? '-rotate-90' : 'rotate-0'
                }`}
              />
              <h4 className="text-lg font-semibold text-foreground leading-none">
                Generated XML Prompt
              </h4>
          </div>

          <Button
            onClick={copyToClipboard}
            variant="default"
            size="sm"
            className="flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            COPY
          </Button>
        </div>
        
        {!isXmlSectionCollapsed && (
          <div className="bg-muted rounded-lg p-4 border border-border">
            <pre className="text-sm text-foreground whitespace-pre-wrap font-mono leading-relaxed">
              {generateXML()}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 