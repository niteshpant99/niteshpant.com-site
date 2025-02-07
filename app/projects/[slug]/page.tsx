import React from "react";
import { notFound } from "next/navigation";
import { projects } from "../project-data";
import { getProjectContent } from "../project";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, '-') === params.slug
  );

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = projects.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, '-') === params.slug
  );

  if (!project) {
    notFound();
  }

  const content = await getProjectContent(params.slug);

  if (!content) {
    notFound();
  }

  return (
    <article className="prose prose-neutral dark:prose-invert">
      <Link 
        href="/projects"
        className="text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400"
      >
        ← Back to Projects
      </Link>
      
      <div className="space-y-8 mt-6">
        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
        
        <div className="flex items-center space-x-4">
          <span className="text-neutral-600 dark:text-neutral-400">
            {project.year}
          </span>
          <a 
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            Visit Project →
          </a>
        </div>

        <div className="prose prose-neutral dark:prose-invert">
          {content}
        </div>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.title.toLowerCase().replace(/\s+/g, '-'),
  }));
}