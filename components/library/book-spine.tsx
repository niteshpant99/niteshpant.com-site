'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import type { Book } from '../../app/library/library-data';
import { calculateSpineWidth } from '../../app/library/library-data';
import { BookCoverImage } from './book-cover-image';

interface BookSpineProps {
  book: Book;
  index: number;
}

export function BookSpine({ book, index }: BookSpineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll-based tilt animation using motion values (no React state)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Create smooth spring-based tilt
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 3]);
  const smoothRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  // Scale on hover
  const scale = useSpring(isHovered ? 1.02 : 1, {
    stiffness: 300,
    damping: 25,
  });

  const spineWidth = calculateSpineWidth(book.pageCount);

  return (
    <Link href={`/library/${book.slug}`} className="focus:outline-none">
      <motion.div
        ref={ref}
        className="group relative cursor-pointer flex-shrink-0"
        style={{
          width: spineWidth,
          rotateY: smoothRotateY,
          transformStyle: 'preserve-3d',
          scale,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03, duration: 0.4 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Spine body */}
        <div
          className="relative h-72 md:h-80 flex items-center justify-center overflow-hidden transition-shadow duration-200"
          style={{
            backgroundColor: book.dominantColor,
            boxShadow: isHovered
              ? '4px 4px 12px rgba(0,0,0,0.3)'
              : '2px 2px 6px rgba(0,0,0,0.2)',
          }}
        >
          {/* Left edge shadow */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/30 to-transparent" />

          {/* Right edge highlight */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10" />

          {/* Top/bottom edge shadows */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Vertical text */}
          <div
            className="absolute inset-2 flex flex-col items-center justify-center gap-2 overflow-hidden"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
            }}
          >
            {/* Author - smaller, at top */}
            <span
              className="text-xs font-normal opacity-80 truncate max-h-24"
              style={{ color: book.textColor }}
            >
              {book.author}
            </span>

            {/* Title - larger, main text */}
            <span
              className="text-sm font-medium truncate max-h-48"
              style={{ color: book.textColor }}
            >
              {book.title}
            </span>
          </div>

          {/* Hover shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '100%' : '-100%' }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Floating cover thumbnail on hover */}
        <motion.div
          className="absolute -top-40 left-1/2 z-50 pointer-events-none"
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20,
            x: '-50%',
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="shadow-2xl rounded-sm overflow-hidden border-2 border-white dark:border-neutral-700 bg-white dark:bg-neutral-900">
            <BookCoverImage book={book} width={100} height={150} />
          </div>
          {/* Arrow pointing down */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-neutral-900 rotate-45 border-r border-b border-white dark:border-neutral-700" />
        </motion.div>

        {/* Rating indicator (if rated) */}
        {book.rating && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {'★'.repeat(book.rating)}
          </div>
        )}
      </motion.div>
    </Link>
  );
}
