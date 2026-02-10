import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const STORAGE_KEY = "vault_session";

// ---------- types ----------
type Brand = "Apple" | "reMarkable" | "Other";
type DeviceType = "Phone" | "Tablet" | "Laptop" | "Watch" | "Audio" | "Other";
type Status = "Active" | "Sold" | "Lost" | "Unknown";

type Device = {
  id: string;
  name: string;
  brand: Brand;
  type: DeviceType;
  model?: string;
  purchaseDateISO?: string;
  coverageEndsISO?: string;
  notes?: string;
  status?: Status;
  imageUrl?: string;
};

type SortKey = "NEWEST" | "OLDEST" | "NAME_ASC" | "NAME_DESC";
type BrandFilter = "All" | Brand;
type TypeFilter = "All" | DeviceType;
type StatusFilter = "All" | Status;

// ---------- seed data ----------
const SEED_DEVICES: Device[] = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    type: "Phone",
    model: "iPhone 15 Pro Max · 256GB · Blue Titanium",
    status: "Active",
    notes: "Estimated trade-in value up to $450",
    imageUrl: "/images/devices/iphone-15-pro-max.png",
  },
  {
    id: "ipad-air",
    name: "iPad Air",
    brand: "Apple",
    type: "Tablet",
    model: '11-inch iPad Air · Wi-Fi · 128GB · Starlight',
    purchaseDateISO: "2024-07-30",
    status: "Active",
    imageUrl: "/images/devices/ipad-air.png",
  },
  {
    id: "apple-watch-s9",
    name: "Apple Watch Series 9",
    brand: "Apple",
    type: "Watch",
    model: "Series 9 GPS · 45mm · Midnight Aluminum · Sport Band M/L",
    purchaseDateISO: "2024-06-18",
    status: "Active",
    notes: "Released Sep 2023 · S9 SiP · Double Tap gesture",
    imageUrl: "/images/devices/apple-watch-s9.png",
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    brand: "Apple",
    type: "Audio",
    model: "AirPods Pro · 2nd generation · USB-C",
    status: "Active",
    imageUrl: "/images/devices/airpods-pro-2.png",
  },
  {
    id: "remarkable-1",
    name: "reMarkable 1",
    brand: "reMarkable",
    type: "Tablet",
    model: "reMarkable · 1st generation · Paper tablet",
    status: "Active",
    imageUrl: "/images/devices/remarkable-1.png",
  },
];

// ---------- helpers ----------
const BRAND_COLORS: Record<Brand, string> = {
  Apple: "bg-slate-700 text-white",
  reMarkable: "bg-amber-700 text-white",
  Other: "bg-slate-500 text-white",
};

const STATUS_COLORS: Record<Status, string> = {
  Active: "border-emerald-500/40 text-emerald-400",
  Sold: "border-slate-500/40 text-slate-400",
  Lost: "border-red-500/40 text-red-400",
  Unknown: "border-slate-500/40 text-slate-500",
};

