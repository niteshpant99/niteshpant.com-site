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
  const [isFlipping, setIsFlipping] = useState(false);

  const spineWidth = calculateSpineWidth(book.pageCount);
  const spineHeight = calculateSpineHeight(book.pageCount);

  // Calculate scroll-based tilt using PURE MATH - no DOM queries!
  // Books tilt based on their position relative to the viewport center
  // This creates a smooth wave effect as you scroll
  const scrollBasedRotateY = useTransform(scrollX, (scroll) => {
    // Book's center position relative to what's currently visible
    // offsetX is the book's position from start of row
    // scroll is how far we've scrolled
    // So (offsetX - scroll) is the book's position in the visible area
    const bookCenterInView = offsetX + spineWidth / 2 - scroll;

    // Distance from center of visible container
    const viewCenter = containerWidth / 2;
    const distanceFromCenter = bookCenterInView - viewCenter;

    // Normalize distance: -1 (far left) to +1 (far right)
    // Use half container width as the range for full tilt
    const normalizedDistance = distanceFromCenter / (containerWidth / 2);

    // Clamp to -1 to 1 range
    const clamped = Math.max(-1, Math.min(1, normalizedDistance));

    // Map to rotation angle - 12 degrees for subtle, elegant tilt without distortion
    // Negative because books on the right should tilt left (toward center)
    return clamped * -12;
  });

  // Smooth the scroll-based rotation with a SOFTER spring for fluid motion
  const smoothRotateY = useSpring(scrollBasedRotateY, {
    stiffness: 80, // Lower = slower, smoother
    damping: 15, // Lower = more bouncy
    mass: 0.8, // Higher = more momentum
  });

  // Hover: pull book toward viewer (translateZ)
  const hoverTranslateZ = useSpring(isHovered ? 30 : 0, {
    stiffness: 200,
    damping: 20,
  });

  // Subtle backward tilt on hover (like pulling book toward you)
  const hoverRotateX = useSpring(isHovered ? -5 : 0, {
    stiffness: 200,
    damping: 20,
  });

  // Flip animation for click
  const flipRotateY = useSpring(isFlipping ? -180 : 0, {
    stiffness: 80,
    damping: 15,
  });

  const flipTranslateZ = useSpring(isFlipping ? 100 : 0, {
    stiffness: 80,
    damping: 15,
  });

  // Combine all transforms into final values
  // When flipping, ignore scroll rotation
  const finalRotateY = useTransform(
    [smoothRotateY, flipRotateY],
    ([scrollRot, flipRot]) => {
      if (isFlipping) return flipRot as number;
      // When hovering, reduce scroll rotation so the book faces forward more
      if (isHovered) return (scrollRot as number) * 0.3;
      return scrollRot as number;
    }
  );

  const finalTranslateZ = useTransform(
    [hoverTranslateZ, flipTranslateZ],
    ([hover, flip]) => Math.max(hover as number, flip as number)
  );

  // Floating cover opacity - shows on hover
  const coverOpacity = useSpring(isHovered && !isFlipping ? 1 : 0, {
    stiffness: 300,
    damping: 25,
  });

  const handleClick = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      router.push(`/library/${book.slug}`);
    }, 700);
  };

  return (
    <motion.div
      ref={spineRef}
      onClick={handleClick}
      className="relative cursor-pointer flex-shrink-0"
      style={{
        width: spineWidth,
        height: spineHeight,
        transformStyle: 'preserve-3d',
        rotateY: finalRotateY,
        rotateX: hoverRotateX,
        translateZ: finalTranslateZ,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      onHoverStart={() => !isFlipping && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Floating cover thumbnail - appears on hover above the spine */}
      <motion.div
        className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none z-10"
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

      {/* Book spine container with 3D effect */}
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          rotateY: isFlipping ? flipRotateY : 0,
        }}
      >
        {/* FRONT: Spine */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-sm"
          style={{
            backgroundColor: book.dominantColor,
            backfaceVisibility: 'hidden',
            boxShadow:
              isHovered || isFlipping
                ? '8px 8px 24px rgba(0,0,0,0.5), inset 0 0 30px rgba(255,255,255,0.05)'
                : '3px 3px 10px rgba(0,0,0,0.3), inset 0 0 20px rgba(255,255,255,0.03)',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Left edge shadow - book binding effect */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

          {/* Right edge highlight - page edge effect */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-white/10 via-white/5 to-transparent" />

          {/* Top edge shadow */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-black/25 via-black/10 to-transparent" />

          {/* Bottom edge shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-black/25 via-black/10 to-transparent" />

          {/* Vertical text - Title always visible, Author on hover */}
          <div className="absolute inset-x-0 top-4 bottom-4 flex flex-col items-center justify-center gap-2 overflow-hidden">
            {/* Title */}
            <span
              className="font-medium whitespace-nowrap"
              style={{
                color: book.textColor,
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontSize: spineWidth < 35 ? '10px' : '12px',
                letterSpacing: '0.5px',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
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
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.8 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {book.author}
            </motion.span>
          </div>
        </div>

        {/* BACK: Cover (pre-rotated 180 deg so it shows correctly when flipped) */}
        <div
          className="absolute inset-0 overflow-hidden rounded-sm"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            boxShadow: '8px 8px 24px rgba(0,0,0,0.5)',
          }}
        >
          <BookCoverImage
            book={book}
            width={spineWidth * 2.5}
            height={spineHeight}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
