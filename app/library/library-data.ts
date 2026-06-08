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

// Status labels + a 6px indicator dot. Dartmouth green is the only accent:
// reading = filled green, read = hollow green ring, want-to-read = neutral.
export const statusConfig = {
  read: {
    label: 'Read',
    dot: 'ring-1 ring-inset ring-[#00693e] dark:ring-[#a5d75f]',
  },
  reading: {
    label: 'Currently Reading',
    dot: 'bg-[#00693e] dark:bg-[#a5d75f]',
  },
  'want-to-read': {
    label: 'Want to Read',
    dot: 'bg-neutral-400 dark:bg-neutral-600',
  },
} as const;

// Leather library palette — one closed, low-chroma set of aged book bindings,
// all stamped in a single gold-foil cream (retires the old pure-white text).
// forest/evergreen are low-chroma cousins of Dartmouth green so the shelf
// rhymes with the brand accent; oxblood/cognac/espresso are aged calf leather.
// Foil-on-leather contrast verified >= 6.5:1 (AA/AAA) for every pairing.
const FOIL = '#ECDFB0'; // matte gold-foil lettering

const colors = {
  oxblood: { bg: '#5C2A2E', text: FOIL }, // aged red literary leather
  forest: { bg: '#1F3A2E', text: FOIL }, // deep Dartmouth-green cousin
  evergreen: { bg: '#2C4438', text: FOIL }, // second green tone
  cognac: { bg: '#6B3F2A', text: FOIL }, // rich tan leather
  navy: { bg: '#23364E', text: FOIL }, // desaturated collegiate blue
  espresso: { bg: '#3A2A22', text: FOIL }, // deep coffee brown
  sage: { bg: '#454E3B', text: FOIL }, // muted olive cloth
};

const genreColors: Record<string, { bg: string; text: string }> = {
  // Forest - deep thought, timeless
  Philosophy: colors.forest,
  Psychology: colors.forest,
  Classic: colors.forest,

  // Evergreen - stories that endure
  History: colors.evergreen,
  Biography: colors.evergreen,
  Memoir: colors.evergreen,

  // Oxblood - literary fiction
  Fiction: colors.oxblood,

  // Espresso - speculative depth
  'Science Fiction': colors.espresso,

  // Sage - growth, craft, ideas (absorbs the former sienna genres)
  'Self-Help': colors.sage,
  Design: colors.sage,
  'Non-Fiction': colors.sage,
  Communication: colors.sage,
  Politics: colors.sage,

  // Navy - digital, innovation
  Technology: colors.navy,
  Science: colors.navy,
  Startup: colors.navy,

  // Cognac - professional, trusted
  Business: colors.cognac,
  Economics: colors.cognac,
  Investing: colors.cognac,
  Leadership: colors.cognac,
};

const defaultColor = colors.cognac;

// Helper to get color based on book's primary genre
const getGenreColor = (genres: string[]) => {
  for (const genre of genres) {
    if (genreColors[genre]) {
      return genreColors[genre];
    }
  }
  return defaultColor;
};

// Book data without colors (colors computed from genres)
type BookData = Omit<Book, 'dominantColor' | 'textColor'>;

