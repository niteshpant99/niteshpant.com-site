'use client';

import React, { useState } from 'react';
import { Copy, Check, Code, FileText, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import type { ExportFormat } from '../../types/prompt-builder';

interface ExportPanelProps {
  exportData: ExportFormat;
  onExport: () => ExportFormat;
}

export function ExportPanel({ exportData }: ExportPanelProps) {
  const [copiedXml, setCopiedXml] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [isXmlCollapsed, setIsXmlCollapsed] = useState(false);
  const [isMarkdownCollapsed, setIsMarkdownCollapsed] = useState(false);

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