import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  { term: "Mulaqat", def: "A meeting or encounter with the Imam." },
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
  { term: "Walaya", def: "Love and devotion to the Imam." },
  { term: "Wilaya", def: "Authority and guardianship of the Imam." },
  { term: "Bay'ah", def: "Pledge or oath of allegiance." },
  { term: "Nur", def: "Divine light." },
  { term: "Ilm", def: "Divinely inspired knowledge." },
  { term: "Niyyah", def: "Intention." },
  { term: "Zahir", def: "Exoteric. Outer. Physical. Matter." },
  { term: "Batin", def: "Esoteric. Inner. Spiritual. Spirit." },
  { term: "Ibadat", def: "Worship and service." },
  { term: "Tasbih", def: "Invocation." },
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
  // New pages from added images
  { id: "walaya", title: "Walaya and Wilaya" },
  { id: "within-jamat", title: "Within the Jamat" },
  { id: "ethics", title: "Ethics and Principles" },
  { id: "devotional", title: "Devotional Practice" },
  { id: "day-of-didar", title: "Day of the Didar" },
  { id: "entering-hall", title: "Entering the Hall" },
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
          content="A guided, scroll friendly Mulaqat journal with quotes, glossary, intentions, ethics, and reflections."
        />
      </Helmet>

      {/* Header with compact dropdown navigation */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button variant="ghost" asChild>
            <a href="/usa-visit-2025" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </a>
          </Button>

          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold truncate">Illuminate</h1>
            <p className="text-xs text-muted-foreground truncate">Lighting the Path to Mulaqat</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                Sections
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="max-h-80 overflow-auto">
              {sections.map((s, i) => (
                <DropdownMenuItem key={s.id} onClick={() => goto(i)}>
                  <span className={i === page ? "font-semibold" : ""}>
                    {i + 1}. {s.title}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="h-1 w-full bg-muted">
          <div className="h-1 bg-primary transition-all" style={{ width: `${percent}%` }} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 space-y-16">
        {/* Pager */}
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

        {/* 0. Welcome */}
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
                Follow a simple rhythm. Learn. Reflect. Act. Use space for doodles, poetry, sketches, notes, and
                prayers.
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

        {/* 1. Quotes Carousel */}
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

        {/* 2. How to Use */}
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

        {/* 3. Glossary */}
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

        {/* 4. Preparing for the Didar */}
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

        {/* 5. Significance */}
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

        {/* 6. Adab */}
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
                  Those who know the true position of the Imams and have faith in their Imamat believe that standing
                  before the Imams with respect is a form of prayer that brings the devotee nearer to Allah. One should
                  take up the position due before the Imam with due regard for the dignity of the Imam and look up with
                  the belief that a glimpse of the Imam is a sort of prayer.
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

        {/* 7. Imamat Role */}
        {page === 7 && (
          <section aria-labelledby="imamat">
            <h2 id="imamat" className="text-3xl font-bold tracking-tight mb-4">
              The Ismaili Imamat. Role and Mandate
            </h2>

            <Card className="p-6 space-y-4">
              <p>
                The Imam interprets the faith and strives to improve the quality of life of the Jamat and wider
                humanity. He guides us in spiritual matters and in our worldly lives. He reminds us of values that
                endure. Peace, justice, generosity, kindness, harmony, pursuit of knowledge, care for the environment,
                and support for the vulnerable.
              </p>

              <blockquote className="p-4 rounded-lg bg-muted/40 border">
                <p className="text-muted-foreground">Lisbon, Portugal, February 11, 2025.</p>
                <p className="mt-2 text-muted-foreground">
                  It has been the responsibility of every Imam since the time of Hazrat Ali to care for the spiritual
                  and material well being of the Jamat and for your safety and security. I dedicate my life and Imamat
                  resources to these responsibilities. If you have worries and concerns, turn to your Imam. Your Imam is
                  with you. You are constantly in my heart, in my thoughts, and in my prayers.
                </p>
              </blockquote>

              <WriteLines numbered prompts={["Three ways the guidance of our Imams shapes my daily life"]} lines={3} />
            </Card>
          </section>
        )}

        {/* 8. Walaya and Wilaya */}
        {page === 8 && (
          <section aria-labelledby="walaya">
            <h2 id="walaya" className="text-3xl font-bold tracking-tight mb-4">
              Strengthening My Relationship with the Imam. Walaya and Wilaya
            </h2>

            <Card className="p-6 space-y-6">
              <p>
                Walaya is the living bond of love, loyalty, and devotion by the murid toward the Imam. Wilaya denotes
                the Imam's authority and guardianship as heir to the Prophet in his role as guardian of the believer and
                protector of the message. Through bay'ah the murid embraces loving the Imam and following his guidance.
                Walaya becomes a way of life. Ethical living, steadfastness in prayer, generosity in service. Wilaya
                orients the intellect and conscience, helping us interpret faith in changing times and align choices
                with the Imam's guidance. The rhythm. Remember. Reflect. Respond. Love deepens into trust and trust
                flows into action.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <RoundedPanel
                  title="Ginan. Ab Teri Mohabbat Lagi"
                  body={[
                    "Now that I am in love with you, my Lord, my heart is stricken now with love for you. Let eye look into eye.",
                    "Lift the veil, let us come face to face. Show your gently smiling face, my Lord.",
                    "Grant me the gift of your sight. Now that I am in love with you, my Lord.",
                  ]}
                />
                <RoundedPanel
                  title="Qasida. Bahaar e Dil e Dustaar e Ali"
                  body={[
                    "With a heart adorned with Ali's love and ilm filled with Ali's fragrance, the spring of Ali arrives.",
                  ]}
                  footer="Gist. Love with knowledge brings spring within."
                />
              </div>

              <WriteLines prompts={["What small, regular practices express my love for the Imam"]} lines={4} />

              <ActionList
                items={[
                  "Write a note of gratitude for the guidance of the Imams",
                  "Learn one new thing about Imamat in the Shia tradition",
                ]}
              />

              <BlockQuote
                heading="Youth Mulaqat, Kampala, Uganda, September 12, 2025"
                text="All of you have a common bond through your bay'ah to the Imam. I care about each and every one of you. The Imam's love and care is for all his Jamat."
              />
              <BlockQuote
                heading="Badakhshan, Tajikistan, November 4, 2008"
                text="No mountain, no river, no desert can stop the love of the Imam for his Jamat, worldwide."
              />
            </Card>
          </section>
        )}

        {/* 9. Within the Jamat */}
        {page === 9 && (
          <section aria-labelledby="within-jamat">
            <h2 id="within-jamat" className="text-3xl font-bold tracking-tight mb-4">
              Strengthening Our Relationship Within the Jamat
            </h2>

            <Card className="p-6 space-y-6">
              <p>
                Didar is personal and communal. Our Imams call us to a cosmopolitan ethic and pluralism by listening,
                learning, and showing mutual respect as we walk toward the common good.
              </p>

              <BlockQuote
                heading="Didar, Nairobi, Kenya, August 27, 2025"
                text="Come to pray together in Jamatkhana. Coming together strengthens each one of us and the whole Jamat. Isolation weakens society. Every one of us has a part to play in improving lived experience, including elders and youth. Bring them into the community and help them participate in Jamati events."
              />

              <BulletReflect
                prompts={[
                  "Who helped me prepare for this Mulaqat. Whom might I support",
                  "Where do I notice unity in diversity in my Jamat",
                ]}
              />

              <WriteLines numbered prompts={["Three individuals I will help this month"]} lines={3} />
            </Card>
          </section>
        )}

        {/* 10. Ethics and Principles */}
        {page === 10 && (
          <section aria-labelledby="ethics">
            <h2 id="ethics" className="text-3xl font-bold tracking-tight mb-4">
              Spiritual Preparation Through Ethics and Principles
            </h2>

            <Card className="p-6 space-y-6">
              <p>
                Zahir and batin belong together. Du'a, tasbih, and adab are doors whose outer form opens into inner
                awareness and transformation. Nasir i Khusraw calls this ta'wil. Seek the inner meaning behind the
                outward act. The ayat of Nur has been read as outward light like sun and moon and as inward light, God's
                guidance through the presence of the living Imam which illumines the hearts of murids. The Imam's
                outward person changes through time. The inner reality and light of the Imamat flows continuous until
                the Day of Judgement.
              </p>

              <BlockQuote
                heading="Didar, Nairobi, Kenya, August 27, 2025"
                text="My Jamat should be law abiding, honest men and women of integrity. I would like people to say, that is an Ismaili. The word is reliable. The Prophet was referred to as al amyn because he was trustworthy. He was a man of integrity. Follow his example."
              />

              <BulletReflect
                prompts={[
                  "What are my ethical intentions for the day of the didar such as patience, kindness, generosity",
                ]}
              />

              <ActionList
                items={[
                  "Read a favorite ayah, hadith, farman, ginan, or qasida",
                  "Write one inner insight and one outward action",
                ]}
              />
            </Card>
          </section>
        )}

        {/* 11. Devotional Practice */}
        {page === 11 && (
          <section aria-labelledby="devotional">
            <h2 id="devotional" className="text-3xl font-bold tracking-tight mb-4">
              Devotional Expression and Ritual Experience
            </h2>

            <Card className="p-6 space-y-6">
              <p>
                Devotional practice trains the heart through du'a, dhikr, and salawat. The Qur'an invites us to remember
                Allah often and promises ease of the heart. Blessings on the Prophet and his family or quiet remembrance
                builds a living connection with the Divine. Practice softens the tongue, clears the mind, and makes the
                heart shine.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <MiniBadge title="Qur'an 13:28" body="In the remembrance of Allah do hearts find comfort." />
                <MiniBadge title="Qur'an 24:35" body="Allah is the Light of the heavens and the earth." />
                <MiniBadge title="Qur'an 33:41" body="Remember Allah with much remembrance." />
                <MiniBadge title="Hadith Qudsi" body="I am with My servant when they remember Me." />
              </div>

              <BulletReflect
                prompts={[
                  "Which devotional practices do I relate with the most",
                  "How do I feel while engaging in devotional practices",
                  "In what ways can I strengthen my relationship to our devotional practices",
                ]}
              />

              <ActionList
                items={["Compose a brief prayer or devotional poem as an expression of your thoughts or feelings"]}
              />
            </Card>
          </section>
        )}

        {/* 12. Day of the Didar */}
        {page === 12 && (
          <section aria-labelledby="day-of-didar">
            <h2 id="day-of-didar" className="text-3xl font-bold tracking-tight mb-4">
              Day of the Didar
            </h2>

            <Card className="p-6 space-y-6">
              <p>
                Didar means seeing or vision. Physical didar is when the Imam of the Time visits the Jamat, shares
                guidance, and performs ceremonies. Meeting the Imam has deep significance. Murids who have a permanent
                spiritual bond behold the face of the Imam, invested with spiritual authority. Spiritual didar is the
                ultimate meeting with the nur from which the Imam gives his life in service to his spiritual children.
                This meeting can spark transformation, wisdom, and foresight. We rejoice in baraka and reaffirm our
                bond.
              </p>

              <div className="space-y-3 text-sm text-muted-foreground">
                <div>Qur'an 75:22 23. Faces will be resplendent, looking towards their Lord.</div>
                <div>Prophet Muhammad. Looking at the face of Ali is an act of devotion.</div>
                <div>
                  Nasir i Khusraw. When the Light of the Imam of the Age shone on my soul, I became like the Shining
                  Sun. Through Him I have ascended. The exoteric journey to the Imam's residence and the gateway of
                  God's mercy becomes the purpose of life.
                </div>
              </div>

              <WriteLines
                prompts={[
                  "What do I wish to carry in my heart as I experience didar. Thoughts, feelings, hopes, dreams",
                ]}
                lines={4}
              />
            </Card>
          </section>
        )}

        {/* 13. Entering the Hall */}
        {page === 13 && (
          <section aria-labelledby="entering-hall">
            <h2 id="entering-hall" className="text-3xl font-bold tracking-tight mb-4">
              Entering the Didar Hall. Being Present in Mind, Body, and Soul
            </h2>

            <Card className="p-6 space-y-6">
              <p>
                As we enter, be conscious of attitude and be fully present before the Imam of the Time. This is an
                opportunity to connect with the bearer of Allah's Nur. We will hear guidance with wisdom and foresight
                and words of blessing for spiritual and material prosperity. Rejoice in the baraka and remember that as
                we see the Imam, he also sees each one of us.
              </p>

              <BlockQuote
                heading="Youth Mulaqat, Paris, France, July 13, 2025"
                text="The bond between the Imam of the time and his murids is a permanent spiritual bond. Your Imam cares for you, watches over you, and prays for your success. Treat each other with care and respect. Remember that your Imam is always with you. When facing challenges, remember that I am with you. When you have success and joy, show gratitude to Allah."
              />
            </Card>
          </section>
        )}

        {/* Pager bottom */}
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

function RoundedPanel({ title, body, footer }: { title: string; body: string[] | string; footer?: string }) {
  const lines = Array.isArray(body) ? body : [body];
  return (
    <div className="rounded-3xl border p-5 bg-muted/20">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="space-y-2 text-sm text-muted-foreground">
        {lines.map((l, i) => (
          <p key={i}>{l}</p>
        ))}
      </div>
      {footer && <p className="mt-3 text-xs text-muted-foreground">{footer}</p>}
    </div>
  );
}

function ActionList({ items }: { items: string[] }) {
  return (
    <div className="rounded-xl border p-4 bg-background">
      <h4 className="font-semibold mb-2">Act</h4>
      <ul className="list-disc pl-6 text-sm space-y-2">
        {items.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

function BulletReflect({ prompts }: { prompts: string[] }) {
  return (
    <div className="rounded-xl border p-4 bg-background">
      <h4 className="font-semibold mb-2">Reflect</h4>
      <ul className="list-disc pl-6 text-sm space-y-2">
        {prompts.map((p, idx) => (
          <li key={idx}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

function BlockQuote({ heading, text }: { heading: string; text: string }) {
  return (
    <blockquote className="p-4 rounded-lg bg-muted/40 border">
      <p className="text-sm">{heading}</p>
      <p className="mt-2 text-muted-foreground">{text}</p>
    </blockquote>
  );
}
