// Library Data - Types and Book Collection

export type ReadingStatus = 'read' | 'reading' | 'want-to-read';

export interface DateInfo {
  date: string; // ISO date string (YYYY-MM-DD)
  isEstimate: boolean; // Flag for uncertain dates
}

export interface Book {
  // Core identification
  slug: string;
  title: string;
  author: string;

  // Visual properties
  coverImage?: string; // Local path in /public/covers/
  dominantColor: string; // Hex color for spine background
  textColor: string; // Contrasting text color for spine
  pageCount: number; // For spine width calculation

  // Reading info
  status: ReadingStatus;
  rating?: 1 | 2 | 3 | 4 | 5;
  dateStarted?: DateInfo;
  dateFinished?: DateInfo;

  // Metadata
  isbn?: string;
  publishYear?: number;
  genres: string[];

  // Links
  amazonUrl?: string;

  // Content
  summary?: string;
  hasReview?: boolean; // Whether MDX review exists
}

// Available genres for filtering
export const genres = [
  'Fiction',
  'Non-Fiction',
  'Philosophy',
  'History',
  'Science',
  'Biography',
  'Business',
  'Psychology',
  'Technology',
  'Economics',
  'Politics',
  'Self-Help',
  'Memoir',
  'Science Fiction',
] as const;

export type Genre = (typeof genres)[number];

