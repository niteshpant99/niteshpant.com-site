# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog website for Nitesh Pant built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS. Features essays, projects, and an interactive prompt builder tool.

**Live site:** https://niteshpant.com/

## Commands

```bash
pnpm dev          # Start dev server (port 3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm typecheck    # TypeScript type checking
```

## Architecture

### Content System
- **Essays:** MDX files in `/content/` with YAML frontmatter (title, publishedAt, summary, tags)
- **Projects:** MDX files in `/app/projects/content/` with metadata in `project-data.tsx`
- File names become URL slugs (e.g., `hello-world.mdx` → `/essays/hello-world`)
- Content parsing via `lib/posts.ts` utilities

### Key Directories
- `app/` - Next.js App Router pages and layouts
- `components/ui/` - shadcn/ui base components (new-york style preset)
- `components/` - Custom components (mdx.tsx, xml-prompt-editor.tsx, nav.tsx)
- `hooks/` - Custom React hooks
- `lib/` - Utilities (`cn()` for classnames, `posts.ts` for MDX parsing)
- `types/` - TypeScript definitions

### Routing Patterns
- Dynamic routes: `[slug]` for essays and projects
- Layout grouping: `(narrow)` for layout variants
- Feed routes: `/rss.xml`, `/atom.xml`, `/feed.json` via rewrites in next.config.js
- **Async params**: Dynamic route params must be awaited (Next.js 15+ pattern):
  ```typescript
  type Params = Promise<{ slug: string }>;
  export default async function Page({ params }: { params: Params }) {
    const { slug } = await params;
  }
  ```

### Styling
- Tailwind CSS with CSS variables for theming
- Dark mode: class-based via next-themes
- Theme colors defined in `app/global.css`
- Component variants via class-variance-authority (CVA)

### Analytics
- PostHog for event tracking (requires `NEXT_PUBLIC_POSTHOG_KEY`)
- Vercel Analytics and Speed Insights

## Path Aliases

```typescript
@/              // Project root
@/components/*  // Components directory
@/lib/*         // Library utilities
```

## MDX Components

Custom components available in MDX files (defined in `components/mdx.tsx`):
- Tweet, YouTube, Caption, ImageGrid
- XMLPromptEditor (interactive prompt builder)
- Code blocks with syntax highlighting and copy button

## Special Features

### Prompt Builder (`/prompt`)
Interactive visual editor for building prompts with:
- Draggable sections with customizable XML tags
- Live preview with token estimation
- Export to XML and Markdown
- localStorage persistence

Key files: `components/xml-prompt-editor.tsx`, `hooks/use-prompt-builder.ts`, `types/prompt-builder.ts`

## Development Notes

- Server Components by default; use `'use client'` only where necessary
- No database; all content is file-based
- Rebuilding regenerates RSS/Atom/JSON feeds
- Site metadata configured in `app/config.ts`
- ESLint uses flat config format (`eslint.config.mjs`)
- Build uses webpack (`next build --webpack`) for compatibility
