'use client';

import { useMemo } from 'react';
import type { Book } from '../../app/library/library-data';
import { SPINE_HEIGHT } from '../../app/library/library-data';
import { BookSpine } from './book-spine';

interface BookshelfProps {
  books: Book[];
  onClearFilters?: () => void;
}

// One opinionated view: upright leather spines that wrap into level shelves
// inside the 640px column. No horizontal scroll, no Shelf/Stack toggle.
export function Bookshelf({ books, onClearFilters }: BookshelfProps) {
  const { reading, wantToRead, read } = useMemo(() => {
    const reading: Book[] = [];
    const wantToRead: Book[] = [];
    const read: Book[] = [];
    for (const book of books) {
      if (book.status === 'reading') reading.push(book);
      else if (book.status === 'want-to-read') wantToRead.push(book);
      else if (book.status === 'read') read.push(book);
    }
    return { reading, wantToRead, read };
  }, [books]);

  if (books.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-neutral-500 dark:text-neutral-400 mb-4">
          No books match these filters
        </p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm font-medium text-[#00693e] dark:text-[#a5d75f] hover:underline underline-offset-4 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#00693e] dark:focus-visible:outline-[#a5d75f] focus-visible:outline-offset-2"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-14">
      {reading.length > 0 && <ShelfSection title="Reading" books={reading} />}
      {wantToRead.length > 0 && (
        <ShelfSection title="Want to Read" books={wantToRead} />
      )}
      {read.length > 0 && <ShelfSection title="Read" books={read} />}
    </div>
  );
}

function ShelfSection({ title, books }: { title: string; books: Book[] }) {
  // A warm wood rail + soft shadow lane drawn under EVERY wrapped row via a
  // repeating gradient. Pitch = spine height + the 6px row gap, so each row of
  // (uniform-height) spines rests cleanly on its own shelf.
  const railPitch = SPINE_HEIGHT + 6;
  const railStyle = {
    backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent ${SPINE_HEIGHT}px, var(--rail) ${SPINE_HEIGHT}px, var(--rail) ${SPINE_HEIGHT + 2}px, var(--rail-shadow) ${SPINE_HEIGHT + 2}px, rgba(0,0,0,0) ${railPitch}px)`,
    backgroundSize: `100% ${railPitch}px`,
  };

  return (
    <section>
      <header className="flex items-baseline justify-between border-b border-[#cdb89a]/60 dark:border-[#3a2e22]/80 pb-1.5 mb-6">
        <h2 className="font-mono text-[12px] uppercase tracking-[0.12em] text-neutral-500 dark:text-neutral-400">
          {title}
        </h2>
        <span className="font-mono text-[12px] tabular-nums text-neutral-400 dark:text-neutral-500">
          {books.length}
        </span>
      </header>
      <ul
        className="flex flex-wrap items-end gap-x-[3px] gap-y-[6px] [--rail:rgba(185,138,82,0.55)] [--rail-shadow:rgba(0,0,0,0.10)] dark:[--rail:rgba(74,56,38,0.95)] dark:[--rail-shadow:rgba(0,0,0,0.45)]"
        style={railStyle}
      >
        {books.map((book) => (
          <BookSpine key={book.slug} book={book} />
        ))}
      </ul>
    </section>
  );
}
