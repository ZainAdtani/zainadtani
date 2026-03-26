

## Site Cleanup — Deletion Plan

### Summary
Delete 21 page files, their routes, imports, nav entries, and supporting files. Keep all guarded pages untouched.

---

### Files to DELETE (21 pages + 4 components + 4 support files = 29 files)

**Pages:**
1. `src/pages/Sports.tsx`
2. `src/pages/Health.tsx`
3. `src/pages/EnrolledAgent.tsx`
4. `src/pages/TaxQuest.tsx`
5. `src/pages/QuickBooks.tsx`
6. `src/pages/QuickBooksFastTrack.tsx`
7. `src/pages/QuickBooksCleanup.tsx`
8. `src/pages/SecretVault.tsx`
9. `src/pages/VaultSubscriptions.tsx`
10. `src/pages/VaultDevices.tsx`
11. `src/pages/Workout.tsx`
12. `src/pages/LegacyEATax.tsx`
13. `src/pages/Contact.tsx`
14. `src/pages/PersonalLearningVault.tsx`
15. `src/pages/FinancialTreasureMap.tsx`
16. `src/pages/WebsiteLab.tsx`
17. `src/pages/Resume.tsx`
18. `src/pages/Thanks.tsx`
19. `src/pages/projects/EAStudyChatbot.tsx`
20. `src/pages/usa-visit-2025/DevotionalLiterature.tsx`
21. `src/pages/usa-visit-2025/Illuminate.tsx`

**Components:**
22. `src/components/TryTaxQuestCTA.tsx`
23. `src/components/EAGame.tsx`
24. `src/components/SubscriptionCard.tsx`
25. `src/components/SubscriptionsVault.tsx`

**Support files:**
26. `src/types/subscription.ts`
27. `src/styles/starter-lab.css`
28. `src/config/links.ts`
29. `src/utils/subscription-utils.ts`

**Keep:** `src/styles/investing-ftw.css` (used by Investing.tsx)

---

### Files to EDIT

**`src/App.tsx`** — Remove all imports and `<Route>` entries for deleted pages. Remove redirects for `/nba`, `/workout`, `/contact`. Keep all guarded routes.

**`src/data/nav.ts`** — Strip archive down to only Investing, Waez, Projects, My Podcast. Remove Health from main. Remove entire vault section. Clean up unused icon imports.

**`src/data/projects.ts`** — Remove the `ea-study-chatbot` entry from the projects array (the page is deleted, but the data entry would create a dead link on the Projects page).

---

### Final nav.ts structure

**Main:** Home, About, Services, Books, Blog, Digital Products, AI Prompts, Life Notes, Tools

**Archive:** Investing, Waez, Projects, My Podcast

**Vault:** (removed entirely)

---

### Edge function references
- `ea-study-chat` call in `EAStudyChatbot.tsx` — deleted with the page
- `nba-standings` call in `Sports.tsx` — deleted with the page
- `generate-quote` — untouched (homepage)
- The edge function code files themselves (`supabase/functions/ea-study-chat/`, `supabase/functions/nba-standings/`) and `supabase/config.toml` entries are NOT deleted in this step (they're backend artifacts, not frontend). Can clean those separately if desired.

