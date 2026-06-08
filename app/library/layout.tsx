import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Library',
  description:
    'Books that have shaped my thinking on technology, business, philosophy, and life. A personal collection curated by Nitesh Pant.',
  openGraph: {
    title: 'Library | Nitesh Pant',
    description:
      'Books that have shaped my thinking on technology, business, philosophy, and life.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Library | Nitesh Pant',
    description:
      'Books that have shaped my thinking on technology, business, philosophy, and life.',
  },
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Warm parchment ground — the "reading room". Scoped to /library only;
          dark mode keeps the site's near-black. */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-[#FBF7EE] dark:bg-transparent"
      />
      {children}
    </>
  );
}
