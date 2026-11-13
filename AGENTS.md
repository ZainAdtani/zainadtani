# Project rules
- Keep the AI checkup's report data and offer quantities in a dedicated data module with focused tests so business rules can be validated independently of presentation.
- Register standard pages inside AppLayout so the existing header, navigation, footer, and shared integrations remain consistent; keep the standalone KDP page outside it.- Zain's own books (titles, prices, Amazon IDs) live in src/data/myBooks.ts and are shared by the homepage and /books, so they never drift apart.
