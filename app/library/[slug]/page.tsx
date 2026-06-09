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

  const review = book.hasReview ? await getBookContent(slug) : null;
  const content = review?.content ?? null;
  const isPersonal = review?.frontmatter?.personal === true;

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
    <article className="space-y-10">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Back link */}
      <Link
        href="/library"
        className="inline-flex items-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-[#00693e] dark:hover:text-[#a5d75f] transition-colors"
      >
        ← Back to Library
      </Link>

      {/* Ex-libris bookplate (no card, hairline structure) */}
      <div className="grid md:grid-cols-[156px_1fr] gap-8">
        {/* Cover */}
        <div className="mx-auto md:mx-0">
          <div
            className="relative w-[156px] h-[234px] overflow-hidden rounded-[2px] ring-1 ring-black/5 dark:ring-white/5"
            style={{ boxShadow: '0 8px 24px -12px rgba(28,25,23,.5)' }}
          >
            <BookCoverImage
              book={book}
              width={156}
              height={234}
              priority
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-5">
          {/* Ex Libris eyebrow */}
          <div className="flex items-center gap-2">
            <span
              className="text-[#00693e] dark:text-[#a5d75f] text-xs leading-none"
              aria-hidden
            >
              ✦
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
              Ex Libris · Nitesh Pant
            </span>
          </div>

          {/* Title + author */}
          <div className="space-y-1">
            <h1 className="font-serif text-3xl leading-tight text-neutral-900 dark:text-neutral-100">
              {book.title}
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              by {book.author}
            </p>
          </div>

          {/* Status + rating */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
              <span
                className={`h-1.5 w-1.5 rounded-full ${statusConfig[book.status].dot}`}
                aria-hidden
              />
              {statusConfig[book.status].label}
            </span>
            {book.rating && (
              <span className="inline-flex items-baseline">
                <span
                  className="text-[13px] leading-none text-[#00693e] dark:text-[#a5d75f]"
                  style={{ textShadow: '0 1px 0 rgba(0,0,0,.12)' }}
                  aria-hidden
                >
                  {'◆'.repeat(book.rating)}
                  <span className="text-neutral-300 dark:text-neutral-700">
                    {'◇'.repeat(5 - book.rating)}
                  </span>
                </span>
                <span className="ml-1.5 font-mono text-[11px] tabular-nums text-neutral-500">
                  {book.rating}/5
                </span>
              </span>
            )}
          </div>

          {/* Short note from data */}
          {book.summary && (
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {book.summary}
            </p>
          )}

          {/* Catalog metadata */}
          <dl className="border-t border-[#cdb89a]/50 dark:border-[#3a2e22]/80">
            <MetaRow label="Pages" value={String(book.pageCount)} />
            {book.publishYear && (
              <MetaRow label="Published" value={String(book.publishYear)} />
            )}
            {book.dateFinished && (
              <MetaRow label="Finished" value={formatDate(book.dateFinished)} />
            )}
            {book.dateStarted && !book.dateFinished && (
              <MetaRow label="Started" value={formatDate(book.dateStarted)} />
            )}
            {book.isbn && <MetaRow label="ISBN" value={book.isbn} mono />}
          </dl>

          {/* Subjects */}
          {book.genres.length > 0 && (
            <div className="flex items-baseline gap-2">
              <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
                Subjects
              </span>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {book.genres.join(' · ')}
              </span>
            </div>
          )}

          {/* Find a copy */}
          {book.amazonUrl && (
            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#00693e] dark:text-[#a5d75f] hover:underline underline-offset-4"
            >
              Find a copy →
            </a>
          )}
        </div>
      </div>

      {/* Notes (first-person) or Summary (generic) — driven by frontmatter */}
      {content && (
        <div className="space-y-3">
          <h2 className="border-b border-[#cdb89a]/50 dark:border-[#3a2e22]/80 pb-1.5 font-mono text-[12px] uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
            {isPersonal ? 'Notes' : 'Summary'}
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {content}
          </div>
        </div>
      )}
    </article>
  );
}

function MetaRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[#cdb89a]/50 dark:border-[#3a2e22]/80 py-2.5">
      <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
        {label}
      </dt>
      <dd
        className={`text-neutral-800 dark:text-neutral-200 tabular-nums ${
          mono ? 'font-mono text-xs' : 'text-sm'
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

export async function generateStaticParams() {
  return books.map((book) => ({
    slug: book.slug,
  }));
}
