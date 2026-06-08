'use client';

import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import Image from 'next/image';
import type { Book } from '../../app/library/library-data';
import { cn } from '@/lib/utils';

interface BookCoverImageProps {
  book: Book;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function BookCoverImage({
  book,
  width,
  height,
  className = '',
  priority = false,
}: BookCoverImageProps) {
  // Determine initial image source - only use valid URLs
  const initialSrc =
    book.coverImage || (book.isbn ? getOpenLibraryUrl(book.isbn) : null);

  const [imgSrc, setImgSrc] = useState<string | null>(initialSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(!initialSrc);

  const handleError = () => {
    if (book.coverImage && imgSrc === book.coverImage && book.isbn) {
      // Local cover failed - try the Open Library API
      setImgSrc(getOpenLibraryUrl(book.isbn));
    } else {
      setHasError(true);
    }
  };

  // Open Library can still return a 1x1 blank pixel (HTTP 200) for some
  // missing covers, which never triggers onError - treat it as a failure.
  const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.naturalWidth <= 1 || img.naturalHeight <= 1) {
      setHasError(true);
      return;
    }
    setIsLoading(false);
  };

  if (hasError || !imgSrc) {
    return (
      <BookCoverFallback
        book={book}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={imgSrc}
        alt={`Cover of ${book.title}`}
        width={width}
        height={height}
        className={cn(
          'object-cover transition-opacity duration-200',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
      />
      {isLoading && (
        // Static paper-tone skeleton - never a saturated pulse.
        <div className="absolute inset-0 bg-[#F5EEDD] dark:bg-[#12100C]" />
      )}
    </div>
  );
}

// A designed leather "bookplate" shown when no real cover exists: the title in
// gold-foil serif on the genre's leather binding - a deliberate house binding,
// never an emoji or blank box.
export function BookCoverFallback({
  book,
  width,
  height,
  className = '',
}: {
  book: Book;
  width: number;
  height: number;
  className?: string;
}) {
  const titleSize = Math.max(11, Math.min(18, Math.round(width * 0.13)));
  const authorSize = Math.max(8, Math.min(11, Math.round(titleSize * 0.62)));

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center overflow-hidden px-2 text-center',
        className
      )}
      style={{
        width,
        height,
        backgroundColor: book.dominantColor,
        boxShadow:
          'inset 0 0 0 1px rgba(236,223,176,.55), inset 0 0 0 4px rgba(0,0,0,.18)',
      }}
    >
      <span
        className="font-serif font-medium leading-tight line-clamp-3 text-balance"
        style={{
          color: '#ECDFB0',
          fontSize: titleSize,
          textShadow:
            '0 1px 0 rgba(255,240,200,.18), 0 -1px 1px rgba(0,0,0,.45)',
        }}
      >
        {book.title}
      </span>
      <span
        className="mt-1.5 font-mono uppercase tracking-[0.08em] line-clamp-1"
        style={{ color: '#ECDFB0', opacity: 0.7, fontSize: authorSize }}
      >
        {book.author}
      </span>
    </div>
  );
}

function getOpenLibraryUrl(isbn: string): string {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;
}
