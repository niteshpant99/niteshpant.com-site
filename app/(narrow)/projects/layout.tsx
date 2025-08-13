import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of products, client solutions, and open-source tools I've built to push the boundaries of AI and automation.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 