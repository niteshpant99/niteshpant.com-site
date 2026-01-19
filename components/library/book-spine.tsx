'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useSpring,
  useTransform,
  MotionValue,
} from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { Book } from '../../app/library/library-data';
import {
  calculateSpineWidth,
  calculateSpineHeight,
} from '../../app/library/library-data';
import { BookCoverImage } from './book-cover-image';

interface BookSpineProps {
  book: Book;
  index: number;
  scrollX: MotionValue<number>;
  offsetX: number; // Pre-calculated cumulative X position
  containerWidth: number; // Visible width of scroll container
}

export function BookSpine({
  book,
  index,
  scrollX,
  offsetX,
  containerWidth,
}: BookSpineProps) {
  const spineRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const spineWidth = calculateSpineWidth(book.pageCount);
  const spineHeight = calculateSpineHeight(book.pageCount);

  // Font sizes based on spine width (thickness), not title length
  const titleFontSize = spineWidth < 30 ? 10 : spineWidth < 45 ? 11 : 12;
  const authorFontSize = titleFontSize - 2;

  // Subtle scroll-based tilt - 4° max for modern, refined look
  const scrollBasedRotateY = useTransform(scrollX, (scroll) => {
    const bookCenterInView = offsetX + spineWidth / 2 - scroll;
    const viewCenter = containerWidth / 2;
    const distanceFromCenter = bookCenterInView - viewCenter;
    const normalizedDistance = distanceFromCenter / (containerWidth / 2);
    const clamped = Math.max(-1, Math.min(1, normalizedDistance));
    // Reduced from 12° to 4° for subtle, modern feel
    return clamped * -4;
  });

  // Snappy spring - less bouncy, more refined
  const smoothRotateY = useSpring(scrollBasedRotateY, {
    stiffness: 150,
    damping: 25,
    mass: 0.5,
  });

  // Hover: gentle lift (translateY) instead of dramatic 3D pull
  const hoverTranslateY = useSpring(isHovered ? -4 : 0, {
    stiffness: 300,
    damping: 30,
  });

  // Floating cover opacity - shows on hover
  const coverOpacity = useSpring(isHovered ? 1 : 0, {
    stiffness: 300,
    damping: 25,
  });

  // Direct navigation - no flip animation (honest about digital)
  const handleClick = () => {
    router.push(`/library/${book.slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      ref={spineRef}
      role="button"
      tabIndex={0}
      aria-label={`${book.title} by ${book.author}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="relative cursor-pointer flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900 rounded-sm"
      style={{
        width: spineWidth,
        height: spineHeight,
        rotateY: smoothRotateY,
        translateY: hoverTranslateY,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.015, duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Floating cover thumbnail - appears on hover above the spine */}
      <motion.div
        className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          opacity: coverOpacity,
        }}
      >
        <div className="shadow-xl rounded-sm overflow-hidden border border-white/20">
          <BookCoverImage
            book={book}
            width={Math.max(48, spineWidth * 1.5)}
            height={Math.max(64, spineWidth * 2)}
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Book spine - clean, modern design */}
      <div
        className="relative w-full h-full rounded-sm overflow-hidden"
        style={{
          backgroundColor: book.dominantColor,
          // Single refined box-shadow instead of multiple gradients
          boxShadow: isHovered
            ? '0 4px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)'
            : '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
          transition: 'box-shadow 0.2s ease',
        }}
      >
        {/* Subtle left edge for depth */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-black/20" />

        {/* Vertical text - Title always visible, Author reveals on hover */}
          <motion.div
            layout
            className="absolute inset-x-0 top-4 bottom-4 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Title - allows line breaks for long titles */}
            <motion.span
              layout
              className="font-medium text-center"
              style={{
                color: book.textColor,
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontSize: `${titleFontSize}px`,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                lineHeight: 1.3,
                wordBreak: 'break-word',
              }}
            >
              {book.title}
            </motion.span>

            {/* Author - height-based reveal on hover */}
            <motion.span
              className="whitespace-nowrap overflow-hidden"
              style={{
                color: book.textColor,
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontSize: `${authorFontSize}px`,
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              }}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{
                opacity: isHovered ? 0.8 : 0,
                height: isHovered ? 'auto' : 0,
                marginTop: isHovered ? 8 : 0,
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {book.author}
            </motion.span>
          </motion.div>
      </div>
    </motion.div>
  );
}
