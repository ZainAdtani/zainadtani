import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

const EAST_TEAM_ABBR = new Set([
  "ATL", "BOS", "BKN", "CHA", "CHI", "CLE", "DET", "IND",
  "MIA", "MIL", "NYK", "ORL", "PHI", "TOR", "WAS",
]);

// Simple in-memory cache for the function lifetime
let memCache: { data: any; ts: number } | null = null;

function getCurrentSeasonYear(): number {
  const now = new Date();
  const m = now.getMonth();
  const y = now.getFullYear();
  return m <= 7 ? y - 1 : y;
}

async function fetchStandingsFromESPN(seasonYear: number): Promise<any> {
  const urls = [
    `https://site.web.api.espn.com/apis/v2/sports/basketball/nba/standings?region=us&lang=en&season=${seasonYear}&seasontype=2`,
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/standings?season=${seasonYear}&seasontype=2&region=us&lang=en`,
    // Try without season param for current season
    `https://site.web.api.espn.com/apis/v2/sports/basketball/nba/standings?region=us&lang=en&seasontype=2`,
  ];

  let lastError: Error | null = null;
  for (const url of urls) {
    try {
      const r = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0" },
        cache: "no-store",
      });
      if (r.ok) {
        const data = await r.json();
        return data;
      }
    } catch (e) {
      lastError = e as Error;
    }
  }
  throw lastError || new Error("All ESPN endpoints failed");
}

// Collect all objects/arrays from a JSON tree
function collectAllNodes(root: any): any[] {
  const out: any[] = [];
  const q: any[] = [root];
  while (q.length) {
    const n = q.shift();
    if (!n || typeof n !== "object") continue;
    out.push(n);
    if (Array.isArray(n)) {
      for (const item of n) q.push(item);
    } else {
      for (const value of Object.values(n)) q.push(value);
    }
  }
  return out;
}

function parseRow(e: any, i: number) {
  const team = e?.team || {};
  const sMap = new Map<string, any>();
  const stats = e?.stats || e?.statistics || [];
  for (const s of stats) {
    const key = (s?.name || s?.abbreviation || s?.type || "").toLowerCase();
    if (key) sMap.set(key, s);
  }

  const num = (keys: string[]): number | undefined => {
    for (const k of keys) {
      const s = sMap.get(k);
      if (!s) continue;
      const v = s?.value ?? s?.displayValue;
      if (typeof v === "number") return v;
      const nv = Number(v);
      if (Number.isFinite(nv)) return nv;
    }
    return undefined;
  };

  const txt = (keys: string[]): string => {
    for (const k of keys) {
      const s = sMap.get(k);
      if (s) return (s?.displayValue ?? s?.value ?? "") + "";
    }
    return "";
  };

  const wins = num(["wins", "w", "overallwins", "gamesplayed"]) ?? 0;
  const losses = num(["losses", "l", "overalllosses"]) ?? 0;

  let pct = num(["winpercent", "winpercentage", "pct", "winspercentage"]);
  if (pct === undefined) {
    const raw = txt(["winpercent", "pct", "winspercentage"]) || "0";
    pct = Number(raw.startsWith(".") ? "0" + raw : raw);
  }

  const gb = txt(["gamesback", "gamesbehind", "gb"]) || "—";
  const streak = txt(["streak", "strk"]) || "—";
  const rank = Number(e?.rank) || i + 1;
  const logo = team.logo || team.logos?.[0]?.href || team.logos?.[0]?.url || undefined;

  return {
    rank,
    teamId: String(team.id ?? ""),
    team: team.displayName ?? team.shortDisplayName ?? team.name ?? "",
    abbr: team.abbreviation ?? "",
    logo,
    wins: Number.isFinite(wins) ? wins : 0,
    losses: Number.isFinite(losses) ? losses : 0,
    pct: Number.isFinite(pct as number) ? (pct as number) : 0,
    gb: gb === "0" ? "—" : gb,
    streak,
  };
}