const booksData: BookData[] = [
  // ==================== READ ====================
  {
    slug: 'good-to-great',
    title: 'Good to Great',
    author: 'Jim Collins',
    pageCount: 320,
    status: 'read',
    isbn: '9780066620992',
    dateFinished: { date: '2025-01-01', isEstimate: true },
    genres: ['Business', 'Leadership'],
    summary: 'Read in 2025',
    hasReview: true,
  },
  {
    slug: 'mother',
    title: 'Mother',
    author: 'Maxim Gorky',
    pageCount: 336,
    status: 'read',
    isbn: '9788179920220',
    genres: ['Fiction', 'Classic'],
    summary: 'Russian author',
    hasReview: true,
  },
  {
    slug: 'sophies-world',
    title: "Sophie's World",
    author: 'Jostein Gaarder',
    pageCount: 518,
    status: 'read',
    isbn: '9780374530716',
    genres: ['Philosophy', 'Fiction'],
    summary: 'Philosophy book',
    hasReview: true,
  },
  {
    slug: 'mastery',
    title: 'Mastery',
    author: 'Robert Greene',
    pageCount: 352,
    status: 'read',
    isbn: '9780670024964',
    genres: ['Self-Help', 'Psychology'],
    summary: 'Had an influence',
    hasReview: true,
  },
  {
    slug: 'the-technological-republic',
    title: 'The Technological Republic',
    author: 'Alex Karp',
    pageCount: 256,
    status: 'read',
    isbn: '9780593798690',
    genres: ['Technology', 'Politics'],
    summary: 'Palantir CEO',
    hasReview: true,
  },
  {
    slug: 'the-lean-startup',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    pageCount: 336,
    status: 'read',
    isbn: '9780307887894',
    genres: ['Business', 'Startup'],
    hasReview: true,
  },
  {
    slug: 'sapiens',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
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
    pageCount: 400,
    status: 'read',
    isbn: '9781098166304',
    genres: ['Technology', 'Non-Fiction'],
    hasReview: true,
  },
  {
    slug: 'how-to-invest',
    title: 'How to Invest',
    author: 'David Rubenstein',
    pageCount: 320,
    status: 'read',
    isbn: '9781982190309',
    genres: ['Business', 'Investing'],
    hasReview: true,
  },
  {
    slug: 'the-pyramid-principle',
    title: 'The Pyramid Principle',
    author: 'Barbara Minto',
    pageCount: 272,
    status: 'read',
    isbn: '9781292372266',
    genres: ['Business', 'Communication'],
    summary: 'Classic consulting book',
    hasReview: true,
  },
  {
    slug: 'the-prince',
    title: 'The Prince',
    author: 'Niccolò Machiavelli',
    pageCount: 140,
    status: 'read',
    isbn: '9780140449150',
    genres: ['Philosophy', 'Politics', 'Classic'],
    hasReview: true,
  },
  {
    slug: 'the-road',
    title: 'The Road',
    author: 'Cormac McCarthy',
    pageCount: 287,
    status: 'read',
    isbn: '9780307387899',
    genres: ['Fiction', 'Classic'],
    hasReview: true,
  },
  {
    slug: 'poor-economics',
    title: 'Poor Economics',
    author: 'Abhijit Banerjee & Esther Duflo',
    pageCount: 320,
    status: 'read',
    isbn: '9781610390934',
    genres: ['Economics', 'Non-Fiction'],
    hasReview: true,
  },
  {
    slug: 'swipe-to-unlock',
    title: 'Swipe to Unlock',
    author: 'Parth Detroja, Aditya Agashe & Neel Mehta',
    pageCount: 228,
    status: 'read',
    isbn: '9781976182198',
    genres: ['Technology', 'Business'],
    hasReview: true,
  },
  {
    slug: 'zero-to-one',
    title: 'Zero to One',
    author: 'Peter Thiel',
    pageCount: 224,
    status: 'read',
    isbn: '9780804139298',
    dateFinished: { date: '2025-01-01', isEstimate: true },
    genres: ['Business', 'Startup'],
    summary: 'Read in 2025',
    hasReview: true,
  },
  {
    slug: 'to-sell-is-human',
    title: 'To Sell Is Human',
    author: 'Daniel H. Pink',
    pageCount: 272,
    status: 'read',
    isbn: '9781594631900',
    dateFinished: { date: '2025-01-01', isEstimate: true },
    genres: ['Business', 'Psychology'],
    summary: 'Read in 2025',
    hasReview: true,
  },
  {
    slug: 'harry-potter-series',
    title: 'Harry Potter (series)',
    author: 'J.K. Rowling',
    pageCount: 4100,
    status: 'read',
    isbn: '9780545162074',
    genres: ['Fiction'],
    hasReview: true,
  },
  {
    slug: 'the-adventures-of-tom-sawyer',
    title: 'The Adventures of Tom Sawyer',
    author: 'Mark Twain',
    pageCount: 274,
    status: 'read',
    isbn: '9780486400778',
    genres: ['Fiction', 'Classic'],
    hasReview: true,
  },
  {
    slug: 'how-to-win-friends-and-influence-people',
    title: 'How to Win Friends and Influence People',
    author: 'Dale Carnegie',
    pageCount: 288,
    status: 'read',
    isbn: '9780671027032',
    genres: ['Self-Help', 'Communication'],
    summary: 'Read at age 16',
    hasReview: true,
  },
  {
    slug: 'the-7-habits-of-highly-effective-teenagers',
    title: 'The 7 Habits of Highly Effective Teenagers',
    author: 'Sean Covey',
    pageCount: 288,
    status: 'read',
    isbn: '9781476764665',
    genres: ['Self-Help'],
    summary: 'Read at age 15',
    hasReview: true,
  },

  // ==================== READING ====================
  {
    slug: 'the-design-of-everyday-things',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    pageCount: 368,
    status: 'reading',
    isbn: '9780465050659',
    genres: ['Design', 'Psychology'],
    hasReview: true,
  },
  {
    slug: 'flow',
    title: 'Flow',
    author: 'Mihaly Csikszentmihalyi',
    pageCount: 336,
    status: 'reading',
    isbn: '9780061339202',
    genres: ['Psychology', 'Self-Help'],
    hasReview: true,
  },
  {
    slug: 'thinking-fast-and-slow',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
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
    pageCount: 216,
    status: 'reading',
    isbn: '9780321965516',
    genres: ['Design', 'Technology'],
    hasReview: true,
  },
  {
    slug: 'the-innovators-dilemma',
    title: "The Innovator's Dilemma",
    author: 'Clayton Christensen',
    pageCount: 286,
    status: 'reading',
    isbn: '9780062060242',
    genres: ['Business', 'Technology'],
    summary: 'Classic',
    hasReview: true,
  },
  {
    slug: 'blue-ocean-strategy',
    title: 'Blue Ocean Strategy',
    author: 'W. Chan Kim & Renée Mauborgne',
    pageCount: 320,
    status: 'reading',
    isbn: '9781625274496',
    genres: ['Business'],
    hasReview: true,
  },
  {
    slug: 'jobs-to-be-done',
    title: 'Jobs to Be Done',
    author: 'Stephen Wunker',
    pageCount: 240,
    status: 'reading',
    isbn: '9780814438039',
    genres: ['Business', 'Design'],
    hasReview: true,
  },
  {
    slug: 'the-startup-of-you',
    title: 'The Startup of You',
    author: 'Reid Hoffman',
    pageCount: 272,
    status: 'reading',
    isbn: '9780307888907',
    genres: ['Business', 'Self-Help'],
    hasReview: true,
  },
  {
    slug: 'venture-deals',
    title: 'Venture Deals',
    author: 'Brad Feld & Jason Mendelson',
    pageCount: 304,
    status: 'reading',
    isbn: '9781119594826',
    genres: ['Business', 'Startup', 'Investing'],
    hasReview: true,
  },
  {
    slug: 'orientalism',
    title: 'Orientalism',
    author: 'Edward Said',
    pageCount: 368,
    status: 'reading',
    isbn: '9780394740676',
    genres: ['History', 'Politics', 'Philosophy'],
    summary: 'Half read',
    hasReview: true,
  },

  // ==================== WANT TO READ ====================
  {
    slug: 'never-split-the-difference',
    title: 'Never Split the Difference',
    author: 'Chris Voss',
    pageCount: 288,
    status: 'want-to-read',
    isbn: '9780062407801',
    genres: ['Business', 'Psychology', 'Communication'],
    hasReview: true,
  },
  {
    slug: 'influence-the-psychology-of-persuasion',
    title: 'Influence: The Psychology of Persuasion',
    author: 'Robert Cialdini',
    pageCount: 336,
    status: 'reading',
    isbn: '9780062937650',
    genres: ['Psychology', 'Business'],
    hasReview: true,
  },
  {
    slug: 'the-art-of-seduction',
    title: 'The Art of Seduction',
    author: 'Robert Greene',
    pageCount: 466,
    status: 'want-to-read',
    isbn: '9780142001196',
    genres: ['Psychology', 'Self-Help'],
    hasReview: true,
  },
  {
    slug: 'models-attract-women-through-honesty',
    title: 'Models: Attract Women Through Honesty',
    author: 'Mark Manson',
    pageCount: 260,
    status: 'want-to-read',
    isbn: '9781463750350',
    genres: ['Self-Help'],
    hasReview: true,
  },
  {
    slug: 'the-charisma-myth',
    title: 'The Charisma Myth',
    author: 'Olivia Fox Cabane',
    pageCount: 288,
    status: 'want-to-read',
    isbn: '9781591845942',
    genres: ['Self-Help', 'Psychology'],
    hasReview: true,
  },
  {
    slug: 'what-every-body-is-saying',
    title: 'What Every BODY is Saying',
    author: 'Joe Navarro',
    pageCount: 272,
    status: 'want-to-read',
    isbn: '9780061438295',
    genres: ['Psychology', 'Communication'],
    hasReview: true,
  },
  {
    slug: 'impro-improvisation-and-the-theatre',
    title: 'Impro: Improvisation and the Theatre',
    author: 'Keith Johnstone',
    pageCount: 208,
    status: 'want-to-read',
    isbn: '9780878301171',
    genres: ['Non-Fiction', 'Communication'],
    hasReview: true,
  },
  {
    slug: 'the-48-laws-of-power',
    title: 'The 48 Laws of Power',
    author: 'Robert Greene',
    pageCount: 480,
    status: 'want-to-read',
    isbn: '9780140280197',
    genres: ['Psychology', 'Self-Help', 'History'],
    hasReview: true,
  },
  {
    slug: 'the-art-of-witty-banter',
    title: 'The Art of Witty Banter',
    author: 'Patrick King',
    pageCount: 186,
    status: 'want-to-read',
    isbn: '9781540552631',
    genres: ['Self-Help', 'Communication'],
    hasReview: true,
  },
  {
    slug: 'the-laws-of-human-nature',
    title: 'The Laws of Human Nature',
    author: 'Robert Greene',
    pageCount: 624,
    status: 'want-to-read',
    isbn: '9780525428145',
    genres: ['Psychology', 'Self-Help'],
    hasReview: true,
  },
  {
    slug: 'made-to-stick',
    title: 'Made to Stick',
    author: 'Chip Heath & Dan Heath',
    pageCount: 291,
    status: 'want-to-read',
    isbn: '9781400064281',
    genres: ['Business', 'Communication'],
    hasReview: true,
  },
  {
    slug: 'on-writing-well',
    title: 'On Writing Well',
    author: 'William Zinsser',
    pageCount: 336,
    status: 'want-to-read',
    isbn: '9780060891541',
    genres: ['Non-Fiction', 'Communication'],
    hasReview: true,
  },
  {
    slug: 'surely-youre-joking-mr-feynman',
    title: "Surely You're Joking, Mr. Feynman!",
    author: 'Richard P. Feynman',
    pageCount: 391,
    status: 'want-to-read',
    isbn: '9780393316049',
    genres: ['Biography', 'Science'],
    hasReview: true,
  },
  {
    slug: 'meditations',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    pageCount: 256,
    status: 'want-to-read',
    isbn: '9780140449334',
    genres: ['Philosophy', 'Classic'],
    hasReview: true,
  },
  {
    slug: '21-lessons-for-the-21st-century',
    title: '21 Lessons for the 21st Century',
    author: 'Yuval Noah Harari',
    pageCount: 372,
    status: 'want-to-read',
    isbn: '9780525512172',
    genres: ['Non-Fiction', 'Philosophy', 'History'],
    hasReview: true,
  },
  {
    slug: 'the-4-hour-workweek',
    title: 'The 4-Hour Workweek',
    author: 'Tim Ferriss',
    pageCount: 416,
    status: 'want-to-read',
    isbn: '9780307465351',
    genres: ['Business', 'Self-Help'],
    hasReview: true,
  },
  {
    slug: '1984',
    title: '1984',
    author: 'George Orwell',
    pageCount: 328,
    status: 'want-to-read',
    isbn: '9780451524935',
    genres: ['Fiction', 'Classic', 'Science Fiction'],
    hasReview: true,
  },
  {
    slug: 'as-a-man-thinketh',
    title: 'As a Man Thinketh',
    author: 'James Allen',
    pageCount: 68,
    status: 'want-to-read',
    isbn: '9781585426386',
    genres: ['Self-Help', 'Philosophy', 'Classic'],
    hasReview: true,
  },
  {
    slug: 'one-flew-over-the-cuckoos-nest',
    title: "One Flew Over the Cuckoo's Nest",
    author: 'Ken Kesey',
    pageCount: 325,
    status: 'want-to-read',
    isbn: '9780451163967',
    genres: ['Fiction', 'Classic'],
    hasReview: true,
  },
  {
    slug: 'originals',
    title: 'Originals',
    author: 'Adam Grant',
    pageCount: 336,
    status: 'want-to-read',
    isbn: '9780525429562',
    genres: ['Business', 'Psychology'],
    hasReview: true,
  },
  {
    slug: 'the-almanack-of-naval-ravikant',
    title: 'The Almanack of Naval Ravikant',
    author: 'Eric Jorgenson',
    pageCount: 244,
    status: 'want-to-read',
    isbn: '9781544514215',
    genres: ['Self-Help', 'Philosophy', 'Business'],
    hasReview: true,
  },
  {
    slug: 'the-hard-thing-about-hard-things',
    title: 'The Hard Thing About Hard Things',
    author: 'Ben Horowitz',
    pageCount: 304,
    status: 'want-to-read',
    isbn: '9780062273208',
    genres: ['Business', 'Startup', 'Memoir'],
    hasReview: true,
  },
  {
    slug: 'the-7-habits-of-highly-effective-people',
    title: 'The 7 Habits of Highly Effective People',
    author: 'Stephen R. Covey',
    pageCount: 432,
    status: 'want-to-read',
    isbn: '9781982137137',
    genres: ['Self-Help', 'Leadership'],
    hasReview: true,
  },
  {
    slug: 'built-to-last',
    title: 'Built to Last',
    author: 'Jim Collins & Jerry Porras',
    pageCount: 368,
    status: 'reading',
    isbn: '9780060516406',
    genres: ['Business', 'Leadership'],
    hasReview: true,
  },
  {
    slug: 'extreme-ownership',
    title: 'Extreme Ownership',
    author: 'Jocko Willink & Leif Babin',
    pageCount: 320,
    status: 'want-to-read',
    isbn: '9781250183866',
    genres: ['Leadership', 'Business'],
    hasReview: true,
  },
  {
    slug: 'steve-jobs',
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    pageCount: 656,
    status: 'want-to-read',
    isbn: '9781451648539',
    genres: ['Biography', 'Business'],
    hasReview: true,
  },
  {
    slug: 'outliers',
    title: 'Outliers',
    author: 'Malcolm Gladwell',
    pageCount: 336,
    status: 'want-to-read',
    isbn: '9780316017930',
    genres: ['Psychology', 'Non-Fiction'],
    hasReview: true,
  },
  {
    slug: 'hooked',
    title: 'Hooked',
    author: 'Nir Eyal',
    pageCount: 256,
    status: 'want-to-read',
    isbn: '9781591847786',
    genres: ['Business', 'Design', 'Psychology'],
    hasReview: true,
  },
  {
    slug: 'the-psychology-of-money',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    pageCount: 256,
    status: 'want-to-read',
    isbn: '9780857197689',
    genres: ['Business', 'Investing', 'Psychology'],
    hasReview: true,
  },
  {
    slug: 'founders-at-work',
    title: 'Founders at Work',
    author: 'Jessica Livingston',
    pageCount: 512,
    status: 'want-to-read',
    isbn: '9781430210788',
    genres: ['Business', 'Startup'],
    hasReview: true,
  },
  {
    slug: 'the-intelligent-investor',
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    pageCount: 640,
    status: 'want-to-read',
    isbn: '9780060555665',
    genres: ['Business', 'Investing'],
    hasReview: true,
  },
  {
    slug: 'project-hail-mary',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    pageCount: 496,
    status: 'want-to-read',
    isbn: '9780593135204',
    genres: ['Science Fiction', 'Fiction'],
    hasReview: true,
  },
];

// Map book data to full Book objects with genre-based colors
export const books: Book[] = booksData.map((book) => {
  const colors = getGenreColor(book.genres);
  return {
    ...book,
    dominantColor: colors.bg,
    textColor: colors.text,
  };
});

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

// Uniform spine height so wrapped rows form clean, level shelves.
export const SPINE_HEIGHT = 300;

export function calculateSpineWidth(pageCount: number): number {
  // Log scale so a 4100-page volume reads clearly thicker than a 200-page one
  // (the old linear scale clamped most books to a near-uniform width).
  const min = 28;
  const max = 66;
  const w = 26 + Math.log2(Math.max(50, pageCount) / 50) * 9;
  return Math.round(Math.max(min, Math.min(max, w)));
}
