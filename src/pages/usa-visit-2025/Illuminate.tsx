import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type QuoteCard = {
  id: string;
  label: string;
  title?: string;
  excerpt: string;
  details?: string;
};

type GlossaryItem = {
  term: string;
  def: string;
};

const quotes: QuoteCard[] = [
  {
    id: "q459",
    label: "Qur'an 4:59",
    excerpt: "O you who believe. Obey Allah and obey the Messenger and those in divinely granted authority among you.",
  },
  {
    id: "mhi-2025",
    label: "Mawlana Hazar Imam",
    title: "Takht Nashini, February 11, 2025",
    excerpt: "In coming months, I look forward to visiting my Jamat and meeting with leaders of your countries.",
    details:
      "As I endeavor to be physically with my Jamat as much as possible, remember that your Imam is with you at all times. Even when I am not with you in person, you are always in my heart, in my thoughts, and in my prayers. Feel your Imam's presence. He is with you now and for evermore.",
  },
  {
    id: "hadith",
    label: "Hadith of Prophet Muhammad",
    title: "(s.a.s.)",
    excerpt: "Ali is part of me and I of him. He is the wali, patron and guardian, of all the faithful after me.",
  },
  {
    id: "q3612",
    label: "Qur'an 36:12",
    excerpt: "We have encompassed everything in the manifest Imam.",
  },
  {
    id: "ginan",
    label: "Ginan",
    title: "Ab Teri mohabbat lagi",
    excerpt: "I thirst, O Beloved, for a vision of You.",
    details: "Fulfil, O Beloved, the hope of my heart.",
  },
  {
    id: "nasheed",
    label: "Nasheed",
    title: "Mawla al Baraya",
    excerpt: "A love bound murid seeks mercy and forgiveness from the Imam of the Time.",
    details:
      "For this murid, no other Mawla is present. The desire is for the Imam's blessed gaze, nazar. Through this noble grace, he receives victory and upliftment.",
  },
  {
    id: "tusi",
    label: "Nasir al Din al Tusi",
    title: "d. 1274 C.E.",
    excerpt: "The greatest expression of divine mercy is the appearance of the Imam of the Age as a man among others,",
    details: "so that through him man may know Allah in the true sense of knowing Him.",
  },
  {
    id: "qasida",
    label: "Qasida",
    title: "Antum furuudi wa nafli",
    excerpt: "Your beauty is in front of my eyes. I am directed toward it.",
    details: "Your secret is in my heart. My heart is in a state of enlightenment.",
  },
];

const glossary: GlossaryItem[] = [
  {
    term: "Mulaqat",
    def: "A meeting or encounter with the Imam.",
  },
  {
    term: "Didar",
    def: "Vision or seeing of the Imam. Physical didar is when the Imam of the Time visits a Jamat, gives guidance, and performs religious ceremonies.",
  },
  {
    term: "Intizar",
    def: "To await with eagerness. A time of reflection and preparation while longing for the physical arrival of the Imam.",
  },
  {
    term: "Imamat",
    def: "Institution and model of guidance and leadership in Islam, particularly in Shia Islam.",
  },
  {
    term: "Walaya",
    def: "Love and devotion to the Imam.",
  },
  {
    term: "Wilaya",
    def: "Authority and guardianship of the Imam.",
  },
  {
    term: "Bay'ah",
    def: "Pledge or oath of allegiance.",
  },
  {
    term: "Nur",
    def: "Divine light.",
  },
  {
    term: "Ilm",
    def: "Divinely inspired knowledge.",
  },
  {
    term: "Niyyah",
    def: "Intention.",
  },
  {
    term: "Zahir",
    def: "Exoteric. Outer. Physical. Matter.",
  },
  {
    term: "Batin",
    def: "Esoteric. Inner. Spiritual. Spirit.",
  },
  {
    term: "Ibadat",
    def: "Worship and service.",
  },
  {
    term: "Tasbih",
    def: "Invocation.",
  },
];

const sections = [
  { id: "welcome", title: "Welcome" },
  { id: "quotes", title: "Featured Selections" },
  { id: "overview", title: "How to Use This" },
  { id: "glossary", title: "Glossary" },
  { id: "prepare", title: "Preparing for the Didar" },
  { id: "significance", title: "The Significance of Didar" },
  { id: "adab", title: "Adab in Huzur" },
  { id: "imamat", title: "Ismaili Imamat Role" },
] as const;

