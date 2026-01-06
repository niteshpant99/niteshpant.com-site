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
  'Classic',
  'Design',
  'Investing',
  'Leadership',
  'Startup',
  'Communication',
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

// Classic leather-bound color palette
const classicColors = [
  { bg: '#722F37', text: '#D4AF37' }, // Deep burgundy
  { bg: '#1B365D', text: '#C9B037' }, // Navy blue
  { bg: '#2D4A3E', text: '#D4AF37' }, // Forest green
  { bg: '#5C4033', text: '#FFFDD0' }, // Warm brown
  { bg: '#4A0E0E', text: '#D4AF37' }, // Dark mahogany
  { bg: '#36454F', text: '#F5F5DC' }, // Charcoal
  { bg: '#1D4E5F', text: '#C9B037' }, // Dark teal
  { bg: '#4A3043', text: '#D4AF37' }, // Deep plum
];

// Helper to get color by index
const getColor = (index: number) => classicColors[index % classicColors.length];

// Book collection with classic colors
export const books: Book[] = [
  // ==================== READ ====================
  {
    slug: 'good-to-great',
    title: 'Good to Great',
    author: 'Jim Collins',
    dominantColor: getColor(0).bg,
    textColor: getColor(0).text,
    pageCount: 320,
    status: 'read',
    isbn: '9780066620992',
    dateFinished: { date: '2025-01-01', isEstimate: true },
    genres: ['Business', 'Leadership'],
    summary: 'Read in 2025',
  },
  {
    slug: 'mother',
    title: 'Mother',
    author: 'Maxim Gorky',
    dominantColor: getColor(1).bg,
    textColor: getColor(1).text,
    pageCount: 336,
    status: 'read',
    isbn: '9788179920220',
    genres: ['Fiction', 'Classic'],
    summary: 'Russian author',
  },
  {
    slug: 'sophies-world',
    title: "Sophie's World",
    author: 'Jostein Gaarder',
    dominantColor: getColor(2).bg,
    textColor: getColor(2).text,
    pageCount: 518,
    status: 'read',
    isbn: '9780374530716',
    genres: ['Philosophy', 'Fiction'],
    summary: 'Philosophy book',
  },
  {
    slug: 'mastery',
    title: 'Mastery',
    author: 'Robert Greene',
    dominantColor: getColor(3).bg,
    textColor: getColor(3).text,
    pageCount: 352,
    status: 'read',
    isbn: '9780670024964',
    genres: ['Self-Help', 'Psychology'],
    summary: 'Had an influence',
  },
  {
    slug: 'the-technological-republic',
    title: 'The Technological Republic',
    author: 'Alex Karp',
    dominantColor: getColor(4).bg,
    textColor: getColor(4).text,
    pageCount: 256,
    status: 'read',
    isbn: '9780593798690',
    genres: ['Technology', 'Politics'],
    summary: 'Palantir CEO',
  },
  {
    slug: 'the-lean-startup',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    dominantColor: getColor(5).bg,
    textColor: getColor(5).text,
    pageCount: 336,
    status: 'read',
    isbn: '9780307887894',
    genres: ['Business', 'Startup'],
  },
  {
    slug: 'sapiens',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    dominantColor: getColor(6).bg,
    textColor: getColor(6).text,
    pageCount: 443,
    status: 'read',
    isbn: '9780062316097',
    genres: ['History', 'Non-Fiction', 'Philosophy'],
    summary: 'Classic',
    hasReview: true,
  },
  {
    slug: 'ai-engineering',
    title: 'AI Engineering',
    author: 'Chip Huyen',
    dominantColor: getColor(7).bg,
    textColor: getColor(7).text,
    pageCount: 400,
    status: 'read',
    isbn: '9781098166304',
    genres: ['Technology', 'Non-Fiction'],
  },
  {
    slug: 'how-to-invest',
    title: 'How to Invest',
    author: 'David Rubenstein',
    dominantColor: getColor(0).bg,
    textColor: getColor(0).text,
    pageCount: 320,
    status: 'read',
    isbn: '9781982190309',
    genres: ['Business', 'Investing'],
  },
  {
    slug: 'the-pyramid-principle',
    title: 'The Pyramid Principle',
    author: 'Barbara Minto',
    dominantColor: getColor(1).bg,
    textColor: getColor(1).text,
    pageCount: 272,
    status: 'read',
    isbn: '9781292372266',
    genres: ['Business', 'Communication'],
    summary: 'Classic consulting book',
  },
  {
    slug: 'the-prince',
    title: 'The Prince',
    author: 'Niccolò Machiavelli',
    dominantColor: getColor(2).bg,
    textColor: getColor(2).text,
    pageCount: 140,
    status: 'read',
    isbn: '9780140449150',
    genres: ['Philosophy', 'Politics', 'Classic'],
  },
  {
    slug: 'the-road',
    title: 'The Road',
    author: 'Cormac McCarthy',
    dominantColor: getColor(3).bg,
    textColor: getColor(3).text,
    pageCount: 287,
    status: 'read',
    isbn: '9780307387899',
    genres: ['Fiction', 'Classic'],
  },
  {
    slug: 'poor-economics',
    title: 'Poor Economics',
    author: 'Abhijit Banerjee & Esther Duflo',
    dominantColor: getColor(4).bg,
    textColor: getColor(4).text,
    pageCount: 320,
    status: 'read',
    isbn: '9781610390934',
    genres: ['Economics', 'Non-Fiction'],
  },
  {
    slug: 'swipe-to-unlock',
    title: 'Swipe to Unlock',
    author: 'Parth Detroja, Aditya Agashe & Neel Mehta',
    dominantColor: getColor(5).bg,
    textColor: getColor(5).text,
    pageCount: 228,
    status: 'read',
    isbn: '9781976182198',
    genres: ['Technology', 'Business'],
  },
  {
    slug: 'zero-to-one',
    title: 'Zero to One',
    author: 'Peter Thiel',
    dominantColor: getColor(6).bg,
    textColor: getColor(6).text,
    pageCount: 224,
    status: 'read',
    isbn: '9780804139298',
    dateFinished: { date: '2025-01-01', isEstimate: true },
    genres: ['Business', 'Startup'],
    summary: 'Read in 2025',
  },
  {
    slug: 'to-sell-is-human',
    title: 'To Sell Is Human',
    author: 'Daniel H. Pink',
    dominantColor: getColor(7).bg,
    textColor: getColor(7).text,
    pageCount: 272,
    status: 'read',
    isbn: '9781594631900',
    dateFinished: { date: '2025-01-01', isEstimate: true },
    genres: ['Business', 'Psychology'],
    summary: 'Read in 2025',
  },
  {
    slug: 'harry-potter-series',
    title: 'Harry Potter (series)',
    author: 'J.K. Rowling',
    dominantColor: getColor(0).bg,
    textColor: getColor(0).text,
    pageCount: 4100,
    status: 'read',
    isbn: '9780545162074',
    genres: ['Fiction'],
  },
  {
    slug: 'the-adventures-of-tom-sawyer',
    title: 'The Adventures of Tom Sawyer',
    author: 'Mark Twain',
    dominantColor: getColor(1).bg,
    textColor: getColor(1).text,
    pageCount: 274,
    status: 'read',
    isbn: '9780486400778',
    genres: ['Fiction', 'Classic'],
  },
  {
    slug: 'how-to-win-friends-and-influence-people',
    title: 'How to Win Friends and Influence People',
    author: 'Dale Carnegie',
    dominantColor: getColor(2).bg,
    textColor: getColor(2).text,
    pageCount: 288,
    status: 'read',
    isbn: '9780671027032',
    genres: ['Self-Help', 'Communication'],
    summary: 'Read at age 16',
  },
  {
    slug: 'the-7-habits-of-highly-effective-teenagers',
    title: 'The 7 Habits of Highly Effective Teenagers',
    author: 'Sean Covey',
    dominantColor: getColor(3).bg,
    textColor: getColor(3).text,
    pageCount: 288,
    status: 'read',
    isbn: '9781476764665',
    genres: ['Self-Help'],
    summary: 'Read at age 15',
  },

  // ==================== READING ====================
  {
    slug: 'the-design-of-everyday-things',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    dominantColor: getColor(4).bg,
    textColor: getColor(4).text,
    pageCount: 368,
    status: 'reading',
    isbn: '9780465050659',
    genres: ['Design', 'Psychology'],
  },
  {
    slug: 'flow',
    title: 'Flow',
    author: 'Mihaly Csikszentmihalyi',
    dominantColor: getColor(5).bg,
    textColor: getColor(5).text,
    pageCount: 336,
    status: 'reading',
    isbn: '9780061339202',
    genres: ['Psychology', 'Self-Help'],
  },
  {
    slug: 'thinking-fast-and-slow',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    dominantColor: getColor(6).bg,
    textColor: getColor(6).text,
    pageCount: 499,
    status: 'reading',
    isbn: '9780374533557',
    genres: ['Psychology', 'Non-Fiction', 'Economics'],
    hasReview: true,
  },
  {
    slug: 'dont-make-me-think-revisited',
    title: "Don't Make Me Think Revisited",
    author: 'Steve Krug',
    dominantColor: getColor(7).bg,
    textColor: getColor(7).text,
    pageCount: 216,
    status: 'reading',
    isbn: '9780321965516',
    genres: ['Design', 'Technology'],
  },
  {
    slug: 'the-innovators-dilemma',
    title: "The Innovator's Dilemma",
    author: 'Clayton Christensen',
    dominantColor: getColor(0).bg,
    textColor: getColor(0).text,
    pageCount: 286,
    status: 'reading',
    isbn: '9780062060242',
    genres: ['Business', 'Technology'],
    summary: 'Classic',
  },
  {
    slug: 'blue-ocean-strategy',
    title: 'Blue Ocean Strategy',
    author: 'W. Chan Kim & Renée Mauborgne',
    dominantColor: getColor(1).bg,
    textColor: getColor(1).text,
    pageCount: 320,
    status: 'reading',
    isbn: '9781625274496',
    genres: ['Business'],
  },
  {
    slug: 'jobs-to-be-done',
    title: 'Jobs to Be Done',
    author: 'Stephen Wunker',
    dominantColor: getColor(2).bg,
    textColor: getColor(2).text,
    pageCount: 240,
    status: 'reading',
    isbn: '9780814438039',
    genres: ['Business', 'Design'],
  },
  {
    slug: 'the-startup-of-you',
    title: 'The Startup of You',
    author: 'Reid Hoffman',
    dominantColor: getColor(3).bg,
    textColor: getColor(3).text,
    pageCount: 272,
    status: 'reading',
    isbn: '9780307888907',
    genres: ['Business', 'Self-Help'],
  },
  {
    slug: 'venture-deals',
    title: 'Venture Deals',
    author: 'Brad Feld & Jason Mendelson',
    dominantColor: getColor(4).bg,
    textColor: getColor(4).text,
    pageCount: 304,
    status: 'reading',
    isbn: '9781119594826',
    genres: ['Business', 'Startup', 'Investing'],
  },
  {
    slug: 'orientalism',
    title: 'Orientalism',
    author: 'Edward Said',
    dominantColor: getColor(5).bg,
    textColor: getColor(5).text,
    pageCount: 368,
    status: 'reading',
    isbn: '9780394740676',
    genres: ['History', 'Politics', 'Philosophy'],
    summary: 'Half read',
  },

  // ==================== WANT TO READ ====================
  {
    slug: 'never-split-the-difference',
    title: 'Never Split the Difference',
    author: 'Chris Voss',
    dominantColor: getColor(6).bg,
    textColor: getColor(6).text,
    pageCount: 288,
    status: 'want-to-read',
    isbn: '9780062407801',
    genres: ['Business', 'Psychology', 'Communication'],
  },
  {
    slug: 'influence-the-psychology-of-persuasion',
    title: 'Influence: The Psychology of Persuasion',
    author: 'Robert Cialdini',
    dominantColor: getColor(7).bg,
    textColor: getColor(7).text,
    pageCount: 336,
    status: 'want-to-read',
    isbn: '9780062937650',
    genres: ['Psychology', 'Business'],
  },
  {
    slug: 'the-art-of-seduction',
    title: 'The Art of Seduction',
    author: 'Robert Greene',
    dominantColor: getColor(0).bg,
    textColor: getColor(0).text,
    pageCount: 466,
    status: 'want-to-read',
    isbn: '9780142001196',
    genres: ['Psychology', 'Self-Help'],
  },
  {
    slug: 'models-attract-women-through-honesty',
    title: 'Models: Attract Women Through Honesty',
    author: 'Mark Manson',
    dominantColor: getColor(1).bg,
    textColor: getColor(1).text,
    pageCount: 260,
    status: 'want-to-read',
    isbn: '9781463750350',
    genres: ['Self-Help'],
  },
  {
    slug: 'the-charisma-myth',
    title: 'The Charisma Myth',
    author: 'Olivia Fox Cabane',
    dominantColor: getColor(2).bg,
    textColor: getColor(2).text,
    pageCount: 288,
    status: 'want-to-read',
    isbn: '9781591845942',
    genres: ['Self-Help', 'Psychology'],
  },
  {
    slug: 'what-every-body-is-saying',
    title: 'What Every BODY is Saying',
    author: 'Joe Navarro',
    dominantColor: getColor(3).bg,
    textColor: getColor(3).text,
    pageCount: 272,
    status: 'want-to-read',
    isbn: '9780061438295',
    genres: ['Psychology', 'Communication'],
  },
  {
    slug: 'impro-improvisation-and-the-theatre',
    title: 'Impro: Improvisation and the Theatre',
    author: 'Keith Johnstone',
    dominantColor: getColor(4).bg,
    textColor: getColor(4).text,
    pageCount: 208,
    status: 'want-to-read',
    isbn: '9780878301171',
    genres: ['Non-Fiction', 'Communication'],
  },
  {
    slug: 'the-48-laws-of-power',
    title: 'The 48 Laws of Power',
    author: 'Robert Greene',
    dominantColor: getColor(5).bg,
    textColor: getColor(5).text,
    pageCount: 480,
    status: 'want-to-read',
    isbn: '9780140280197',
    genres: ['Psychology', 'Self-Help', 'History'],
  },
  {
    slug: 'the-art-of-witty-banter',
    title: 'The Art of Witty Banter',
    author: 'Patrick King',
    dominantColor: getColor(6).bg,
    textColor: getColor(6).text,
    pageCount: 186,
    status: 'want-to-read',
    isbn: '9781540552631',
    genres: ['Self-Help', 'Communication'],
  },
  {
    slug: 'the-laws-of-human-nature',
    title: 'The Laws of Human Nature',
    author: 'Robert Greene',
    dominantColor: getColor(7).bg,
    textColor: getColor(7).text,
    pageCount: 624,
    status: 'want-to-read',
    isbn: '9780525428145',
    genres: ['Psychology', 'Self-Help'],
  },
  {
    slug: 'made-to-stick',
    title: 'Made to Stick',
    author: 'Chip Heath & Dan Heath',
    dominantColor: getColor(0).bg,
    textColor: getColor(0).text,
    pageCount: 291,
    status: 'want-to-read',
    isbn: '9781400064281',
    genres: ['Business', 'Communication'],
  },
  {
    slug: 'on-writing-well',
    title: 'On Writing Well',
    author: 'William Zinsser',
    dominantColor: getColor(1).bg,
    textColor: getColor(1).text,
    pageCount: 336,
    status: 'want-to-read',
    isbn: '9780060891541',
    genres: ['Non-Fiction', 'Communication'],
  },
  {
    slug: 'surely-youre-joking-mr-feynman',
    title: "Surely You're Joking, Mr. Feynman!",
    author: 'Richard P. Feynman',
    dominantColor: getColor(2).bg,
    textColor: getColor(2).text,
    pageCount: 391,
    status: 'want-to-read',
    isbn: '9780393316049',
    genres: ['Biography', 'Science'],
  },
  {
    slug: 'meditations',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    dominantColor: getColor(3).bg,
    textColor: getColor(3).text,
    pageCount: 256,
    status: 'want-to-read',
    isbn: '9780140449334',
    genres: ['Philosophy', 'Classic'],
  },
  {
    slug: '21-lessons-for-the-21st-century',
    title: '21 Lessons for the 21st Century',
    author: 'Yuval Noah Harari',
    dominantColor: getColor(4).bg,
    textColor: getColor(4).text,
    pageCount: 372,
    status: 'want-to-read',
    isbn: '9780525512172',
    genres: ['Non-Fiction', 'Philosophy', 'History'],
  },
  {
    slug: 'the-4-hour-workweek',
    title: 'The 4-Hour Workweek',
    author: 'Tim Ferriss',
    dominantColor: getColor(5).bg,
    textColor: getColor(5).text,
    pageCount: 416,
    status: 'want-to-read',
    isbn: '9780307465351',
    genres: ['Business', 'Self-Help'],
  },
  {
    slug: '1984',
    title: '1984',
    author: 'George Orwell',
    dominantColor: getColor(6).bg,
    textColor: getColor(6).text,
    pageCount: 328,
    status: 'want-to-read',
    isbn: '9780451524935',
    genres: ['Fiction', 'Classic', 'Science Fiction'],
  },
  {
    slug: 'as-a-man-thinketh',
    title: 'As a Man Thinketh',
    author: 'James Allen',
    dominantColor: getColor(7).bg,
    textColor: getColor(7).text,
    pageCount: 68,
    status: 'want-to-read',
    isbn: '9781585426386',
    genres: ['Self-Help', 'Philosophy', 'Classic'],
  },
  {
    slug: 'one-flew-over-the-cuckoos-nest',
    title: "One Flew Over the Cuckoo's Nest",
    author: 'Ken Kesey',
    dominantColor: getColor(0).bg,
    textColor: getColor(0).text,
    pageCount: 325,
    status: 'want-to-read',
    isbn: '9780451163967',
    genres: ['Fiction', 'Classic'],
  },
  {
    slug: 'originals',
    title: 'Originals',
    author: 'Adam Grant',
    dominantColor: getColor(1).bg,
    textColor: getColor(1).text,
    pageCount: 336,
    status: 'want-to-read',
    isbn: '9780525429562',
    genres: ['Business', 'Psychology'],
  },
  {
    slug: 'the-almanack-of-naval-ravikant',
    title: 'The Almanack of Naval Ravikant',
    author: 'Eric Jorgenson',
    dominantColor: getColor(2).bg,
    textColor: getColor(2).text,
    pageCount: 244,
    status: 'want-to-read',
    isbn: '9781544514215',
    genres: ['Self-Help', 'Philosophy', 'Business'],
  },
  {
    slug: 'the-hard-thing-about-hard-things',
    title: 'The Hard Thing About Hard Things',
    author: 'Ben Horowitz',
    dominantColor: getColor(3).bg,
    textColor: getColor(3).text,
    pageCount: 304,
    status: 'want-to-read',
    isbn: '9780062273208',
    genres: ['Business', 'Startup', 'Memoir'],
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

export function calculateSpineHeight(pageCount: number): number {
  // Variable height based on page count for visual variety
  // Short books: ~240px, Average books: ~300px, Long books: ~380px
  // This creates the varied shelf look like a real bookcase
  const baseHeight = 240;
  const heightVariation = Math.min(140, pageCount / 5);
  // Add slight random variation based on page count to avoid uniformity
  const jitter = (pageCount % 17) * 2 - 17; // -17 to +17 px variation
  return Math.round(baseHeight + heightVariation + jitter);
}
