'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from './ui/button';

interface CodeBlockWithCopyProps {
  children: React.ReactNode;
}

export function CodeBlockWithCopy({ children }: CodeBlockWithCopyProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = useCallback(async () => {
    try {
      let textToCopy = '';
      
      if (preRef.current) {
        textToCopy = preRef.current.innerText || preRef.current.textContent || '';
      }
      
      if (!textToCopy.trim()) {
        return;
      }

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for browsers without clipboard API
      try {
        const textToCopy = preRef.current?.innerText || preRef.current?.textContent || '';
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
    }
  }, []);

  return (
    <div className="relative group">
      <Button
        onClick={copyToClipboard}
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 h-8 w-8 p-0"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
      <pre ref={preRef} className="bg-[var(--prose-pre-bg)] rounded-lg overflow-x-auto">
        {children}
      </pre>
    </div>
  );
} 