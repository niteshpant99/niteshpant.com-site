'use client';

import { useState } from 'react';
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
  const initialSrc = book.coverImage || (book.isbn ? getOpenLibraryUrl(book.isbn) : null);

  const [imgSrc, setImgSrc] = useState<string | null>(initialSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(!initialSrc); // Start with error if no valid source

  const handleError = () => {
    if (book.coverImage && imgSrc === book.coverImage && book.isbn) {
      // Try Open Library API fallback
      setImgSrc(getOpenLibraryUrl(book.isbn));
    } else {
      // Show placeholder
      setHasError(true);
    }
  };

  if (hasError || !imgSrc) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-neutral-100 dark:bg-neutral-800',
          className
        )}
        style={{ width, height }}
      >
        <div className="text-center p-4">
          <div className="text-2xl mb-2">📚</div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
            {book.title}
          </p>
        </div>
      </div>
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
        onLoad={() => setIsLoading(false)}
        priority={priority}
      />
      {isLoading && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: book.dominantColor }}
        />
      )}
    </div>
  );
}

function getOpenLibraryUrl(isbn: string): string {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
}
