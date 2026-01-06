'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { Book } from '../../app/library/library-data';
import { calculateSpineWidth } from '../../app/library/library-data';
import { BookCoverImage } from './book-cover-image';

interface BookSpineProps {
  book: Book;
  index: number;
}

export function BookSpine({ book, index }: BookSpineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  // Scroll-based subtle tilt (kept for natural shelf feel)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scrollRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);
  const smoothScrollRotateY = useSpring(scrollRotateY, {
    stiffness: 100,
    damping: 20,
  });

  // Pull out toward viewer on hover (like grabbing a book)
  const translateZ = useSpring(isFlipping ? 60 : isHovered ? 25 : 0, {
    stiffness: 300,
    damping: 25,
  });

  // Tilt top forward on hover (natural grab motion)
  const rotateX = useSpring(isFlipping ? 0 : isHovered ? -6 : 0, {
    stiffness: 300,
    damping: 25,
  });

  // Flip to show cover on click
  const flipRotateY = useSpring(isFlipping ? -180 : 0, {
    stiffness: 100,
    damping: 20,
  });

  const spineWidth = calculateSpineWidth(book.pageCount);

  const handleClick = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      router.push(`/library/${book.slug}`);
    }, 600);
  };

  return (
    <motion.div
      ref={ref}
      onClick={handleClick}
      className="relative cursor-pointer flex-shrink-0"
      style={{
        width: spineWidth,
        height: 288,
        transformStyle: 'preserve-3d',
        translateZ,
        rotateX,
        rotateY: smoothScrollRotateY,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      onHoverStart={() => !isFlipping && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Rotating container for flip effect */}
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          rotateY: flipRotateY,
        }}
      >
        {/* FRONT: Spine */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{
            backgroundColor: book.dominantColor,
            backfaceVisibility: 'hidden',
            boxShadow:
              isHovered || isFlipping
                ? '8px 8px 20px rgba(0,0,0,0.35), 0 0 40px rgba(0,0,0,0.1)'
                : '2px 2px 6px rgba(0,0,0,0.2)',
            transition: 'box-shadow 0.2s ease',
          }}
        >
          {/* Left edge shadow */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-r from-black/30 to-transparent" />

          {/* Right edge highlight */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-white/10" />

          {/* Top/bottom edge shadows */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Vertical text - Title always visible, Author on hover */}
          <div className="absolute inset-x-0 top-4 bottom-4 flex flex-col items-center justify-center gap-1 overflow-hidden">
            {/* Title */}
            <span
              className="font-medium whitespace-nowrap"
              style={{
                color: book.textColor,
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontSize: spineWidth < 35 ? '10px' : '12px',
                letterSpacing: '0.5px',
              }}
            >
              {book.title}
            </span>

            {/* Author - fades in on hover */}
            <motion.span
              className="whitespace-nowrap"
              style={{
                color: book.textColor,
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontSize: spineWidth < 35 ? '8px' : '10px',
                letterSpacing: '0.3px',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.7 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {book.author}
            </motion.span>
          </div>
        </div>

        {/* BACK: Cover (pre-rotated 180° so it shows correctly when flipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: '8px 8px 20px rgba(0,0,0,0.35)',
          }}
        >
          <BookCoverImage
            book={book}
            width={spineWidth * 2.5}
            height={288}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
