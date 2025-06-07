import React from "react";
import { notFound } from "next/navigation";
import { projects, projectCategories } from "../project-data";
import { getProjectContent } from "../project";
import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";

const statusColors = {
  live: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  beta: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400", 
  development: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  'open-source': "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
};

const statusLabels = {
  live: "Live",
  beta: "Beta", 
  development: "In Development",
  'open-source': "Open Source"
};

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

  const categoryInfo = projectCategories[project.category];

  return (
    <article className="space-y-8">
      <Link 
        href="/projects"
        className="inline-flex items-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
      >
        ← Back to Projects
      </Link>
      
      {/* Project Summary Section */}
      <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 space-y-4">
        {/* Title and Year */}
        <div className="flex items-start justify-between">
          <h1 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100">
            {project.title}
          </h1>
          <span className="text-sm text-neutral-500 dark:text-neutral-500 font-mono ml-6">
            {project.year}
          </span>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${statusColors[project.status]}`}>
            {statusLabels[project.status]}
          </span>
          {project.featured && (
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              Featured
            </span>
          )}
        </div>

        {/* Subtitle */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
          {project.subtitle}
        </p>

        {/* Description */}
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {project.description}
        </p>

        {/* Category */}
        <div className="space-y-1">
          <span className="text-sm text-neutral-500 dark:text-neutral-500">Category:</span>
          <div>
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-neutral-50 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800">
              {categoryInfo.label}
            </span>
          </div>
        </div>

        {/* Technology Tags */}
        {project.technologies && (
          <div className="space-y-1">
            <span className="text-sm text-neutral-500 dark:text-neutral-500">Technologies:</span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium bg-neutral-50 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Project Links */}
        {project.url !== "#" && (
          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              {project.url.includes('github.com') ? (
                <>
                  <FaGithub size={16} />
                  View on GitHub →
                </>
              ) : (
                <>
                  <FaArrowUpRightFromSquare size={14} />
                  Visit Project →
                </>
              )}
            </a>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {content}
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.title.toLowerCase().replace(/\s+/g, '-'),
  }));
}