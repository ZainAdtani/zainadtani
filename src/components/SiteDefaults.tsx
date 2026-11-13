import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { OG_IMAGE, PAGE_META, SITE_ORIGIN } from "@/data/pageMeta";
import { LIFE_NOTES, parseNoteNumber } from "@/data/lifeNotes";

/** Fills Open Graph, Twitter, and canonical tags. A page Helmet still overrides any tag it sets. */
export function SiteDefaults() {
  const { pathname } = useLocation();
  const noteNumber = pathname.startsWith("/lifenotes/") ? parseNoteNumber(pathname.slice("/lifenotes/".length)) : null;
  const meta = noteNumber
    ? { title: `Life Note ${noteNumber} | Zain Adtani`, description: LIFE_NOTES[noteNumber - 1] }
    : PAGE_META[pathname];
  const canonical = pathname === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${pathname}`;

  return (
    <Helmet>
      {meta && <meta name="description" content={meta.description} />}
      {meta && <meta property="og:title" content={meta.title} />}
      {meta && <meta property="og:description" content={meta.description} />}
      {meta && <meta name="twitter:title" content={meta.title} />}
      {meta && <meta name="twitter:description" content={meta.description} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:alt" content="Zain Adtani" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@zainadtani" />
      <meta name="twitter:image" content={OG_IMAGE} />
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