function parseStandings(data: any) {
  const nodes = collectAllNodes(data);

  // Strategy 1: look for conference groups with standings entries (old format)
  const groupsWithEntries = nodes.filter(
    (n) =>
      Array.isArray(n?.standings?.entries) &&
      n.standings.entries.length >= 8 &&
      n.standings.entries.length <= 20
  );

  if (groupsWithEntries.length >= 2) {
    const scored = groupsWithEntries.map((g) => {
      const entries = g.standings.entries || [];
      let eastScore = 0;
      for (const e of entries) {
        if (EAST_TEAM_ABBR.has(e?.team?.abbreviation)) eastScore++;
      }
      return { group: g, eastScore };
    });
    scored.sort((a, b) => b.eastScore - a.eastScore);
    const east = scored[0].group.standings.entries.map(parseRow).sort((a: any, b: any) => a.rank - b.rank).slice(0, 15);
    const west = scored[1].group.standings.entries.map(parseRow).sort((a: any, b: any) => a.rank - b.rank).slice(0, 15);
    if (east.length && west.length) return { east, west };
  }

  // Strategy 2: look for entries arrays directly
  const entryArrays = nodes.filter(
    (n) => Array.isArray(n) && n.length >= 8 && n.length <= 20 && n[0]?.team?.abbreviation
  );

  if (entryArrays.length >= 2) {
    const scored = entryArrays.map((arr) => {
      let eastScore = 0;
      for (const e of arr) if (EAST_TEAM_ABBR.has(e?.team?.abbreviation)) eastScore++;
      return { arr, eastScore };
    });
    scored.sort((a, b) => b.eastScore - a.eastScore);
    const east = scored[0].arr.map(parseRow).sort((a: any, b: any) => a.rank - b.rank).slice(0, 15);
    const west = scored[1].arr.map(parseRow).sort((a: any, b: any) => a.rank - b.rank).slice(0, 15);
    if (east.length && west.length) return { east, west };
  }

  // Strategy 3: look for groups/children with team data
  const children = nodes.filter(
    (n) => Array.isArray(n?.children) && n.children.length >= 2 && n.children[0]?.standings
  );
  if (children.length > 0) {
    const scored = children[0].children.map((g: any) => {
      const entries = g?.standings?.entries || [];
      let eastScore = 0;
      for (const e of entries) if (EAST_TEAM_ABBR.has(e?.team?.abbreviation)) eastScore++;
      return { group: g, eastScore };
    });
    scored.sort((a: any, b: any) => b.eastScore - a.eastScore);
    if (scored.length >= 2) {
      const east = (scored[0].group.standings.entries || []).map(parseRow).sort((a: any, b: any) => a.rank - b.rank).slice(0, 15);
      const west = (scored[1].group.standings.entries || []).map(parseRow).sort((a: any, b: any) => a.rank - b.rank).slice(0, 15);
      if (east.length && west.length) return { east, west };
    }
  }

  // Debug: log top-level keys to help diagnose
  const topKeys = Object.keys(data || {});
  throw new Error(`no standings entries found. Top-level keys: ${topKeys.join(", ")}`);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const forceRefresh = url.searchParams.get("refresh") === "1";

    // Check memory cache
    if (!forceRefresh && memCache && Date.now() - memCache.ts < CACHE_TTL_MS) {
      return new Response(
        JSON.stringify({ ...memCache.data, cached: true, cachedAt: new Date(memCache.ts).toISOString() }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const seasonYear = getCurrentSeasonYear();
    const rawData = await fetchStandingsFromESPN(seasonYear);
    const standings = parseStandings(rawData);

    const result = {
      ...standings,
      seasonYear,
      fetchedAt: new Date().toISOString(),
      cached: false,
    };

    memCache = { data: result, ts: Date.now() };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("nba-standings error:", err);

    // Return cached data if available even if stale
    if (memCache) {
      return new Response(
        JSON.stringify({
          ...memCache.data,
          cached: true,
          stale: true,
          cachedAt: new Date(memCache.ts).toISOString(),
          error: "Live fetch failed, showing cached data",
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: `Unable to load standings. ${err instanceof Error ? err.message : ""}` }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
