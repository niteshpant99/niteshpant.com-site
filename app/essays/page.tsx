// app/blog/page.tsx
import Link from "next/link";
import { formatDate, getBlogPosts } from "app/lib/posts";

export const metadata = {
  title: "Essays",
  description: "Essasy by Nitesh Pant",
};

export default function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <section>
      
      <h1 className="mb-2 text-2xl font-medium tracking-tight">Essays</h1>
      <div>
      <h2 className="mb-6 text-l">by Nitesh</h2>
      </div>

      <p>If stuck, start here</p>
      <p className="mb-6" >My story to <a href='/dartmouth' className="hover:underline">Dartmouth</a></p>
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
    </section>
  );
}
