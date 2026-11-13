import { AMAZON_BOOKS } from "./myBooks.ts";

const BOOK_FORMAT: Record<string, string> = {
  Paperback: "https://schema.org/Paperback",
  Hardcover: "https://schema.org/Hardcover",
};

/** Schema.org graph for the three books Zain wrote. Prices come from myBooks. */
export function booksJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": AMAZON_BOOKS.map((book) => ({
      "@type": "Book",
      name: book.title,
      description: book.blurb,
      author: { "@type": "Person", name: "Zain Adtani", url: "https://zainadtani.com" },
      bookFormat: BOOK_FORMAT[book.format] ?? "https://schema.org/Paperback",
      url: `https://www.amazon.com/dp/${book.asin}`,
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: book.price.replace(/[^0-9.]/g, ""),
        url: `https://www.amazon.com/dp/${book.asin}`,
        availability: "https://schema.org/InStock",
      },
    })),
  };
}
