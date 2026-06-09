'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import type { Book } from '../../app/library/library-data';
import { calculateSpineWidth, SPINE_HEIGHT } from '../../app/library/library-data';

interface BookSpineProps {
  book: Book;
}

const REST_SHADOW =
  'inset 1px 0 0 rgba(255,255,255,.06), inset -1px 0 0 rgba(0,0,0,.25), 0 1px 3px rgba(20,14,8,.18)';
const HOVER_SHADOW =
  'inset 1px 0 0 rgba(255,255,255,.08), inset -1px 0 0 rgba(0,0,0,.28), 0 10px 22px -6px rgba(20,14,8,.45)';

// A single upright book spine: leather binding, gold-foil serif title, with two
// foil head/tail bands. Real <Link> anchor (keyboard, cmd-click, prefetch).
export function BookSpine({ book }: BookSpineProps) {
  const reduce = useReducedMotion();
  const width = calculateSpineWidth(book.pageCount);

  return (
    <li className="list-none">
      <Link
        href={`/library/${book.slug}`}
        aria-label={`${book.title} by ${book.author}`}
        className="group block rounded-[2px] focus:outline-none focus-visible:outline-2 focus-visible:outline-[#00693e] dark:focus-visible:outline-[#a5d75f] focus-visible:outline-offset-2"
      >
        <motion.div
          className="relative rounded-[2px] overflow-hidden"
          style={{
            width,
            height: SPINE_HEIGHT,
            backgroundColor: book.dominantColor,
            boxShadow: REST_SHADOW,
          }}
          whileHover={reduce ? undefined : { y: -6, boxShadow: HOVER_SHADOW }}
          whileTap={reduce ? undefined : { scale: 0.985 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.6 }}
        >
          {/* Foil head + tail bands */}
          <span
            className="absolute inset-x-1 top-3 h-px"
            style={{ backgroundColor: 'rgba(200,162,74,0.7)' }}
            aria-hidden
          />
          <span
            className="absolute inset-x-1 bottom-3 h-px"
            style={{ backgroundColor: 'rgba(200,162,74,0.7)' }}
            aria-hidden
          />

          {/* Vertical foil title */}
          <span className="absolute inset-0 flex items-center justify-center px-0.5">
            <span
              className="font-serif font-semibold text-center"
              style={{
                color: book.textColor,
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontSize: '13px',
                letterSpacing: '0.02em',
                lineHeight: 1.15,
                maxHeight: SPINE_HEIGHT - 36,
                overflow: 'hidden',
                textShadow:
                  '0 1px 0 rgba(255,240,200,.18), 0 -1px 1px rgba(0,0,0,.45)',
              }}
            >
              {book.title}
            </span>
          </span>
        </motion.div>
      </Link>
    </li>
  );
}
