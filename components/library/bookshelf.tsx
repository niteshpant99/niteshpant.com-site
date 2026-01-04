'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Book } from '../../app/library/library-data';
import { BookSpine } from './book-spine';
import { BookCoverImage } from './book-cover-image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BookshelfProps {
  books: Book[];
  viewMode: 'shelf' | 'stack';
}

export function Bookshelf({ books, viewMode }: BookshelfProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (books.length === 0) {
    return (
      <div className="text-center py-16 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
        <p className="text-neutral-500 dark:text-neutral-400">
          No books found matching your filters.
        </p>
      </div>
    );
  }

  if (viewMode === 'stack') {
    return <StackView books={books} />;
  }

  return <ShelfView books={books} containerRef={containerRef} />;
}

function ShelfView({
  books,
  containerRef,
}: {
  books: Book[];
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="relative">
      {/* Full-width breakout container */}
      <div
        ref={containerRef}
        className={cn(
          'relative w-screen left-1/2 right-1/2 -mx-[50vw]',
          'overflow-x-auto overflow-y-visible',
          'scrollbar-thin scrollbar-track-neutral-100 scrollbar-thumb-neutral-300',
          'dark:scrollbar-track-neutral-800 dark:scrollbar-thumb-neutral-600'
        )}
      >
        {/* Bookshelf container */}
        <div className="min-w-max px-8 md:px-16 lg:px-24 pt-44 pb-8">
          {/* Books row */}
          <div className="flex items-end gap-0.5">
            {books.map((book, index) => (
              <BookSpine key={book.slug} book={book} index={index} />
            ))}
          </div>

          {/* Shelf surface */}
          <div className="mt-2 h-4 bg-gradient-to-b from-neutral-400 to-neutral-500 dark:from-neutral-600 dark:to-neutral-700 shadow-lg" />

          {/* Shelf bracket/support */}
          <div className="h-2 bg-gradient-to-b from-neutral-500 to-neutral-600 dark:from-neutral-700 dark:to-neutral-800" />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-0 right-0 left-0 flex justify-center pb-2">
        <p className="text-xs text-neutral-400 dark:text-neutral-500 bg-white/80 dark:bg-neutral-950/80 px-3 py-1 rounded-full">
          ← Scroll to browse →
        </p>
      </div>
    </div>
  );
}

function StackView({ books }: { books: Book[] }) {
  return (
    <div className="space-y-3">
      {books.map((book, index) => (
        <motion.div
          key={book.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link href={`/library/${book.slug}`}>
            <div
              className="group relative overflow-hidden transition-all duration-200 hover:translate-x-1"
              style={{
                marginLeft: `${(index % 5) * 8}px`,
              }}
            >
              {/* Card with spine color background */}
              <div
                className="flex items-center gap-4 p-4 pr-6"
                style={{
                  backgroundColor: book.dominantColor,
                }}
              >
                {/* Cover thumbnail */}
                <div className="flex-shrink-0 shadow-lg">
                  <BookCoverImage
                    book={book}
                    width={60}
                    height={90}
                    className="rounded-sm"
                  />
                </div>

                {/* Book info */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-medium truncate"
                    style={{ color: book.textColor }}
                  >
                    {book.title}
                  </h3>
                  <p
                    className="text-sm opacity-80 truncate"
                    style={{ color: book.textColor }}
                  >
                    {book.author}
                  </p>

                  {/* Rating */}
                  {book.rating && (
                    <div
                      className="mt-1 text-xs opacity-70"
                      style={{ color: book.textColor }}
                    >
                      {'★'.repeat(book.rating)}
                      {'☆'.repeat(5 - book.rating)}
                    </div>
                  )}
                </div>

                {/* Arrow indicator */}
                <div
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: book.textColor }}
                >
                  →
                </div>
              </div>

              {/* Book spine edge effect */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{
                  background: `linear-gradient(to right, rgba(0,0,0,0.3), transparent)`,
                }}
              />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
