import path from 'path';
import fs from 'fs';
import { compileMDX } from 'next-mdx-remote/rsc';
import { projects } from '../projects/project-data';

export async function getProjectContent(slug: string) {
  const filePath = path.join(process.cwd(), 'app/projects/content', `${slug}.mdx`);
  
  try {
    const source = fs.readFileSync(filePath, 'utf8');
    const { content } = await compileMDX({
      source,
      options: { parseFrontmatter: true }
    });
    
    return content;
  } catch (error) {
    return null;
  }
}