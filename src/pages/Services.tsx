import { useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

/** ---------- editable constants ---------- **/
const CONTACT_EMAIL = "hello@zainadtani.com";
const YT_VIDEO_ID = "REPLACE_ME";
const HERO_TITLE = "Services";
const HERO_SUBTITLE = "I build and update your Lovable site";

/** ---------- types ---------- **/
type PricingTier = {
  id: "free" | "care";
  name: string;
  price: string;
  offer: string;
  note?: string;
  inclusions: string[];
  featured?: boolean;
};

/** ---------- data ---------- **/
const tiers: PricingTier[] = [
  {
    id: "free",
    name: "Free Starter",
    price: "Free",
    offer: "30 minute co-build session",
    note: "You bring your idea or draft. We ship a clean starter.",
    inclusions: [
      "Live 30 minute build on a call",
      "Homepage, About, and Contact sections",
      "Mobile responsive polish",
      "Basic SEO setup",
    ],
  },
  {
    id: "care",
    name: "Care Plan",
    price: "$20/month",
    offer: "One hour of monthly updates",
    note: "Best for small ongoing edits and quick fixes",
    inclusions: [
      "1 hour monthly updates",
      "Priority queue",
      "Copy tweaks and new sections",
      "Image swaps and styling fixes",
      "Link checks and basic SEO",
    ],
    featured: true,
  },
];

/** ---------- helpers ---------- **/
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const isUrl = (v: string) => {
  try {
    // allow social handles without protocol by prepending https
    const probe = v.startsWith("http") ? v : `https://${v}`;
    new URL(probe);
    return true;
  } catch {
    return false;
  }
};

export default function Services() {
  /** modal state */
  const [open, setOpen] = useState(false);

  /** form state */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [notes, setNotes] = useState("");
  const [fileChosen, setFileChosen] = useState(false);

  /** errors */
  const [err, setErr] = useState<{ name?: string; email?: string; site?: string }>({});

  /** focus return */
  const lastClickedBtn = useRef<HTMLButtonElement | null>(null);

  const resetForm = () => {
    setName("");
    setEmail("");
    setSite("");
    setNotes("");
    setFileChosen(false);
    setErr({});
  };

  const openModal = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) lastClickedBtn.current = e.currentTarget;
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    // small timeout to ensure dialog has unmounted before focusing
    setTimeout(() => lastClickedBtn.current?.focus(), 50);
  };

  const onSubmit = () => {
    const nextErr: typeof err = {};
    if (!name.trim()) nextErr.name = "Required";
    if (!isEmail(email)) nextErr.email = "Enter a valid email";
    if (!isUrl(site)) nextErr.site = "Enter a valid URL";

    setErr(nextErr);
    if (Object.keys(nextErr).length > 0) return;

    const subject = `New website request from ${name}`;
    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Business website or link: ${site}`,
      `What you want done: ${notes || "-"}`,
      `Source: ${typeof window !== "undefined" ? window.location.href : ""}`,
      fileChosen ? "Attachment reminder: user selected a file. Ask them to attach it." : "",
    ].filter(Boolean);

    const body = lines.join("\n");
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // try to open the user's mail app
    window.location.href = mailto;

    toast({
      title: "Draft email opened",
      description: fileChosen ? "Attach your logo or screenshot, then hit send." : "Hit send to share the details.",
    });

    closeModal();
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-background">
      <Helmet>
        <title>Services | Zain Adtani</title>
        <meta name="description" content="Website creation and maintenance services using Lovable" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* hero */}
        <header className="mb-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3">{HERO_TITLE}</h1>
          <p className="text-lg text-muted-foreground">{HERO_SUBTITLE}</p>
        </header>

        {/* CTA banner */}
        <Card className="mb-12 rounded-xl p-6 md:p-8 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Done-for-you help</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Submit your site, goals, and links. I will set up a fresh, clean Lovable site for you.
              </p>
            </div>
            <Button
              data-event="open-submit-modal"
              className="w-full md:w-auto"
              onClick={openModal}
              aria-label="Open submit website form"
            >
              Submit your website
            </Button>
          </div>
        </Card>

        {/* pricing */}
        <section className="mb-14">
          <div className="relative mb-8">
            <h2 className="text-3xl font-bold text-center text-foreground mb-2">Pricing</h2>
            <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tiers.map((tier) => (
              <Card
                key={tier.id}
                className="relative rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {tier.featured && (
                  <span className="absolute right-4 top-4 text-xs rounded-full bg-primary/10 text-primary px-2 py-1">
                    Best value
                  </span>
                )}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
                    <p className="text-3xl font-extrabold text-primary mt-2">{tier.price}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{tier.offer}</p>
                    {tier.note && <p className="text-xs text-muted-foreground mt-1">{tier.note}</p>}
                  </div>
                  <ul className="space-y-2">
                    {tier.inclusions.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full hover:scale-105 transition-transform"
                    data-evt={tier.id === "free" ? "pricing-free-cta" : "pricing-care-cta"}
                    onClick={openModal}
                    aria-label={`Open submit website form for ${tier.name}`}
                    ref={tier.id === "free" ? undefined : undefined}
                  >
                    Submit your website
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14" id="contact">
          <Card className="rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-1">What is Lovable?</h3>
                <p>Lovable helps you build and ship full sites fast using AI and clean code.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">How do I start?</h3>
                <p>Click Submit your website. I will reply with next steps.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Can I switch plans?</h3>
                <p>Yes. Upgrade or pause any time.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">What fits the Care Plan?</h3>
                <p>Small monthly edits, new sections, bug fixes, image and copy updates.</p>
              </div>
            </div>
          </Card>
        </section>

        {/* YouTube */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Watch how I build</h2>
          <div className="aspect-video w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${YT_VIDEO_ID}`}
              title="YouTube video player"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>
      </div>

      {/* submit website modal */}
      <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : closeModal())}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Submit your website</DialogTitle>
            <DialogDescription>Share a few details and I will follow up by email.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!err.name}
                aria-describedby={err.name ? "name-err" : undefined}
                placeholder="Your name"
              />
              {err.name && (
                <p id="name-err" className="text-xs text-destructive">
                  {err.name}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!err.email}
                aria-describedby={err.email ? "email-err" : undefined}
                placeholder="you@example.com"
              />
              {err.email && (
                <p id="email-err" className="text-xs text-destructive">
                  {err.email}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="site">Business website or link</Label>
              <Input
                id="site"
                value={site}
                onChange={(e) => setSite(e.target.value)}
                aria-invalid={!!err.site}
                aria-describedby={err.site ? "site-err" : undefined}
                placeholder="https://yourdomain.com or linkedin.com/in/you"
              />
              {err.site && (
                <p id="site-err" className="text-xs text-destructive">
                  {err.site}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">What you want done</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="New sections, fixes, goals"
                className="min-h-[90px]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="file">Optional, attach a logo or screenshot</Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={(e) => setFileChosen(!!e.target.files && e.target.files.length > 0)}
              />
              <p className="text-xs text-muted-foreground">Attach the file in your email after the draft opens.</p>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button data-evt="submit-request" onClick={onSubmit}>
              Send details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
