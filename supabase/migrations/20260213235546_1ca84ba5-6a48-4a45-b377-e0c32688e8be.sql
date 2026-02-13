
-- Add new fields to leads table for two-path form
ALTER TABLE public.leads
  ADD COLUMN lead_type TEXT,
  ADD COLUMN improvements TEXT[],
  ADD COLUMN business_name TEXT,
  ADD COLUMN business_description TEXT,
  ADD COLUMN website_goals TEXT[],
  ADD COLUMN pages_wanted TEXT[],
  ADD COLUMN style_vibe TEXT,
  ADD COLUMN example_links TEXT[];

-- Make goal and message optional (they were required before but paths differ now)
ALTER TABLE public.leads ALTER COLUMN goal DROP NOT NULL;
ALTER TABLE public.leads ALTER COLUMN message DROP NOT NULL;
