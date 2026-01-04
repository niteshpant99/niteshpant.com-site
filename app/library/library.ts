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
    const { content } = await compileMDX({
      source,
      options: { parseFrontmatter: true },
    });

    return content;
  } catch {
    return null;
  }
}
