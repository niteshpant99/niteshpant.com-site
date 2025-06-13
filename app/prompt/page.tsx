import React from 'react';
import { PromptCanvas } from '../../components/prompts/prompt-canvas';

export default function PromptBuilderPage() {
  return <PromptCanvas />;
}

export const metadata = {
  title: 'Visual Prompt Builder | PowerPrompt POC',
  description: 'Create structured, hierarchical prompts with visual components and instant XML/Markdown export.',
}; 