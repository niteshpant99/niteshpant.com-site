'use client';

import { useState, useMemo } from 'react';
import {
  books,
  genres,
  statusConfig,
  type ReadingStatus,
} from './library-data';
import { Bookshelf } from '@/components/library/bookshelf';

type ViewMode = 'shelf' | 'stack';

export default function LibraryPage() {
  // View mode
  const [viewMode, setViewMode] = useState<ViewMode>('shelf');

  // Filters
  const [statusFilter, setStatusFilter] = useState<ReadingStatus | 'all'>(
    'all'
  );
  const [genreFilter, setGenreFilter] = useState<string>('all');

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        if (statusFilter !== 'all' && book.status !== statusFilter) return false;
        if (genreFilter !== 'all' && !book.genres.includes(genreFilter))
          return false;
        return true;
      })
      .sort((a, b) => {
        // Currently reading first
        if (a.status === 'reading' && b.status !== 'reading') return -1;
        if (b.status === 'reading' && a.status !== 'reading') return 1;

        // Then by date read (most recent first)
        const dateA = a.dateFinished?.date || a.dateStarted?.date || '0000';
        const dateB = b.dateFinished?.date || b.dateStarted?.date || '0000';
        return dateB.localeCompare(dateA);
      });
  }, [statusFilter, genreFilter]);

  // Stats and available genres - single iteration over books
  const { stats, availableGenres } = useMemo(() => {
    let read = 0,
      reading = 0,
      wantToRead = 0;
    const genreSet = new Set<string>();

    for (const book of books) {
      // Count by status
      if (book.status === 'read') read++;
      else if (book.status === 'reading') reading++;
      else if (book.status === 'want-to-read') wantToRead++;

      // Collect genres
      for (const genre of book.genres) {
        genreSet.add(genre);
      }
    }

    return {
      stats: { read, reading, wantToRead },
      availableGenres: Array.from(genreSet).sort(),
    };
  }, []);

  const hasActiveFilters = statusFilter !== 'all' || genreFilter !== 'all';

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-medium text-neutral-900 dark:text-neutral-100 text-balance">
          Library
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-pretty">
          Books that have shaped my thinking on technology, business, philosophy,
          and life. A personal collection of reads, current explorations, and
          future adventures.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Read" value={stats.read} />
        <StatCard label="Reading" value={stats.reading} />
        <StatCard label="Want to Read" value={stats.wantToRead} />
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* View Toggle + Book Count */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
          </span>

          <div
            role="group"
            aria-label="View mode"
            className="flex items-center gap-0 border border-neutral-200 dark:border-neutral-800"
          >
            <button
              onClick={() => setViewMode('shelf')}
              aria-pressed={viewMode === 'shelf'}
              className={`px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950 ${
                viewMode === 'shelf'
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              Shelf
            </button>
            <button
              onClick={() => setViewMode('stack')}
              aria-pressed={viewMode === 'stack'}
              className={`px-3 py-1.5 text-sm font-medium transition-colors border-l border-neutral-200 dark:border-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950 ${
                viewMode === 'stack'
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              Stack
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Status filter */}
          <FilterButton
            active={statusFilter === 'all'}
            onClick={() => setStatusFilter('all')}
          >
            All
          </FilterButton>
          {(Object.keys(statusConfig) as ReadingStatus[]).map((status) => (
            <FilterButton
              key={status}
              active={statusFilter === status}
              onClick={() => setStatusFilter(status)}
            >
              {statusConfig[status].label}
            </FilterButton>
          ))}

          {/* Divider */}
          <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 self-center mx-1" />

          {/* Genre dropdown */}
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            aria-label="Filter by genre"
            className="px-3 py-1.5 text-sm font-medium bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950"
          >
            <option value="all">All Genres</option>
            {availableGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                setStatusFilter('all');
                setGenreFilter('all');
              }}
              className="px-3 py-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Bookshelf */}
      <Bookshelf
        books={filteredBooks}
        viewMode={viewMode}
        onClearFilters={() => {
          setStatusFilter('all');
          setGenreFilter('all');
        }}
      />
    </section>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="p-4 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        {value}
      </div>
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        {label}
      </div>
    </div>
  );
}

function FilterButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`px-3 py-1.5 text-sm font-medium transition-colors border focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950 ${
        active
          ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100'
          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 dark:bg-neutral-950 dark:text-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700'
      }`}
    >
      {children}
    </button>
  );
}