const fmtDate = (iso?: string) => {
  if (!iso) return null;
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// ---------- component ----------
export default function VaultDevices() {
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) !== "true") {
      window.location.replace("/vault");
    }
  }, []);

  const [sortKey, setSortKey] = useState<SortKey>("NAME_ASC");
  const [query, setQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState<BrandFilter>("All");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const summary = useMemo(() => {
    const total = SEED_DEVICES.length;
    const apple = SEED_DEVICES.filter((d) => d.brand === "Apple").length;
    return { total, apple, other: total - apple };
  }, []);

  const filteredSorted = useMemo(() => {
    let list = [...SEED_DEVICES];

    if (brandFilter !== "All") list = list.filter((d) => d.brand === brandFilter);
    if (typeFilter !== "All") list = list.filter((d) => d.type === typeFilter);
    if (statusFilter !== "All") list = list.filter((d) => (d.status ?? "Unknown") === statusFilter);

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((d) =>
        [d.name, d.model, d.brand, d.type, d.notes].some((f) => f?.toLowerCase().includes(q)),
      );
    }

    switch (sortKey) {
      case "NEWEST":
        list.sort((a, b) => (b.purchaseDateISO ?? "").localeCompare(a.purchaseDateISO ?? ""));
        break;
      case "OLDEST":
        list.sort((a, b) => (a.purchaseDateISO ?? "").localeCompare(b.purchaseDateISO ?? ""));
        break;
      case "NAME_ASC":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "NAME_DESC":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return list;
  }, [sortKey, query, brandFilter, typeFilter, statusFilter]);

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 dark:bg-[#0a0e17] dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Devices</h1>
          <Link
            to="/vault"
            className="text-sm text-slate-500 underline hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Back to Vault
          </Link>
        </div>

        {/* Summary tiles */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <SummaryTile label="Total Devices" value={`${summary.total}`} emoji="📦" />
          <SummaryTile label="Apple Devices" value={`${summary.apple}`} emoji="🍎" />
          <SummaryTile label="Other Devices" value={`${summary.other}`} emoji="🔌" />
        </div>

        {/* Control bar */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              placeholder="Search devices…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="sm:max-w-xs"
            />
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm dark:border-white/10 dark:bg-white/[.06]"
            >
              <option value="NEWEST">Newest first</option>
              <option value="OLDEST">Oldest first</option>
              <option value="NAME_ASC">Name A → Z</option>
              <option value="NAME_DESC">Name Z → A</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value as BrandFilter)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm dark:border-white/10 dark:bg-white/[.06]"
            >
              <option value="All">All brands</option>
              <option value="Apple">Apple</option>
              <option value="reMarkable">reMarkable</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm dark:border-white/10 dark:bg-white/[.06]"
            >
              <option value="All">All types</option>
              <option value="Phone">Phone</option>
              <option value="Tablet">Tablet</option>
              <option value="Laptop">Laptop</option>
              <option value="Watch">Watch</option>
              <option value="Audio">Audio</option>
              <option value="Other">Other</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm dark:border-white/10 dark:bg-white/[.06]"
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Sold">Sold</option>
              <option value="Lost">Lost</option>
              <option value="Unknown">Unknown</option>
            </select>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Showing {filteredSorted.length} of {SEED_DEVICES.length}
            </span>
          </div>
        </div>

        {/* Grid */}
        {filteredSorted.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSorted.map((d) => (
              <DeviceCard key={d.id} device={d} onClick={() => setSelectedDevice(d)} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border bg-white/90 p-10 text-center text-slate-500 dark:border-white/10 dark:bg-white/[.06] dark:text-slate-400">
            No devices match your filters.
          </div>
        )}

        {/* Detail dialog */}
        <Dialog open={!!selectedDevice} onOpenChange={() => setSelectedDevice(null)}>
          <DialogContent className="max-w-md dark:bg-[#111827] dark:border-white/10">
            {selectedDevice && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl">{selectedDevice.name}</DialogTitle>
                </DialogHeader>

                {/* Dialog image */}
                {selectedDevice.imageUrl && (
                  <div className="flex justify-center rounded-xl bg-gradient-to-b from-slate-100 to-slate-50 p-6 dark:from-slate-800/60 dark:to-slate-900/60">
                    <img
                      src={selectedDevice.imageUrl}
                      alt={selectedDevice.name}
                      className="h-40 w-auto object-contain"
                    />
                  </div>
                )}

                <div className="space-y-3 text-sm">
                  {selectedDevice.model && (
                    <div>
                      <span className="font-medium text-slate-500 dark:text-slate-400">Model:</span>{" "}
                      {selectedDevice.model}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Badge className={BRAND_COLORS[selectedDevice.brand]}>{selectedDevice.brand}</Badge>
                    <Badge variant="outline">{selectedDevice.type}</Badge>
                    <Badge variant="outline" className={STATUS_COLORS[selectedDevice.status ?? "Unknown"]}>
                      {selectedDevice.status ?? "Unknown"}
                    </Badge>
                  </div>
                  {selectedDevice.purchaseDateISO && (
                    <div>
                      <span className="font-medium text-slate-500 dark:text-slate-400">Ordered:</span>{" "}
                      {fmtDate(selectedDevice.purchaseDateISO)}
                    </div>
                  )}
                  {selectedDevice.coverageEndsISO && (
                    <div>
                      <span className="font-medium text-slate-500 dark:text-slate-400">Coverage ends:</span>{" "}
                      {fmtDate(selectedDevice.coverageEndsISO)}
                    </div>
                  )}
                  {selectedDevice.notes && (
                    <div>
                      <span className="font-medium text-slate-500 dark:text-slate-400">Notes:</span>{" "}
                      {selectedDevice.notes}
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// ---------- UI bits ----------

function SummaryTile({ label, value, emoji }: { label: string; value: string; emoji: string }) {
  return (
    <div className="rounded-2xl border bg-white/90 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[.06]">
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <span className="text-lg">{emoji}</span>
        {label}
      </div>
      <div className="mt-1 text-3xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function DeviceCard({ device, onClick }: { device: Device; onClick: () => void }) {
  const { name, brand, type, model, status, purchaseDateISO, coverageEndsISO, notes, imageUrl } = device;

  return (
    <Card
      className="group relative cursor-pointer overflow-hidden rounded-2xl border bg-white/90 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[.06]"
      onClick={onClick}
    >
      {/* Glass highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />

      {/* Thumbnail area */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-slate-100 via-slate-50 to-white dark:from-slate-800/80 dark:via-slate-900/60 dark:to-slate-950/80">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-32 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1"
            style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,.12))" }}
          />
        ) : (
          <div className="text-6xl opacity-40">📦</div>
        )}
      </div>

      <CardHeader className="relative pb-2 pt-4">
        <CardTitle className="text-base font-semibold">{name}</CardTitle>
        {model && (
          <div className="mt-0.5 text-xs leading-snug text-slate-500 dark:text-slate-400">
            {model}
          </div>
        )}
      </CardHeader>

      <CardContent className="relative space-y-3 pb-5">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          <Badge className={`text-xs ${BRAND_COLORS[brand]}`}>{brand}</Badge>
          <Badge variant="outline" className="text-xs">{type}</Badge>
          <Badge variant="outline" className={`text-xs ${STATUS_COLORS[status ?? "Unknown"]}`}>
            {status ?? "Unknown"}
          </Badge>
        </div>

        {/* Info */}
        <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
          {purchaseDateISO && <div>Ordered {fmtDate(purchaseDateISO)}</div>}
          {coverageEndsISO && <div>Coverage ends {fmtDate(coverageEndsISO)}</div>}
          {notes && <div className="line-clamp-2">{notes}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
