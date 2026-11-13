import { Helmet } from "react-helmet-async";
import { booksJsonLd } from "@/data/booksJsonLd";

export function BooksJsonLd() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(booksJsonLd())}</script>
    </Helmet>
  );
}
