

## Security Fixes Plan

### Findings Summary

1. **VITE_SECRET_PIN** — exists in `.env` and `.env.example` but is never referenced in any TypeScript/TSX code. The vault pages were already deleted. Only the env files need cleanup.

2. **Leads table** — has a permissive INSERT policy (`WITH CHECK (true)`) but no SELECT policy. Need to add a deny-all SELECT policy.

3. **ea-study-chat** — edge function for a deleted page. Delete entirely.

4. **nba-standings** — edge function for a deleted Sports page. Also delete.

5. **generate-quote** — edge function that is **never called from the frontend** (the homepage uses a local array). Delete this too since it's unused and just an abuse vector.

6. **Archive.tsx** — references 3 dead routes (`/enrolled-agent`, `/personal-learning-vault`, `/quickbooks`) that were deleted in Phase 1. Not a security issue but worth noting — will not touch per guardrails.

7. **Overly permissive RLS** — only the leads INSERT `WITH CHECK (true)` policy exists. This is intentional for public form submissions. No other tables have permissive policies. No action needed.

---

### Changes

**Database migration (1 SQL statement):**
- Add a deny-all SELECT policy on the `leads` table:
  ```sql
  CREATE POLICY "No public reads" ON public.leads FOR SELECT USING (false);
  ```

**Delete 3 edge function directories:**
- `supabase/functions/ea-study-chat/` (deleted page)
- `supabase/functions/nba-standings/` (deleted page)
- `supabase/functions/generate-quote/` (never invoked from frontend)

**Edit `supabase/config.toml`:**
- Remove `[functions.generate-quote]` and `[functions.ea-study-chat]` blocks
- Keep only `project_id`

**Edit `.env.example`:**
- Remove the `VITE_SECRET_PIN=""` line

**Note:** `.env` is auto-managed and cannot be edited directly, but the `VITE_SECRET_PIN` variable is harmless since no code references it. The `.env.example` cleanup removes the suggestion to set it.

---

### What stays untouched
- All page files, UI components, layouts, routes, navigation
- The leads INSERT policy (intentionally permissive for public form submissions)
- All data files and shared components

### Technical detail
- The only RLS "warning" is the leads INSERT `WITH CHECK (true)` — this is the expected pattern for a public contact form and does not need changing
- No UPDATE or DELETE policies exist on any table, so there are no other overly permissive policies to tighten

