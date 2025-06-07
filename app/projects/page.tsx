// app/projects/page.tsx
'use client';

import React, { useState } from "react";
import { projects, projectCategories, type Project } from "./project-data";
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

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const slug = project.title.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="group border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-all duration-200 hover:border-neutral-300 dark:hover:border-neutral-700">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                {project.title}
              </h3>
              {project.featured && (
                <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                  Featured
                </span>
              )}
              <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${statusColors[project.status]}`}>
                {statusLabels[project.status]}
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium mb-3">
              {project.subtitle}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              {project.description}
            </p>
          </div>
          <span className="text-sm text-neutral-500 dark:text-neutral-500 font-mono ml-4">
            {project.year}
          </span>
        </div>

        {project.technologies && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 text-xs font-medium bg-neutral-50 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4">
          <Link
            href={`/projects/${slug}`}
            className="text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            Read More →
          </Link>
          {project.url !== "#" && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
            >
              {project.url.includes('github.com') ? (
                <>
                  <FaGithub size={14} />
                  GitHub
                </>
              ) : (
                <>
                  <FaArrowUpRightFromSquare size={12} />
                  Visit
                </>
              )}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  const filteredProjects = projects
    .filter(project => {
      if (activeFilter === 'all') return true;
      return project.category === activeFilter;
    })
    .sort((a, b) => b.year - a.year); // Sort by year, newest first

  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
          Projects
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          A showcase of products, client solutions, and open-source tools I've built to push the boundaries of AI and automation.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 text-sm font-medium transition-colors border ${
            activeFilter === 'all'
              ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100'
              : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 dark:bg-neutral-950 dark:text-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700'
          }`}
        >
          All ({projects.length})
        </button>
        {Object.entries(projectCategories).map(([key, category]) => {
          const count = projects.filter(p => p.category === key).length;
          return (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-3 py-1.5 text-sm font-medium transition-colors border ${
                activeFilter === key
                  ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 dark:bg-neutral-950 dark:text-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700'
              }`}
            >
              {category.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Category Description */}
      {activeFilter !== 'all' && (
        <div className="border border-neutral-200 dark:border-neutral-800 p-4 bg-neutral-50 dark:bg-neutral-950">
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            {projectCategories[activeFilter as keyof typeof projectCategories]?.description}
          </p>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={`${project.title}-${index}`} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 border border-neutral-200 dark:border-neutral-800">
          <p className="text-neutral-500 dark:text-neutral-400">
            No projects found matching your filters.
          </p>
        </div>
      )}
    </section>
  );
}