// Status labels and colors
export const statusConfig = {
  read: {
    label: 'Read',
    color:
      'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  },
  reading: {
    label: 'Currently Reading',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  },
  'want-to-read': {
    label: 'Want to Read',
    color:
      'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
  },
} as const;

// Sample book collection
// Note: coverImage is optional - books will fall back to Open Library API covers using ISBN
export const books: Book[] = [
  {
    slug: 'sapiens',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    dominantColor: '#d4a574',
    textColor: '#1a1a1a',
    pageCount: 443,
    status: 'read',
    rating: 5,
    dateFinished: { date: '2023-06-15', isEstimate: false },
    isbn: '9780062316097',
    publishYear: 2011,
    genres: ['History', 'Non-Fiction', 'Philosophy'],
    amazonUrl: 'https://amazon.com/dp/0062316095',
    summary:
      'A brief history of humankind from the Stone Age to the twenty-first century.',
    hasReview: true,
  },
  {
    slug: 'thinking-fast-and-slow',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    dominantColor: '#1a1a2e',
    textColor: '#ffffff',
    pageCount: 499,
    status: 'read',
    rating: 5,
    dateFinished: { date: '2023-08-20', isEstimate: true },
    isbn: '9780374533557',
    publishYear: 2011,
    genres: ['Psychology', 'Non-Fiction', 'Economics'],
    amazonUrl: 'https://amazon.com/dp/0374533555',
    summary:
      'How our minds are tripped up by error and prejudice, and what we can do about it.',
    hasReview: true,
  },
  {
    slug: 'the-sovereign-individual',
    title: 'The Sovereign Individual',
    author: 'James Dale Davidson',
    dominantColor: '#2c3e50',
    textColor: '#ecf0f1',
    pageCount: 448,
    status: 'read',
    rating: 4,
    dateFinished: { date: '2024-01-10', isEstimate: false },
    isbn: '9780684832722',
    publishYear: 1997,
    genres: ['Economics', 'Politics', 'Technology'],
    amazonUrl: 'https://amazon.com/dp/0684832720',
    summary:
      'Prophetic insights into how digital technology will transform society and economics.',
    hasReview: true,
  },
  {
    slug: 'zero-to-one',
    title: 'Zero to One',
    author: 'Peter Thiel',
    dominantColor: '#3498db',
    textColor: '#ffffff',
    pageCount: 224,
    status: 'read',
    rating: 4,
    dateFinished: { date: '2024-03-05', isEstimate: false },
    isbn: '9780804139298',
    publishYear: 2014,
    genres: ['Business', 'Technology'],
    amazonUrl: 'https://amazon.com/dp/0804139296',
    summary: 'Notes on startups, or how to build the future.',
  },
  {
    slug: 'meditations',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    dominantColor: '#8e44ad',
    textColor: '#ffffff',
    pageCount: 256,
    status: 'read',
    rating: 5,
    dateFinished: { date: '2022-12-01', isEstimate: true },
    isbn: '9780140449334',
    publishYear: 180,
    genres: ['Philosophy', 'Non-Fiction'],
    amazonUrl: 'https://amazon.com/dp/0140449337',
    summary:
      'Private reflections of the Roman Emperor on Stoic philosophy and self-improvement.',
  },
  {
    slug: 'deep-work',
    title: 'Deep Work',
    author: 'Cal Newport',
    dominantColor: '#0f4c75',
    textColor: '#ffffff',
    pageCount: 304,
    status: 'reading',
    rating: 4,
    dateStarted: { date: '2025-01-01', isEstimate: false },
    isbn: '9781455586691',
    publishYear: 2016,
    genres: ['Self-Help', 'Business', 'Psychology'],
    amazonUrl: 'https://amazon.com/dp/1455586692',
    summary: 'Rules for focused success in a distracted world.',
  },
  {
    slug: 'the-almanack-of-naval-ravikant',
    title: 'The Almanack of Naval Ravikant',
    author: 'Eric Jorgenson',
    dominantColor: '#f39c12',
    textColor: '#1a1a1a',
    pageCount: 244,
    status: 'read',
    rating: 5,
    dateFinished: { date: '2024-06-20', isEstimate: false },
    isbn: '9781544514215',
    publishYear: 2020,
    genres: ['Self-Help', 'Philosophy', 'Business'],
    amazonUrl: 'https://amazon.com/dp/1544514212',
    summary: 'A guide to wealth and happiness from the legendary investor.',
    hasReview: true,
  },
  {
    slug: 'dune',
    title: 'Dune',
    author: 'Frank Herbert',
    dominantColor: '#c0392b',
    textColor: '#ffffff',
    pageCount: 688,
    status: 'read',
    rating: 5,
    dateFinished: { date: '2024-09-15', isEstimate: false },
    isbn: '9780441172719',
    publishYear: 1965,
    genres: ['Science Fiction', 'Fiction'],
    amazonUrl: 'https://amazon.com/dp/0441172717',
    summary:
      'The epic tale of politics, religion, and ecology on the desert planet Arrakis.',
  },
  {
    slug: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    dominantColor: '#27ae60',
    textColor: '#ffffff',
    pageCount: 320,
    status: 'want-to-read',
    isbn: '9780735211292',
    publishYear: 2018,
    genres: ['Self-Help', 'Psychology'],
    amazonUrl: 'https://amazon.com/dp/0735211299',
    summary:
      'Tiny changes, remarkable results. An easy way to build good habits.',
  },
  {
    slug: 'the-hard-thing-about-hard-things',
    title: 'The Hard Thing About Hard Things',
    author: 'Ben Horowitz',
    dominantColor: '#34495e',
    textColor: '#ffffff',
    pageCount: 304,
    status: 'want-to-read',
    isbn: '9780062273208',
    publishYear: 2014,
    genres: ['Business', 'Memoir'],
    amazonUrl: 'https://amazon.com/dp/0062273205',
    summary: 'Building a business when there are no easy answers.',
  },
  {
    slug: 'man-search-for-meaning',
    title: "Man's Search for Meaning",
    author: 'Viktor E. Frankl',
    dominantColor: '#2c3e50',
    textColor: '#ecf0f1',
    pageCount: 184,
    status: 'read',
    rating: 5,
    dateFinished: { date: '2023-02-14', isEstimate: false },
    isbn: '9780807014295',
    publishYear: 1946,
    genres: ['Psychology', 'Philosophy', 'Memoir'],
    amazonUrl: 'https://amazon.com/dp/0807014273',
    summary:
      'A psychiatrist who survived the Holocaust shares insights on finding purpose in suffering.',
    hasReview: true,
  },
  {
    slug: 'the-psychology-of-money',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    dominantColor: '#16a085',
    textColor: '#ffffff',
    pageCount: 256,
    status: 'read',
    rating: 4,
    dateFinished: { date: '2024-04-10', isEstimate: false },
    isbn: '9780857197689',
    publishYear: 2020,
    genres: ['Business', 'Psychology', 'Economics'],
    amazonUrl: 'https://amazon.com/dp/0857197681',
    summary: 'Timeless lessons on wealth, greed, and happiness.',
  },
];

// Utility functions
export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

export function getBooksByStatus(status: ReadingStatus): Book[] {
  return books.filter((book) => book.status === status);
}

export function getUniqueYears(): number[] {
  const years = books
    .filter((book) => book.dateFinished)
    .map((book) => new Date(book.dateFinished!.date).getFullYear());
  return Array.from(new Set(years)).sort((a, b) => b - a);
}

export function calculateSpineWidth(pageCount: number): number {
  // Normalize: 100 pages = 24px, 700+ pages = 72px
  return Math.max(24, Math.min(72, pageCount / 10 + 14));
}
