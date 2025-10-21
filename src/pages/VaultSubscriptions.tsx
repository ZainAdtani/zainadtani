import { useEffect, useState } from "react";
import { Moon, ArrowLeft, Plus, Search } from "lucide-react";
import { CosmicBackground } from "@/components/CosmicBackground";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Subscription, SEED_SUBSCRIPTIONS } from "@/types/subscription";
import { calculateTotals } from "@/utils/subscription-utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const STORAGE_KEY = "vault_session";
const SUBSCRIPTIONS_KEY = "vault_subscriptions_v1";

export default function VaultSubscriptions() {
  const [authorized, setAuthorized] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"monthly" | "yearly">("monthly");
  const [filterCadence, setFilterCadence] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name-asc");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSub, setEditingSub] = useState<Subscription | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  // Form state
  const [formName, setFormName] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formMethod, setFormMethod] = useState("");
  const [formCadence, setFormCadence] = useState<Subscription["cadence"]>("Monthly");
  const [formCategory, setFormCategory] = useState<Subscription["category"]>("Personal");
  const [formNextBill, setFormNextBill] = useState("");

  const MIGRATION_VERSION_KEY = "vault_subs_migration_version";
  const CURRENT_MIGRATION = "2"; // bump this if you change migration later

  useEffect(() => {
    const isAuth = localStorage.getItem(STORAGE_KEY) === "true";
    setAuthorized(isAuth);
    if (!isAuth) {
      window.location.href = "/vault";
      return;
    }

    // Build EXACT subscription list (deduped by name)
    type S = Subscription;
    const byName = new Map<string, S>();

    const add = (s: Omit<S, "id"> & { id?: string }) => {
      const nameKey = s.name.trim().toLowerCase();
      if (!byName.has(nameKey)) {
        byName.set(nameKey, {
          id: Date.now().toString() + Math.random().toString().slice(2, 6),
          paused: false,
          ...s,
        } as S);
      }
    };

    // 1) Spotify Family — keep
    add({
      name: "Spotify Family",
      amount: "$23",
      method: "",
      cadence: "Monthly",
      category: "Personal",
      nextBillDate: "",
      paused: false,
    });

    // 2) HeyGen AI — keep
    add({
      name: "HeyGen AI",
      amount: "$290",
      method: "",
      cadence: "Yearly",
      category: "Work",
      nextBillDate: "",
      paused: false,
    });

    // 3) Bookmory — add
    add({
      name: "Bookmory",
      amount: "$31",
      method: "Apple CC 2708",
      cadence: "Yearly",
      category: "Personal",
      nextBillDate: "",
      paused: false,
    });

    // 4) Goodnotes — add
    add({
      name: "Goodnotes",
      amount: "$12",
      method: "Apple CC 2708",
      cadence: "Yearly",
      category: "Work",
      nextBillDate: "",
      paused: false,
    });

    // 5) iCloud+ — add
    add({
      name: "iCloud+",
      amount: "$3",
      method: "Apple CC 2708",
      cadence: "Monthly",
      category: "Utilities",
      nextBillDate: "",
      paused: false,
    });

    // Convert back to array
    const fixed = Array.from(byName.values());

    // Save + render
    localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(fixed));
    setSubscriptions(fixed);
  }, []);

  useEffect(() => {
    if (subscriptions.length > 0) {
      localStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(subscriptions));
    }
  }, [subscriptions]);

  const totals = calculateTotals(subscriptions);

  const openAddDialog = () => {
    setEditingSub(null);
    setFormName("");
    setFormAmount("");
    setFormMethod("");
    setFormCadence("Monthly");
    setFormCategory("Personal");
    setFormNextBill("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (sub: Subscription) => {
    setEditingSub(sub);
    setFormName(sub.name);
    setFormAmount(sub.amount);
    setFormMethod(sub.method);
    setFormCadence(sub.cadence);
    setFormCategory(sub.category);
    setFormNextBill(sub.nextBillDate || "");
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formName || !formAmount) return;

    const newSub: Subscription = {
      id: editingSub?.id || Date.now().toString(),
      name: formName,
      amount: formAmount,
      method: formMethod,
      cadence: formCadence,
      category: formCategory,
      nextBillDate: formNextBill || undefined,
      paused: editingSub?.paused || false,
    };

    if (editingSub) {
      setSubscriptions((subs) => subs.map((s) => (s.id === editingSub.id ? newSub : s)));
    } else {
      setSubscriptions((subs) => [...subs, newSub]);
    }

    setIsDialogOpen(false);
  };

  const handleTogglePause = (id: string) => {
    setSubscriptions((subs) => subs.map((s) => (s.id === id ? { ...s, paused: !s.paused } : s)));
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setSubscriptions((subs) => subs.filter((s) => s.id !== deleteId));
    setDeleteId(null);
  };

  const filteredSubs = subscriptions
    .filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCadence = filterCadence === "all" || s.cadence === filterCadence;
      const matchesCategory = filterCategory === "all" || s.category === filterCategory;
      return matchesSearch && matchesCadence && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      // Could add amount sorting with proper parsing
      return 0;
    });

  if (!authorized) return null;

  return (
    <div className="min-h-screen text-white relative">
      <CosmicBackground />

      {/* Header */}
      <header className="py-8 border-b border-white/10 backdrop-blur-sm relative">
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Moon className="w-6 h-6 text-blue-400" />
            <h1 className="text-3xl font-bold">Subscriptions</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="/vault" className="text-sm underline hover:text-blue-400 transition flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Vault
            </a>
            <a href="/" className="text-sm underline hover:text-blue-400 transition">
              Home
            </a>
          </div>
        </div>
      </header>

      <main className="py-10 relative">
        <div className="container mx-auto px-4 max-w-7xl space-y-8">
          {/* Summary Strip */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex gap-8">
                <div>
                  <p className="text-white/60 text-sm mb-1">Total {viewMode === "monthly" ? "Monthly" : "Yearly"}</p>
                  <p className="text-3xl font-bold">${viewMode === "monthly" ? totals.monthly : totals.yearly}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Active Subscriptions</p>
                  <p className="text-3xl font-bold">{totals.count}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Toggle
                  pressed={viewMode === "monthly"}
                  onPressedChange={() => setViewMode("monthly")}
                  className="bg-white/10 data-[state=on]:bg-blue-500/50"
                >
                  Monthly
                </Toggle>
                <Toggle
                  pressed={viewMode === "yearly"}
                  onPressedChange={() => setViewMode("yearly")}
                  className="bg-white/10 data-[state=on]:bg-blue-500/50"
                >
                  Yearly
                </Toggle>
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input
                placeholder="Search subscriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <Select value={filterCadence} onValueChange={setFilterCadence}>
                <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Cadence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cadence</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                  <SelectItem value="Unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Work">Work</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Fitness">Fitness</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={openAddDialog} className="bg-blue-500 hover:bg-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Subscription
              </Button>
            </div>
          </div>

          {/* Subscriptions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubs.map((sub) => (
              <SubscriptionCard
                key={sub.id}
                subscription={sub}
                onEdit={openEditDialog}
                onTogglePause={handleTogglePause}
                onDelete={(id) => setDeleteId(id)}
              />
            ))}
          </div>

          {/* Notes */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
            <h2 className="font-semibold text-xl mb-3">Notes</h2>
            <Textarea
              placeholder="Drop anything here — payment reminders, upcoming changes, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
            />
          </div>
        </div>
      </main>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#1a1f2e] border-white/20 text-white">
          <DialogHeader>
            <DialogTitle>{editingSub ? "Edit" : "Add"} Subscription</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount (e.g., $20 / month)</Label>
              <Input
                id="amount"
                value={formAmount}
                onChange={(e) => setFormAmount(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="method">Payment Method</Label>
              <Input
                id="method"
                value={formMethod}
                onChange={(e) => setFormMethod(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                placeholder="AMEX ••1234"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cadence">Billing Frequency</Label>
                <Select value={formCadence} onValueChange={(v) => setFormCadence(v as Subscription["cadence"])}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Yearly">Yearly</SelectItem>
                    <SelectItem value="Unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formCategory} onValueChange={(v) => setFormCategory(v as Subscription["category"])}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Work">Work</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Fitness">Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="nextBill">Next Bill Date (optional)</Label>
              <Input
                id="nextBill"
                type="date"
                value={formNextBill}
                onChange={(e) => setFormNextBill(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-[#1a1f2e] border-white/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subscription?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              This action cannot be undone. This will permanently delete this subscription.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
