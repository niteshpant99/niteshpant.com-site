import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  books,
  getBookBySlug,
  statusConfig,
} from '../library-data';
import { getBookContent } from '../library';
import { metaData } from '../../config';
import { BookCoverImage } from '../../../components/library/book-cover-image';

type Params = Promise<{ slug: string }>;

interface Props {
  params: Params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    return { title: 'Book Not Found' };
  }

  const ogImage = `${metaData.baseUrl}og?title=${encodeURIComponent(book.title)}`;

  return {
    title: `${book.title} by ${book.author}`,
    description:
      book.summary ||
      `Review of ${book.title} by ${book.author} from Nitesh Pant's library.`,
    openGraph: {
      title: book.title,
      description: book.summary,
      type: 'article',
      url: `${metaData.baseUrl}library/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: book.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: book.title,
      description: book.summary,
      images: [ogImage],
    },
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const content = book.hasReview ? await getBookContent(slug) : null;

  // Format dates
  const formatDate = (dateInfo: { date: string; isEstimate: boolean }) => {
    const date = new Date(dateInfo.date);
    const formatted = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
    return dateInfo.isEstimate ? `~${formatted}` : formatted;
  };

  // Schema.org structured data
  const bookSchema = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    author: {
      '@type': 'Person',
      name: book.author,
    },
    isbn: book.isbn,
    numberOfPages: book.pageCount,
    datePublished: book.publishYear?.toString(),
    genre: book.genres,
    aggregateRating: book.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: book.rating,
          bestRating: 5,
          ratingCount: 1,
        }
      : undefined,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: metaData.baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Library',
        item: `${metaData.baseUrl}library`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: book.title,
        item: `${metaData.baseUrl}library/${slug}`,
      },
    ],
  };

  return (
    <article className="space-y-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookSchema),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Back link */}
      <Link
        href="/library"
        className="inline-flex items-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
      >
        ← Back to Library
      </Link>

      {/* Book Header Card */}
      <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden">
        <div className="grid md:grid-cols-[180px_1fr] gap-6 p-6">
          {/* Cover Image */}
          <div className="mx-auto md:mx-0">
            <div className="relative w-[180px] h-[270px] shadow-xl rounded-sm overflow-hidden">
              <BookCoverImage
                book={book}
                width={180}
                height={270}
                priority
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Book Info */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <h1 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                {book.title}
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                by {book.author}
              </p>
            </div>

            {/* Status and Rating */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`inline-flex items-center px-2.5 py-1 text-sm font-medium ${statusConfig[book.status].color}`}
              >
                {statusConfig[book.status].label}
              </span>
              {book.rating && (
                <span className="text-lg text-amber-500">
                  {'★'.repeat(book.rating)}
                  {'☆'.repeat(5 - book.rating)}
                </span>
              )}
            </div>

            {/* Summary */}
            {book.summary && (
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {book.summary}
              </p>
            )}

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-neutral-500 dark:text-neutral-500">
                  Pages
                </span>
                <p className="text-neutral-900 dark:text-neutral-100">
                  {book.pageCount}
                </p>
              </div>

              {book.publishYear && (
                <div>
                  <span className="text-neutral-500 dark:text-neutral-500">
                    Published
                  </span>
                  <p className="text-neutral-900 dark:text-neutral-100">
                    {book.publishYear}
                  </p>
                </div>
              )}

              {book.dateFinished && (
                <div>
                  <span className="text-neutral-500 dark:text-neutral-500">
                    Finished
                  </span>
                  <p className="text-neutral-900 dark:text-neutral-100">
                    {formatDate(book.dateFinished)}
                  </p>
                </div>
              )}

              {book.dateStarted && !book.dateFinished && (
                <div>
                  <span className="text-neutral-500 dark:text-neutral-500">
                    Started
                  </span>
                  <p className="text-neutral-900 dark:text-neutral-100">
                    {formatDate(book.dateStarted)}
                  </p>
                </div>
              )}

              {book.isbn && (
                <div>
                  <span className="text-neutral-500 dark:text-neutral-500">
                    ISBN
                  </span>
                  <p className="text-neutral-900 dark:text-neutral-100 font-mono text-xs">
                    {book.isbn}
                  </p>
                </div>
              )}
            </div>

            {/* Genres */}
            {book.genres.length > 0 && (
              <div>
                <span className="text-sm text-neutral-500 dark:text-neutral-500 block mb-2">
                  Genres
                </span>
                <div className="flex flex-wrap gap-2">
                  {book.genres.map((genre) => (
                    <span
                      key={genre}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium bg-neutral-50 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* External Links */}
            {book.amazonUrl && (
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  View on Amazon →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review Content */}
      {content && (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2>My Notes</h2>
          {content}
        </div>
      )}

      {!content && (
        <div className="text-center py-12 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
          <p className="text-neutral-500 dark:text-neutral-400">
            No review or notes available for this book yet.
          </p>
        </div>
      )}
    </article>
  );
}

export async function generateStaticParams() {
  return books.map((book) => ({
    slug: book.slug,
  }));
}
