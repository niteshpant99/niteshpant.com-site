Architecture Overview

app/library/
  ├── page.tsx              # Main page with filters & bookshelf
  ├── layout.tsx            # SEO metadata
  ├── library-data.ts       # Book data + TypeScript types
  ├── library.ts            # MDX content loader
  ├── [slug]/page.tsx       # Individual book detail pages
  └── content/*.mdx         # Book reviews (optional)

components/library/
  ├── bookshelf.tsx         # Shelf/Stack view container
  ├── book-spine.tsx        # Individual spine with animations
  └── book-cover-image.tsx  # Cover with API fallback

---
Data Flow

1. Book Data (library-data.ts)
All book metadata is stored as a TypeScript array - no database needed:

export const books: Book[] = [
    {
      slug: 'sapiens',
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      dominantColor: '#d4a574',  // Spine background color
      textColor: '#1a1a1a',      // Spine text color
      pageCount: 443,            // Determines spine width
      status: 'read',
      rating: 5,
      isbn: '9780062316097',     // Used for cover API
      // ...
    },
  ];

2. Cover Images - Open Library API (FREE, NO API KEY NEEDED)

This is the key part - covers come from the Open Library Covers API:

https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg

  - No API key required - it's completely free and public
  - No env variables needed
  - Works by ISBN - each book has an ISBN in the data
  - Falls back to an emoji placeholder if the cover doesn't exist

The book-cover-image.tsx component handles this:
  // If no local cover, use Open Library API
  const [imgSrc, setImgSrc] = useState<string>(
    book.coverImage || `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`
  );

3. Spine Width Calculation

The spine width is calculated from page count to make books look realistic:
  // 100 pages = ~24px, 700 pages = ~72px
  const spineWidth = Math.max(24, Math.min(72, pageCount / 10 + 14));

4. Scroll Animation (Framer Motion)

Each spine has a subtle tilt animation as you scroll:
  const { scrollYProgress } = useScroll({ target: ref });
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-3, 0, 3]);

This uses motion values (not React state) so it's smooth 60fps without re-renders.

5. MDX Reviews (Optional)

If you want to add a detailed review for a book:
    1. Create app/library/content/{slug}.mdx
    2. Set hasReview: true in the book data
    3. The review renders on the book's detail page

---
What You DON'T Need

| Feature       | Requires API Key?         | Requires Database?   |
|---------------|---------------------------|----------------------|
| Book covers   | No (Open Library is free) | No                   |
| Book metadata | No                        | No (TypeScript file) |
| Reviews       | No                        | No (MDX files)       |
| Animations    | No                        | No                   |

---

To Add Your Own Books

Edit app/library/library-data.ts:

  {
    slug: 'your-book-slug',           // URL-friendly name
    title: 'Your Book Title',
    author: 'Author Name',
    dominantColor: '#hexcolor',       // Pick a color that matches the cover
    textColor: '#ffffff',             // White or dark for contrast
    pageCount: 300,                   // Affects spine width
    status: 'read',                   // 'read' | 'reading' | 'want-to-read'
    rating: 4,                        // 1-5 stars (optional)
    isbn: '9781234567890',            // For cover image lookup
    genres: ['Fiction', 'Science'],
    amazonUrl: 'https://...',         // Optional
    hasReview: false,                 // Set true if you add an MDX file
  }

---
Summary

  - Zero external dependencies for the core feature
  - Open Library API provides free cover images using ISBN (no key needed)
  - Everything is static - builds to plain HTML/JS at deploy time
  - TypeScript-first - full type safety for book data
  - Framer Motion for smooth animations (already in your project)
  