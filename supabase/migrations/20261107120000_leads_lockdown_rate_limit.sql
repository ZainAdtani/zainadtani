-- Leads: public can INSERT only. No public SELECT, UPDATE, DELETE, or TRUNCATE.
-- RLS already blocks select/update/delete for anon, but TRUNCATE is not covered
-- by RLS, so drop the extra table grants too. Inserts use return=minimal, so
-- the form does not need SELECT.
REVOKE SELECT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.leads FROM anon, authenticated;
GRANT INSERT ON public.leads TO anon, authenticated;

-- Server side rate limit. The browser has its own cooldown, but a bot can call
-- the API directly, so the database enforces a limit as well.
--   * Same email: at most 3 leads per hour.
--   * Whole table: at most 30 leads per 10 minutes (stops a flood).
CREATE INDEX IF NOT EXISTS leads_email_created_at_idx ON public.leads (lower(email), created_at DESC);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);

CREATE OR REPLACE FUNCTION public.leads_rate_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Server sets the timestamp, so a client cannot backdate rows to dodge the limit.
  NEW.created_at := now();

  IF (SELECT count(*) FROM public.leads
      WHERE lower(email) = lower(NEW.email)
        AND created_at > now() - interval '1 hour') >= 3 THEN
    RAISE EXCEPTION 'Too many submissions for this email. Try again later.'
      USING ERRCODE = 'P0001';
  END IF;

  IF (SELECT count(*) FROM public.leads
      WHERE created_at > now() - interval '10 minutes') >= 30 THEN
    RAISE EXCEPTION 'Too many submissions right now. Try again later.'
      USING ERRCODE = 'P0001';
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.leads_rate_limit() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS leads_rate_limit ON public.leads;
CREATE TRIGGER leads_rate_limit
  BEFORE INSERT ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.leads_rate_limit();