export default function Illuminate() {
  const [page, setPage] = useState<number>(0);
  const [qIndex, setQIndex] = useState<number>(0);
  const [auto, setAuto] = useState<boolean>(true);

  const nextPage = () => setPage((p) => Math.min(p + 1, sections.length - 1));
  const prevPage = () => setPage((p) => Math.max(p - 1, 0));
  const goto = (i: number) => setPage(i);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => {
      setQIndex((i) => (i + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(t);
  }, [auto]);

  const percent = useMemo(() => ((page + 1) / sections.length) * 100, [page]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-background">
      <Helmet>
        <title>Illuminate — Lighting the Path to Mulaqat | Zain Adtani</title>
        <meta
          name="description"
          content="A guided, scroll friendly version of the Mulaqat journal with quotes, glossary, intentions, and reflections."
        />
      </Helmet>

      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" asChild>
            <a href="/usa-visit-2025" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </a>
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold leading-tight">Illuminate</h1>
            <p className="text-xs text-muted-foreground">Lighting the Path to Mulaqat</p>
          </div>
          <nav className="hidden md:flex gap-2">
            {sections.map((s, i) => (
              <Button key={s.id} size="sm" variant={i === page ? "default" : "ghost"} onClick={() => goto(i)}>
                {s.title}
              </Button>
            ))}
          </nav>
        </div>
        <div className="h-1 w-full bg-muted">
          <div className="h-1 bg-primary transition-all" style={{ width: `${percent}%` }} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 space-y-16">
        {/* Page Controls */}
        <div className="flex items-center justify-between">
          <Button onClick={prevPage} variant="outline" disabled={page === 0}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Prev
          </Button>
          <div className="text-sm text-muted-foreground">
            {page + 1} of {sections.length}
          </div>
          <Button onClick={nextPage} variant="default" disabled={page === sections.length - 1}>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Welcome */}
        {page === 0 && (
          <section aria-labelledby="welcome">
            <div className="mb-8">
              <h2 id="welcome" className="text-3xl font-bold tracking-tight">
                Welcome
              </h2>
              <p className="text-muted-foreground mt-2">
                This is your companion for the Didar of Mawlana Hazar Imam with the USA Jamat. Use it to prepare your
                heart. Focus your mind. Record your feelings. Carry the light into daily life.
              </p>
            </div>

            <Card className="p-6 space-y-3">
              <p>
                Each section follows a simple rhythm. Learn. Reflect. Act. Use the extra space for doodles, poetry,
                sketches, notes, and prayers.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-2">
                <MiniBadge
                  title="Preparing for the Didar"
                  body="Set intentions. Reflect on key concepts. Practice adab. Prepare your mind and heart."
                />
                <MiniBadge
                  title="Day of the Didar"
                  body="Stay present. Note words, images, or symbols to capture your feelings and experiences."
                />
                <MiniBadge
                  title="Reflecting on the Didar"
                  body="Offer shukrana. Create a plan for living the guidance you received."
                />
              </div>
            </Card>
          </section>
        )}

        {/* Quotes Carousel */}
        {page === 1 && (
          <section aria-labelledby="quotes">
            <div className="flex items-center justify-between mb-4">
              <h2 id="quotes" className="text-3xl font-bold tracking-tight">
                Featured Selections
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQIndex((i) => (i - 1 + quotes.length) % quotes.length)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setAuto((v) => !v)}>
                  {auto ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={() => setQIndex((i) => (i + 1) % quotes.length)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Card className="p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent pointer-events-none" />
              <div className="space-y-2">
                <div className="text-sm font-semibold text-primary">{quotes[qIndex].label}</div>
                {quotes[qIndex].title && <div className="text-xs text-muted-foreground">{quotes[qIndex].title}</div>}
                <p className="text-lg leading-relaxed">{quotes[qIndex].excerpt}</p>
                {quotes[qIndex].details && <p className="text-muted-foreground">{quotes[qIndex].details}</p>}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {quotes.map((q, i) => (
                  <button
                    key={q.id}
                    aria-label={q.label}
                    onClick={() => setQIndex(i)}
                    className={`h-2 w-8 rounded-full transition-all ${
                      i === qIndex ? "bg-primary" : "bg-muted hover:bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </Card>
          </section>
        )}

        {/* How to Use */}
        {page === 2 && (
          <section aria-labelledby="overview">
            <h2 id="overview" className="text-3xl font-bold tracking-tight mb-4">
              How to Use This
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Learn</h3>
                <p className="text-muted-foreground">
                  Read the cards. Pause on a line that moves you. Say it out loud. Let the meaning settle.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Reflect</h3>
                <p className="text-muted-foreground">
                  Write one word for how you feel about the Didar. Write one sentence on what bay'ah means to you.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Act</h3>
                <p className="text-muted-foreground">
                  Note one intention for your Mulaqat. Keep it simple and specific. Revisit it daily.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Share</h3>
                <p className="text-muted-foreground">
                  Invite family to reflect with you. Use the checklist and the prompts below.
                </p>
              </Card>
            </div>
          </section>
        )}

        {/* Glossary */}
        {page === 3 && (
          <section aria-labelledby="glossary">
            <h2 id="glossary" className="text-3xl font-bold tracking-tight mb-4">
              Glossary
            </h2>
            <Card className="p-2 md:p-4">
              <dl className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                {glossary.map((g) => (
                  <div key={g.term}>
                    <dt className="font-semibold">{g.term}</dt>
                    <dd className="text-muted-foreground">{g.def}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </section>
        )}

        {/* Preparing for the Didar */}
        {page === 4 && (
          <section aria-labelledby="prepare">
            <h2 id="prepare" className="text-3xl font-bold tracking-tight mb-4">
              Preparing for the Didar
            </h2>

            <Card className="p-6 space-y-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  Qur'an 4:174. O humankind. There has come to you a convincing proof from your Lord. We sent to you a
                  Manifest Light.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border p-4 bg-muted/30">
                  <h3 className="font-semibold mb-2">Qasida. Dam hama dam Ali Ali</h3>
                  <p className="text-sm text-muted-foreground">
                    Aashiq proclaims love of Murtaza Ali. Every breath remembers Ali. Ali is praised as Shah and Pir.
                    Guide of Shariat and Tariqat. Haqiqat itself.
                  </p>
                </div>
                <div className="rounded-xl border p-4 bg-muted/30">
                  <h3 className="font-semibold mb-2">Gist</h3>
                  <p className="text-sm text-muted-foreground">
                    In this qasida we witness Hazrat Ali as murshid for murids. Both exoteric and esoteric paths meet in
                    him.
                  </p>
                </div>
              </div>

              <WriteLines
                prompts={[
                  "In one word, how do I feel about the Didar",
                  "In one sentence, what does bay'ah mean to me",
                  "One line intention for my Mulaqat",
                ]}
              />
            </Card>
          </section>
        )}

        {/* Significance of Didar */}
        {page === 5 && (
          <section aria-labelledby="significance">
            <h2 id="significance" className="text-3xl font-bold tracking-tight mb-4">
              The Significance of Didar with the Imam e Zaman
            </h2>

            <Card className="p-6 space-y-4">
              <p>
                In Shia tradition, the Imam is the wali who interprets faith and guides the Jamat in every age. A didar
                is a religious encounter of love and recognition between the murid and the Imam.
              </p>
              <p>
                During a mulaqat, the zahir and batin meet. The physical presence of the Imam stirs an inner recognition
                of the Imam's nur and enduring care. It is also communal. We arrive as one Jamat to receive baraka
                together and carry the blessing back into our lives and service.
              </p>

              <blockquote className="p-4 rounded-lg bg-muted/40 border">
                <p className="text-sm">Youth Mulaqat, Paris, France, July 12, 2025.</p>
                <p className="mt-2 text-muted-foreground">
                  We have a special bond. The bond between the Imam and his murids is a permanent spiritual bond. I care
                  for your spiritual and material success. Our values and principles come from the Qur'an and from the
                  Farmans of your Imams.
                </p>
              </blockquote>

              <WriteLines prompts={["Didar feels to me like", "Because", "Add a sketch of your metaphor"]} />
            </Card>
          </section>
        )}

        {/* Adab */}
        {page === 6 && (
          <section aria-labelledby="adab">
            <h2 id="adab" className="text-3xl font-bold tracking-tight mb-4">
              Adab in the Huzur of Imam e Zaman
            </h2>

            <Card className="p-6 space-y-4">
              <p>
                Followers of the Imam carry themselves with dignity and respect in his presence. This includes open
                hearts, minds, and souls. If we achieve this, behavior will follow.
              </p>

              <blockquote className="p-4 rounded-lg bg-muted/40 border">
                <p className="text-muted-foreground">
                  Those who know the true position of the Imams and have faith in their Imamat believe that standing in
                  front of the Imams with respect is a form of prayer that brings the devotee nearer to Allah. One
                  should adopt the position due before the Imam with due regard for the dignity of the Imam and look up
                  to him with the belief that a glimpse of the Imam is a sort of prayer.
                </p>
              </blockquote>

              <div className="grid md:grid-cols-2 gap-4">
                <Checklist
                  items={["Cleanliness", "Follow volunteer guidance", "Open heart and mind", "Patience", "Humility"]}
                />
              </div>
            </Card>
          </section>
        )}

        {/* Imamat Role */}
        {page === 7 && (
          <section aria-labelledby="imamat">
            <h2 id="imamat" className="text-3xl font-bold tracking-tight mb-4">
              The Ismaili Imamat. Role and Mandate
            </h2>

            <Card className="p-6 space-y-4">
              <p>
                The Imam interprets the faith and strives to improve the quality of life of the Jamat and wider
                humanity. He guides us in spiritual matters and in worldly lives. He reminds us of values that have
                endured since the time of the Prophet. Peace, justice, generosity, kindness, harmony, the pursuit of
                knowledge, care for the environment, and support for the vulnerable.
              </p>

              <blockquote className="p-4 rounded-lg bg-muted/40 border">
                <p className="text-muted-foreground">Lisbon, Portugal, February 11, 2025.</p>
                <p className="mt-2 text-muted-foreground">
                  It has been the responsibility of every Imam since the time of Hazrat Ali to care for the spiritual
                  and material well being of the Jamat and for your safety and security. I dedicate my life and Imamat
                  resources to these responsibilities. If you have worries and concerns, then turn to your Imam. Your
                  Imam is with you. Wherever you are, your Imam is with you. You are constantly in my heart, in my
                  thoughts, and in my prayers.
                </p>
              </blockquote>

              <WriteLines numbered prompts={["Three ways the guidance of our Imams shapes my daily life"]} lines={3} />
            </Card>
          </section>
        )}

        {/* Page Controls Bottom */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button onClick={prevPage} variant="outline" disabled={page === 0}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Prev
          </Button>
          <div className="text-sm text-muted-foreground">
            {page + 1} of {sections.length}
          </div>
          <Button onClick={nextPage} variant="default" disabled={page === sections.length - 1}>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </main>
    </div>
  );
}

/* ---------- Small UI helpers ---------- */

function MiniBadge({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border p-4 bg-background">
      <div className="text-sm font-semibold">{title}</div>
      <p className="text-sm text-muted-foreground mt-1">{body}</p>
    </div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <div className="rounded-xl border p-4 bg-muted/20">
      <ul className="space-y-2">
        {items.map((t, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1 inline-block h-4 w-4 rounded-full border" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WriteLines({ prompts, numbered, lines = 3 }: { prompts: string[]; numbered?: boolean; lines?: number }) {
  return (
    <div className="space-y-6">
      {prompts.map((p, idx) => (
        <div key={idx} className="space-y-2">
          <p className="font-medium">{p}</p>
          {numbered ? (
            <ol className="list-decimal pl-6 space-y-3">
              {Array.from({ length: lines }).map((_, i) => (
                <li key={i}>
                  <div className="h-10 border-b" />
                </li>
              ))}
            </ol>
          ) : (
            <div className="space-y-3">
              {Array.from({ length: lines }).map((_, i) => (
                <div key={i} className="h-10 border-b" />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
