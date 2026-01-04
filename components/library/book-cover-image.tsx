'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Book } from '../../app/library/library-data';

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
  const [imgSrc, setImgSrc] = useState<string>(
    book.coverImage || getOpenLibraryUrl(book.isbn)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (book.coverImage && imgSrc === book.coverImage && book.isbn) {
      // Try Open Library API fallback
      setImgSrc(getOpenLibraryUrl(book.isbn));
    } else {
      // Show placeholder
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 ${className}`}
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
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={imgSrc}
        alt={`Cover of ${book.title}`}
        width={width}
        height={height}
        className={`object-cover transition-all duration-300 ${
          isLoading ? 'blur-sm scale-105' : 'blur-0 scale-100'
        }`}
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

function getOpenLibraryUrl(isbn?: string): string {
  if (!isbn) return '/covers/placeholder.jpg';
  return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
}
