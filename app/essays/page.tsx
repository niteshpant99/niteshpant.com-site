// app/blog/page.tsx
import Link from "next/link";
import { formatDate, getBlogPosts } from "../../lib/posts";
import {InteractiveGrid} from "../essays/interactive-grid";
import React from "react";

export const metadata = {
  title: "Essays",
  description: "Essasy by Nitesh Pant",
};

export default function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      
        <InteractiveGrid>
        <div>
        <h1 className="mb-2 z-10 whitespace-pre-wrap tracking-tighter text-2xl font-medium tracking-tight text-foreground mt-2">
        Essays
          </h1>
            <h2 className="mb-6 z-10 text-l text-foreground">by Nitesh</h2>
          

          <p className="z-10 text-foreground italic">If stuck, start here :</p>
          <p className="mb-4 z-10">
            My story to{" "}
            <a 
              href="/dartmouth" 
              className="text-foreground hover:underline"
            >
              Dartmouth
            </a>
          </p>
      </div>
      <div>
        {allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-4 transition-opacity duration-200 hover:opacity-80"
              href={`/essays/${post.slug}`}
            >
              <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                <p className="text-[--prose-text] dark:text-white tracking-tight">
                  {post.metadata.title}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
              </div>
            </Link>
          ))}
      </div>

      </InteractiveGrid>
    </section>
  );
}
