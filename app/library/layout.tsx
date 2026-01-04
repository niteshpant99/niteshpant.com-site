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
  return <>{children}</>;
}
