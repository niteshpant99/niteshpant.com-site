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
  const [ratingFilter, setRatingFilter] = useState<number>(0);

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        if (statusFilter !== 'all' && book.status !== statusFilter) return false;
        if (genreFilter !== 'all' && !book.genres.includes(genreFilter))
          return false;
        if (ratingFilter > 0 && (book.rating || 0) < ratingFilter) return false;
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
  }, [statusFilter, genreFilter, ratingFilter]);

  // Stats
  const stats = useMemo(() => {
    const read = books.filter((b) => b.status === 'read').length;
    const reading = books.filter((b) => b.status === 'reading').length;
    const wantToRead = books.filter((b) => b.status === 'want-to-read').length;
    const totalPages = books
      .filter((b) => b.status === 'read')
      .reduce((sum, b) => sum + b.pageCount, 0);
    return { read, reading, wantToRead, totalPages };
  }, []);

  // Get unique genres that exist in current books
  const availableGenres = useMemo(() => {
    const genreSet = new Set<string>();
    books.forEach((book) => book.genres.forEach((g) => genreSet.add(g)));
    return Array.from(genreSet).sort();
  }, []);

  const hasActiveFilters =
    statusFilter !== 'all' || genreFilter !== 'all' || ratingFilter > 0;

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
          Library
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Books that have shaped my thinking on technology, business, philosophy,
          and life. A personal collection of reads, current explorations, and
          future adventures.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Read" value={stats.read} />
        <StatCard label="Reading" value={stats.reading} />
        <StatCard label="Want to Read" value={stats.wantToRead} />
        <StatCard label="Pages Read" value={stats.totalPages.toLocaleString()} />
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* View Toggle + Book Count */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
          </span>

          <div className="flex items-center gap-0 border border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setViewMode('shelf')}
              className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === 'shelf'
                  ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                  : 'bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              Shelf
            </button>
            <button
              onClick={() => setViewMode('stack')}
              className={`px-3 py-1.5 text-sm font-medium transition-colors border-l border-neutral-200 dark:border-neutral-800 ${
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
            className="px-3 py-1.5 text-sm font-medium bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
          >
            <option value="all">All Genres</option>
            {availableGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          {/* Rating filter */}
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(Number(e.target.value))}
            className="px-3 py-1.5 text-sm font-medium bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
          >
            <option value={0}>Any Rating</option>
            <option value={5}>★★★★★ only</option>
            <option value={4}>★★★★☆ & up</option>
            <option value={3}>★★★☆☆ & up</option>
          </select>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                setStatusFilter('all');
                setGenreFilter('all');
                setRatingFilter(0);
              }}
              className="px-3 py-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Bookshelf */}
      <Bookshelf books={filteredBooks} viewMode={viewMode} />
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
      className={`px-3 py-1.5 text-sm font-medium transition-colors border ${
        active
          ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100'
          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 dark:bg-neutral-950 dark:text-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700'
      }`}
    >
      {children}
    </button>
  );
}
