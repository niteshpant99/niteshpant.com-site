'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import type { Book } from '../../app/library/library-data';
import { calculateSpineWidth } from '../../app/library/library-data';
import { BookSpine } from './book-spine';
import { BookCoverImage } from './book-cover-image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BookshelfProps {
  books: Book[];
  viewMode: 'shelf' | 'stack';
}

export function Bookshelf({ books, viewMode }: BookshelfProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-12 border border-neutral-200 dark:border-neutral-800">
        <p className="text-neutral-500 dark:text-neutral-400">
          No books found matching your filters.
        </p>
      </div>
    );
  }

  if (viewMode === 'stack') {
    return <StackView books={books} />;
  }

  return <ShelfView books={books} />;
}

function ShelfView({ books }: { books: Book[] }) {
  // Group books by status
  const reading = books.filter((b) => b.status === 'reading');
  const wantToRead = books.filter((b) => b.status === 'want-to-read');
  const read = books.filter((b) => b.status === 'read');

  return (
    <div className="space-y-12">
      {reading.length > 0 && (
        <ShelfSection title="Currently Reading" books={reading} />
      )}
      {wantToRead.length > 0 && (
        <ShelfSection title="Want to Read" books={wantToRead} />
      )}
      {read.length > 0 && <ShelfSection title="Read" books={read} />}
    </div>
  );
}

function ShelfSection({ title, books }: { title: string; books: Book[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(800);

  // Use motion value for scroll position - this doesn't trigger re-renders
  const scrollX = useMotionValue(0);

  // Pre-calculate each book's X offset (cumulative position from start)
  // This avoids getBoundingClientRect calls during animation
  const bookOffsets = useMemo(() => {
    const gap = 4; // gap-1 = 0.25rem = 4px
    const offsets: number[] = [];
    let cumulative = 0;

    for (const book of books) {
      offsets.push(cumulative);
      cumulative += calculateSpineWidth(book.pageCount) + gap;
    }
    return offsets;
  }, [books]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Set initial container width
    setContainerWidth(container.clientWidth);

    // Update motion value on scroll (no re-renders!)
    const handleScroll = () => {
      scrollX.set(container.scrollLeft);
    };

    // Update container width on resize
    const handleResize = () => {
      setContainerWidth(container.clientWidth);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollX]);

  return (
    <div>
      <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4 uppercase tracking-wider">
        {title}
      </h3>
      <div
        ref={scrollContainerRef}
        className={cn(
          'overflow-x-auto overflow-y-visible pb-2',
          'scrollbar-thin scrollbar-track-neutral-100 scrollbar-thumb-neutral-300',
          'dark:scrollbar-track-neutral-800 dark:scrollbar-thumb-neutral-600'
        )}
      >
        {/* Books container with extra padding for hover/tilt effects */}
        <div className="min-w-max pt-16 pb-4 px-4">
          {/* Books row with perspective - high value = subtle 3D, low distortion */}
          <div
            className="flex items-end gap-1"
            style={{ perspective: '2500px', perspectiveOrigin: 'center center' }}
          >
            {books.map((book, index) => (
              <BookSpine
                key={book.slug}
                book={book}
                index={index}
                scrollX={scrollX}
                offsetX={bookOffsets[index]}
                containerWidth={containerWidth}
              />
            ))}
          </div>

          {/* Shelf surface - warm wood tone */}
          <div className="mt-2 h-4 bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 dark:from-amber-800 dark:via-amber-900 dark:to-amber-950 shadow-lg rounded-sm" />

          {/* Shelf bracket/edge */}
          <div className="h-2 bg-gradient-to-b from-amber-900 to-amber-950 dark:from-amber-950 dark:to-black rounded-b-sm" />
        </div>
      </div>
    </div>
  );
}

function StackView({ books }: { books: Book[] }) {
  // Group books by status
  const reading = books.filter((b) => b.status === 'reading');
  const wantToRead = books.filter((b) => b.status === 'want-to-read');
  const read = books.filter((b) => b.status === 'read');

  return (
    <div className="space-y-10">
      {reading.length > 0 && (
        <StackSection title="Currently Reading" books={reading} />
      )}
      {wantToRead.length > 0 && (
        <StackSection title="Want to Read" books={wantToRead} />
      )}
      {read.length > 0 && <StackSection title="Read" books={read} />}
    </div>
  );
}

function StackSection({ title, books }: { title: string; books: Book[] }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-4 uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-2">
        {books.map((book, index) => (
          <motion.div
            key={book.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.2 }}
          >
            <Link href={`/library/${book.slug}`}>
              <div
                className="group relative overflow-hidden"
                style={{
                  marginLeft: `${(index % 4) * 6}px`,
                }}
              >
                {/* Card with spine color background */}
                <div
                  className="flex items-center gap-4 p-3 pr-5 transition-all duration-200 group-hover:brightness-110"
                  style={{
                    backgroundColor: book.dominantColor,
                  }}
                >
                  {/* Cover thumbnail */}
                  <div className="flex-shrink-0 shadow-md">
                    <BookCoverImage
                      book={book}
                      width={50}
                      height={75}
                      className="rounded-sm"
                    />
                  </div>

                  {/* Book info */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-medium truncate text-sm"
                      style={{ color: book.textColor }}
                    >
                      {book.title}
                    </h3>
                    <p
                      className="text-xs opacity-80 truncate"
                      style={{ color: book.textColor }}
                    >
                      {book.author}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div
                    className="opacity-0 group-hover:opacity-70 transition-opacity text-sm"
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
    </div>
  );
}
