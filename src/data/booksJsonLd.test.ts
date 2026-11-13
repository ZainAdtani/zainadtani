import { test } from "node:test";
import assert from "node:assert/strict";
import { AMAZON_BOOKS } from "./myBooks.ts";
import { booksJsonLd } from "./booksJsonLd.ts";

test("book structured data uses the shared titles and prices", () => {
  const graph = booksJsonLd()["@graph"] as { name: string; offers: { price: string } }[];
  assert.equal(graph.length, AMAZON_BOOKS.length);
  for (const book of AMAZON_BOOKS) {
    const node = graph.find((item) => item.name === book.title);
    assert.ok(node, book.title);
    assert.equal(node.offers.price, book.price.replace(/[^0-9.]/g, ""));
  }
});
