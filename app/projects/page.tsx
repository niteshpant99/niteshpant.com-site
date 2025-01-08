// app/projects/page.tsx
import React from "react";
import type { Metadata } from "next";
import { projects } from "./project-data";
import Link from "next/link";  // Added this import
import { FaArrowUpRightFromSquare } from "react-icons/fa6";


export const metadata: Metadata = {
  title: "Projects",
  description: "My Projects",
};

export default function Projects() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium tracking-tight">Projects</h1>
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="space-y-2">
          <Link  // Changed from <a> to <Link>
            key={index}
            href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}  // Changed from href={project.url}
            className="block group hover:opacity-80 transition-opacity duration-200"
          >
            <div className="flex flex-col">
              <div className="w-full flex justify-between items-baseline">
                <span className="text-black dark:text-white font-medium tracking-tight">
                  {project.title}
                </span>
                <span className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm">
                  {project.year}
                </span>
                
              </div>
              <p className="prose prose-neutral dark:prose-invert pt-3">
                {project.description}
              </p>
              </div>
          </Link>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            <FaArrowUpRightFromSquare className="mr-1" size={14} /> Explore
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
