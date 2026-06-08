import path from 'path';
import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';

/**
 * Load MDX book review content
 * Similar pattern to projects
 */
export async function getBookContent(slug: string) {
  const filePath = path.join(
    process.cwd(),
    'app/library/content',
    `${slug}.mdx`
  );

  try {
    const source = fs.readFileSync(filePath, 'utf8');
    const { content, frontmatter } = await compileMDX<{ personal?: boolean }>({
      source,
      options: { parseFrontmatter: true },
    });

    // `personal: true` in frontmatter marks a first-person note (heading
    // "Notes"); absent/false renders as a "Summary".
    return { content, frontmatter };
  } catch {
    return null;
  }
}
