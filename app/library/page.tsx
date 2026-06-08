'use client';

import { useState, useMemo } from 'react';
import { books, statusConfig, type ReadingStatus } from './library-data';
import { Bookshelf } from '@/components/library/bookshelf';

export default function LibraryPage() {
  const [statusFilter, setStatusFilter] = useState<ReadingStatus | 'all'>('all');
  const [genreFilter, setGenreFilter] = useState<string>('all');

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
        // Then by date (most recent first)
        const dateA = a.dateFinished?.date || a.dateStarted?.date || '0000';
        const dateB = b.dateFinished?.date || b.dateStarted?.date || '0000';
        return dateB.localeCompare(dateA);
      });
  }, [statusFilter, genreFilter]);

  const availableGenres = useMemo(() => {
    const set = new Set<string>();
    for (const book of books) for (const g of book.genres) set.add(g);
    return Array.from(set).sort();
  }, []);

  const hasActiveFilters = statusFilter !== 'all' || genreFilter !== 'all';

  const clearFilters = () => {
    setStatusFilter('all');
    setGenreFilter('all');
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="font-serif text-4xl text-neutral-900 dark:text-neutral-100">
          Library
          <span className="text-[#00693e] dark:text-[#a5d75f]">.</span>
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-pretty">
          Books that have shaped my thinking on technology, business, philosophy,
          and life. A personal collection of reads, current explorations, and
          future adventures.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
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

        <div className="w-px h-6 bg-[#cdb89a]/60 dark:bg-[#3a2e22]/80 self-center mx-1" />

        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          aria-label="Filter by genre"
          className="px-3 py-1.5 text-sm font-mono uppercase tracking-wide bg-transparent border border-[#cdb89a]/70 dark:border-[#3a2e22] text-neutral-700 dark:text-neutral-300 cursor-pointer hover:border-[#00693e] dark:hover:border-[#a5d75f] transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-[#00693e] dark:focus-visible:outline-[#a5d75f] focus-visible:outline-offset-2"
        >
          <option value="all">All Genres</option>
          {availableGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-1.5 text-sm font-medium text-[#00693e] dark:text-[#a5d75f] hover:underline underline-offset-4 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#00693e] dark:focus-visible:outline-[#a5d75f] focus-visible:outline-offset-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Shelves */}
      <Bookshelf books={filteredBooks} onClearFilters={clearFilters} />
    </section>
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
      className={`px-3 py-1.5 text-sm font-medium transition-colors border focus:outline-none focus-visible:outline-2 focus-visible:outline-[#00693e] dark:focus-visible:outline-[#a5d75f] focus-visible:outline-offset-2 ${
        active
          ? 'bg-[#00693e] text-[#FBF7EE] border-[#00693e] dark:bg-[#a5d75f] dark:text-neutral-900 dark:border-[#a5d75f]'
          : 'bg-transparent text-neutral-700 border-[#cdb89a]/70 hover:border-[#00693e] dark:text-neutral-300 dark:border-[#3a2e22] dark:hover:border-[#a5d75f]'
      }`}
    >
      {children}
    </button>
  );
}
