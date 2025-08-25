'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Copy, Check, Code, FileText, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import type { ExportFormat } from '../../types/prompt-builder';
import { db } from '../../lib/db';
import { Input } from '../ui/input';

interface ExportPanelProps {
  exportData: ExportFormat;
  onExport: () => ExportFormat;
}

export function ExportPanel({ exportData }: ExportPanelProps) {
  const [copiedXml, setCopiedXml] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [isXmlCollapsed, setIsXmlCollapsed] = useState(false);
  const [isMarkdownCollapsed, setIsMarkdownCollapsed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [saved, setSaved] = useState<Array<{ id?: number; name: string; updatedAt: number; state: any }>>([]);
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return saved;
    return saved.filter(s => s.name.toLowerCase().includes(q));
  }, [saved, search]);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const all = await db.prompts.orderBy('updatedAt').reverse().toArray();
      if (mounted) setSaved(all);
    };
    load();
    const interval = setInterval(load, 1500);
    return () => { mounted = false; clearInterval(interval); };
  }, []);

  const copyToClipboard = async (content: string, type: 'xml' | 'markdown') => {
    if (!content.trim()) {
      alert('No content to copy. Please add some content to your boxes.');
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

  return (
    <div className="space-y-4">
      {/* Save / Library */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          disabled={isSaving}
          onClick={async () => {
            try {
              setIsSaving(true);
              const name = prompt('Save prompt as (name):')?.trim();
              if (!name) return;
              const now = Date.now();
              const raw = localStorage.getItem('prompt-builder-state');
              if (!raw) return alert('Nothing to save.');
              const parsed = JSON.parse(raw);
              await db.prompts.add({
                name,
                createdAt: now,
                updatedAt: now,
                state: {
                  boxes: parsed.boxes ?? [],
                  connections: parsed.connections ?? [],
                  customTags: parsed.customTags ?? [],
                }
              });
            } finally {
              setIsSaving(false);
            }
          }}
        >
          Save
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => setShowLibrary(s => !s)}
        >
          {showLibrary ? 'Close Library' : 'Open Library'}
        </Button>
      </div>

      {showLibrary && (
        <div className="border border-border rounded-md p-3 space-y-2 bg-card">
          <div className="flex items-center gap-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved prompts..."
              className="h-8 text-sm"
            />
          </div>
          <div className="divide-y divide-border max-h-60 overflow-auto">
            {filtered.map((rec) => (
              <div key={rec.id} className="py-2 flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{rec.name}</div>
                  <div className="text-xs text-muted-foreground">{new Date(rec.updatedAt).toLocaleString()}</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => {
                    localStorage.setItem('prompt-builder-state', JSON.stringify(rec.state));
                    location.reload();
                  }}
                >
                  Load
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={async () => {
                    const next = prompt('Rename to:', rec.name)?.trim();
                    if (!next) return;
                    await db.prompts.update(rec.id!, { name: next, updatedAt: Date.now() });
                  }}
                >
                  Rename
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={async () => { if (confirm('Delete this saved prompt?')) await db.prompts.delete(rec.id!); }}
                >
                  Delete
                </Button>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="py-6 text-center text-xs text-muted-foreground">No saved prompts yet</div>
            )}
          </div>
        </div>
      )}
      {/* Quick Copy Buttons */}
      <div className="flex gap-2">
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

      {/* XML Export */}
      <div className="bg-card rounded-lg border border-border p-3">
        <div className="flex items-center justify-between mb-2">
          <div 
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setIsXmlCollapsed(!isXmlCollapsed)}
          >
            <ChevronDown 
              className={`w-3 h-3 text-foreground transition-transform duration-200 ${
                isXmlCollapsed ? '-rotate-90' : 'rotate-0'
              }`}
            />
            <Code className="w-3 h-3 text-foreground" />
            <h4 className="text-sm font-medium text-foreground">XML Preview</h4>
          </div>
        </div>
        
        {!isXmlCollapsed && (
          <div className="bg-muted rounded-md p-2 border border-border">
            <pre className="text-xs text-foreground whitespace-pre-wrap font-mono leading-relaxed max-h-48 overflow-y-auto">
              {exportData.xml || 'No content to export. Add content to your boxes above.'}
            </pre>
          </div>
        )}
      </div>

      {/* Markdown Export */}
      <div className="bg-card rounded-lg border border-border p-3">
        <div className="flex items-center justify-between mb-2">
          <div 
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setIsMarkdownCollapsed(!isMarkdownCollapsed)}
          >
            <ChevronDown 
              className={`w-3 h-3 text-foreground transition-transform duration-200 ${
                isMarkdownCollapsed ? '-rotate-90' : 'rotate-0'
              }`}
            />
            <FileText className="w-3 h-3 text-foreground" />
            <h4 className="text-sm font-medium text-foreground">Markdown Preview</h4>
          </div>
        </div>
        
        {!isMarkdownCollapsed && (
          <div className="bg-muted rounded-md p-2 border border-border">
            <pre className="text-xs text-foreground whitespace-pre-wrap font-mono leading-relaxed max-h-48 overflow-y-auto">
              {exportData.markdown || 'No content to export. Add content to your boxes above.'}
            </pre>
          </div>
        )}
      </div>

      <div className="text-xs text-muted-foreground text-center">
        💡 <strong>Tip:</strong> XML format works better with LLMs
      </div>
    </div>
  );
} 