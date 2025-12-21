import { MetadataRoute } from "next";
import { getBlogPosts } from "../lib/posts";
import { metaData } from "./config";
import { projects } from "./projects/project-data";

const BaseUrl = metaData.baseUrl.endsWith("/")
  ? metaData.baseUrl
  : `${metaData.baseUrl}/`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with priority
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BaseUrl,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BaseUrl}essays`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BaseUrl}projects`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BaseUrl}about`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BaseUrl}work`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BaseUrl}dartmouth`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${BaseUrl}prompt`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Blog posts / Essays
  const blogPosts: MetadataRoute.Sitemap = getBlogPosts().map((post) => ({
    url: `${BaseUrl}essays/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  // Project pages
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => {
    const slug = project.title.toLowerCase().replace(/\s+/g, "-");
    return {
      url: `${BaseUrl}projects/${slug}`,
      lastModified: `${project.year}-01-01`,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.8 : 0.6,
    };
  });

  return [...staticPages, ...blogPosts, ...projectPages];
}
