import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import harryPotterImg from "@/assets/harry-potter-world.png";

// ---------- Data ----------
type Event = { emoji: string; text: string };
type Book = { label: string; events: Event[] };

const BOOKS: Book[] = [
  {
    label: "BOOK 1 — THE PHILOSOPHER'S STONE",
    events: [
      { emoji: "🔮", text: "Harry discovers he is a wizard" },
      { emoji: "🦉", text: "First letter from Hogwarts arrives" },
      { emoji: "🚂", text: "Platform 9¾ and the Hogwarts Express" },
      { emoji: "🧙", text: "The Sorting Hat places Harry in Gryffindor" },
      { emoji: "⚡", text: "Natural Seeker — first flying lesson" },
      { emoji: "🪞", text: "The Mirror of Erised shows his deepest desire" },
      { emoji: "🐉", text: "Norbert the illegal dragon" },
      { emoji: "🏆", text: "Quirrell and the Stone — Harry survives. Again." },
    ],
  },
  {
    label: "BOOK 2 — THE CHAMBER OF SECRETS",
    events: [
      { emoji: "🚗", text: "Flying the Ford Anglia to Hogwarts" },
      { emoji: "🐍", text: "Harry speaks Parseltongue — school turns" },
      { emoji: "📖", text: "Tom Riddle's enchanted diary" },
      { emoji: "🕷️", text: "Follow the spiders to Aragog" },
      { emoji: "🗡️", text: "The sword of Gryffindor from the hat" },
      { emoji: "💀", text: "The Basilisk — Harry kills it. Twelve years old." },
    ],
  },
  {
    label: "BOOK 3 — THE PRISONER OF AZKABAN",
    events: [
      { emoji: "🐺", text: "Professor Lupin — the best Defense teacher" },
      { emoji: "⏰", text: "Hermione's time turner" },
      { emoji: "🦌", text: "Expecto Patronum — the stag appears" },
      { emoji: "🗺️", text: "The Marauder's Map: I solemnly swear" },
      { emoji: "🐀", text: "Scabbers is Peter Pettigrew" },
      { emoji: "⏪", text: "Saving Sirius and Buckbeak" },
    ],
  },
  {
    label: "BOOK 4 — THE GOBLET OF FIRE",
    events: [
      { emoji: "🔥", text: "The Triwizard Tournament begins" },
      { emoji: "🐲", text: "Hungarian Horntail — first task" },
      { emoji: "🌊", text: "Gillyweed — second task underwater" },
      { emoji: "🌀", text: "The Portkey in the maze — third task" },
      { emoji: "💀", text: '"Kill the spare." Cedric dies.' },
      { emoji: "🩸", text: "Voldemort returns. The graveyard." },
    ],
  },
  {
    label: "BOOK 5 — THE ORDER OF THE PHOENIX",
    events: [
      { emoji: "🏠", text: "Grimmauld Place. The Order." },
      { emoji: "✊", text: "Dumbledore's Army — Harry teaches" },
      { emoji: "📜", text: "Umbridge takes Hogwarts" },
      { emoji: "🔮", text: "The Department of Mysteries" },
      { emoji: "💔", text: "Sirius falls through the veil" },
    ],
  },
  {
    label: "BOOK 6 — THE HALF-BLOOD PRINCE",
    events: [
      { emoji: "🖊️", text: "The Prince's annotated potions book" },
      { emoji: "💊", text: "Felix Felicis — liquid luck" },
      { emoji: "🧪", text: "Hunting Horcruxes with Dumbledore" },
      { emoji: "🏰", text: "The Astronomy Tower" },
      { emoji: "💀", text: '"Severus... please."' },
      { emoji: "🪄", text: "Snape kills Dumbledore. Harry screams." },
    ],
  },
  {
    label: "BOOK 7 — THE DEATHLY HALLOWS",
    events: [
      { emoji: "🔺", text: "The Deathly Hallows — three objects of legend" },
      { emoji: "💒", text: "The wedding. Death Eaters arrive." },
      { emoji: "🏕️", text: "Months in the wilderness, searching" },
      { emoji: "🐍", text: "Nagini at Godric's Hollow" },
      { emoji: "🦌", text: "The silver doe leads Harry to the sword" },
      { emoji: "💀", text: '"Here lies a free elf." Dobby dies.' },
      { emoji: "🏦", text: "Gringotts. Dragon escape." },
      { emoji: "🏰", text: "The Battle of Hogwarts" },
      { emoji: "📖", text: "Snape's memories — the truth. Finally." },
      { emoji: "🫀", text: "Harry walks into the forest to die" },
      { emoji: "👁️", text: '"Always."' },
      { emoji: "✨", text: "Harry defeats Voldemort. It is over." },
      { emoji: "👴", text: 'Nineteen years later. "All was well."' },
    ],
  },
];

const WORLD_CARDS = [
  { emoji: "🏰", title: "Hogwarts School", text: "School of Witchcraft and Wizardry. Founded by four wizards. Sorted by a hat. Protected by magic older than memory." },
  { emoji: "🪄", title: "The Four Houses", text: "Gryffindor, Slytherin, Ravenclaw, Hufflepuff. Your house is your identity. Choose your loyalty wisely." },
  { emoji: "📜", title: "The Ministry of Magic", text: "Hidden from Muggles. Run by wizards. Corrupt more than once. Power corrupts. Even magical power." },
  { emoji: "💀", title: "Voldemort", text: "Tom Riddle. Orphan. Prodigy. Monster. The greatest dark wizard of his age. Defeated by love, not magic." },
  { emoji: "⚡", title: "The Chosen One", text: "A boy who lived when he should have died. Marked by the killing curse. Destined before he could walk." },
  { emoji: "🔮", title: "The Prophecy", text: "Neither can live while the other survives. Spoken before Harry was born. The weight of the world in one sentence." },
];

const BOOK_CARDS = [
  { dot: "#8B4513", title: "The Philosopher's Stone", tag: "Where it all begins.", n: 1 },
  { dot: "#16A34A", title: "The Chamber of Secrets", tag: "The heir has returned.", n: 2 },
  { dot: "#3B82F6", title: "The Prisoner of Azkaban", tag: "The best in the series.", n: 3 },
  { dot: "#DC2626", title: "The Goblet of Fire", tag: "Everything changes here.", n: 4 },
  { dot: "#1F2937", title: "The Order of the Phoenix", tag: "The longest. Worth it.", n: 5 },
  { dot: "#FACC15", title: "The Half-Blood Prince", tag: "You will not see it coming.", n: 6 },
  { dot: "#F1F5F9", title: "The Deathly Hallows", tag: "The ending you deserve.", n: 7 },
];

const STATS = [
  { num: 7, suffix: "", label: "Books" },
  { num: 8, suffix: "", label: "Films" },
  { num: 1997, suffix: "", label: "First Published" },
  { num: 500, suffix: "M+", label: "Copies Sold" },
  { num: 195, suffix: "", label: "Countries" },
];

// ---------- Hooks ----------
function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ---------- Components ----------
const Particles = () => {
  const particles = Array.from({ length: 30 }).map((_, i) => {
    const colors = ["#447BBE", "#DD5013", "#E9E4A6"];
    return {
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 2,
      color: colors[i % 3],
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
    };
  });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: p.color,
            opacity: 0,
            animation: `hpParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            boxShadow: `0 0 6px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};

const Stat = ({ num, suffix, label }: { num: number; suffix: string; label: string }) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(num * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num]);
  return (
    <div ref={ref} className="text-center">
      <div
        style={{
          fontFamily: '"Luckiest Guy", cursive',
          fontSize: 48,
          lineHeight: 1,
          background: "linear-gradient(135deg, #DD5013, #D97706)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {val}
        {suffix}
      </div>
      <div
        className="mt-2 text-xs tracking-widest uppercase"
        style={{ color: "#E9E4A6", fontFamily: '"DM Sans", sans-serif', opacity: 0.75 }}
      >
        {label}
      </div>
    </div>
  );
};

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const WorldCard = ({ emoji, title, text }: { emoji: string; title: string; text: string }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundColor: hover ? "rgba(68,123,190,0.08)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hover ? "#447BBE" : "rgba(68,123,190,0.15)"}`,
        borderRadius: 16,
        padding: 28,
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover ? "0 12px 32px rgba(68,123,190,0.15)" : "none",
        transition: "all 0.25s ease",
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 12 }}>{emoji}</div>
      <h3
        className="text-[#F1F5F9] mb-2"
        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 800, fontSize: 18 }}
      >
        {title}
      </h3>
      <p
        style={{ color: "#E9E4A6", fontFamily: '"DM Sans", sans-serif', fontSize: 14, lineHeight: 1.7 }}
      >
        {text}
      </p>
    </div>
  );
};

const TimelineEvent = ({
  emoji,
  text,
  side,
  index,
}: {
  emoji: string;
  text: string;
  side: "left" | "right";
  index: number;
}) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const [hover, setHover] = useState(false);
  const delay = (index % 8) * 0.08;
  const translate = inView ? "translateX(0)" : `translateX(${side === "left" ? -40 : 40}px)`;
  return (
    <div
      ref={ref}
      className={`relative md:w-1/2 ${side === "left" ? "md:pr-12 md:self-start" : "md:pl-12 md:self-end md:ml-auto"}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: translate,
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
      }}
    >
      {/* Pulsing dot on center line */}
      <div
        className="hidden md:block absolute top-5"
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "#DD5013",
          [side === "left" ? "right" : "left"]: "-49px",
          animation: "hpPulse 2s infinite",
          boxShadow: "0 0 0 3px #0A0F1A",
        }}
      />
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="flex items-start gap-3"
        style={{
          backgroundColor: hover ? "rgba(221,80,19,0.05)" : "rgba(255,255,255,0.025)",
          border: `1px solid ${hover ? "#DD5013" : "rgba(68,123,190,0.12)"}`,
          borderRadius: 12,
          padding: "16px 20px",
          maxWidth: 380,
          marginLeft: side === "right" ? "auto" : undefined,
          marginRight: side === "left" ? "auto" : undefined,
          transform: hover ? "translateY(-2px)" : "translateY(0)",
          transition: "all 0.2s ease",
        }}
      >
        <span style={{ fontSize: 20, lineHeight: 1.2, marginRight: 4 }}>{emoji}</span>
        <span style={{ color: "#E9E4A6", fontFamily: '"DM Sans", sans-serif', fontSize: 14, lineHeight: 1.6 }}>
          {text}
        </span>
      </div>
    </div>
  );
};

const BookCard = ({ dot, title, tag, n }: { dot: string; title: string; tag: string; n: number }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex flex-col"
      style={{
        backgroundColor: hover ? "rgba(68,123,190,0.08)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hover ? "#447BBE" : "rgba(68,123,190,0.15)"}`,
        borderRadius: 12,
        padding: 20,
        minWidth: 220,
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover ? "0 12px 32px rgba(68,123,190,0.15)" : "none",
        transition: "all 0.25s ease",
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          backgroundColor: dot,
          marginBottom: 14,
          boxShadow: `0 0 12px ${dot}66`,
        }}
      />
      <h3
        className="text-[#F1F5F9] mb-1"
        style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 700, fontSize: 16 }}
      >
        {title}
      </h3>
      <p
        className="italic mb-4"
        style={{ color: "#E9E4A6", fontFamily: '"DM Sans", sans-serif', fontSize: 13, opacity: 0.85 }}
      >
        {tag}
      </p>
      <a
        href={`https://www.amazon.com/s?k=harry+potter+${n}+book`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto font-semibold hover:underline"
        style={{ color: "#DD5013", fontSize: 13 }}
      >
        Find on Amazon →
      </a>
    </div>
  );
};

// ---------- Page ----------
const HarryPotter = () => {
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "#0A0F1A" }}>
      <Helmet>
        <title>Harry Potter World — Zain Adtani</title>
        <meta name="description" content="Seven books. One journey. Every moment that mattered." />
      </Helmet>

      <style>{`
        @keyframes funFloatBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        @keyframes hpParticle {
          0% { opacity: 0; transform: translateY(0); }
          20% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-120px); }
        }
        @keyframes hpPulse {
          0% { box-shadow: 0 0 0 0 rgba(221,80,19,0.5), 0 0 0 3px #0A0F1A; }
          70% { box-shadow: 0 0 0 8px rgba(221,80,19,0), 0 0 0 3px #0A0F1A; }
          100% { box-shadow: 0 0 0 0 rgba(221,80,19,0), 0 0 0 3px #0A0F1A; }
        }
        @keyframes hpChevron {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @keyframes hpFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Atmospheric fog overlays */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(68,123,190,0.08), transparent 50%), radial-gradient(circle at 100% 100%, rgba(221,80,19,0.05), transparent 50%)",
          zIndex: 1,
        }}
      />

      <div className="relative" style={{ zIndex: 2 }}>
        {/* Back button */}
        <div className="container mx-auto px-6 max-w-6xl pt-6 absolute top-0 left-0 right-0" style={{ zIndex: 10 }}>
          <Link to="/" className="font-sans font-medium text-[15px]" style={{ color: "#447BBE" }}>
            ← Back to Home
          </Link>
        </div>

        {/* SECTION 1: HERO */}
        <section className="relative w-full overflow-hidden" style={{ height: "100vh" }}>
          <img
            src={harryPotterImg}
            alt="Harry Potter World"
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
          {/* Layer 1 */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(10,15,26,0.3), rgba(10,15,26,0.95))",
            }}
          />
          {/* Layer 2 */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(68,123,190,0.15), transparent)",
            }}
          />
          {/* Layer 3 */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, transparent 40%, rgba(10,15,26,0.6) 100%)",
            }}
          />
          {/* Layer 4 */}
          <Particles />

          {/* Content */}
          <div
            className="absolute inset-x-0 px-6 text-center"
            style={{ top: "60%", transform: "translateY(-50%)" }}
          >
            <p
              style={{
                color: "#447BBE",
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                letterSpacing: "0.3em",
                fontSize: 12,
                opacity: 0,
                animation: "hpFadeIn 0.6s ease 0.3s forwards",
              }}
            >
              ✦ THE WIZARDING WORLD ✦
            </p>
            <h1
              className="mt-4"
              style={{
                fontFamily: '"Luckiest Guy", cursive',
                color: "#FFFFFF",
                fontSize: "clamp(48px, 8vw, 80px)",
                lineHeight: 1.05,
                textShadow: "0 0 40px rgba(68,123,190,0.6), 0 0 80px rgba(68,123,190,0.3)",
                opacity: 0,
                animation: "hpFadeIn 0.6s ease 0.5s forwards",
              }}
            >
              HARRY POTTER WORLD
            </h1>
            <p
              className="mt-5 max-w-2xl mx-auto italic"
              style={{
                color: "#E9E4A6",
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 20,
                opacity: 0,
                animation: "hpFadeIn 0.6s ease 0.7s forwards",
              }}
            >
              Seven books. One journey. Every moment that mattered.
            </p>
            <div
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
              style={{
                opacity: 0,
                animation: "hpFadeIn 0.6s ease 0.9s forwards",
              }}
            >
              <button
                onClick={() => scrollTo("timeline")}
                className="font-bold text-white transition-transform duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #DD5013, #D97706)",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  padding: "14px 32px",
                  borderRadius: 999,
                  boxShadow: "0 0 24px rgba(221,80,19,0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(221,80,19,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(221,80,19,0.4)";
                }}
              >
                Explore the Timeline →
              </button>
              <button
                onClick={() => scrollTo("books")}
                className="font-semibold transition-colors duration-200"
                style={{
                  border: "2px solid #447BBE",
                  color: "#447BBE",
                  background: "transparent",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  padding: "12px 30px",
                  borderRadius: 999,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#447BBE";
                  (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#447BBE";
                }}
              >
                Find the Books →
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={() => scrollTo("stats")}
            aria-label="Scroll down"
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
            style={{
              bottom: 28,
              color: "#E9E4A6",
              fontSize: 28,
              background: "transparent",
              border: "none",
              animation: "hpChevron 1.6s ease-in-out infinite",
            }}
          >
            ↓
          </button>
        </section>

        {/* SECTION 2: STATS BAR */}
        <section
          id="stats"
          className="w-full"
          style={{
            backgroundColor: "rgba(68,123,190,0.06)",
            borderTop: "1px solid rgba(68,123,190,0.15)",
            borderBottom: "1px solid rgba(68,123,190,0.15)",
            padding: "40px 24px",
          }}
        >
          <div className="container mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {STATS.map((s) => (
              <Stat key={s.label} num={s.num} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </section>

        {/* SECTION 3: THE WORLD */}
        <section id="world" className="py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <FadeUp>
              <p
                className="text-center text-xs uppercase font-semibold"
                style={{
                  color: "#447BBE",
                  letterSpacing: "0.2em",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                }}
              >
                The Wizarding World
              </p>
              <h2
                className="text-center mt-3 text-[#F1F5F9]"
                style={{ fontFamily: '"Luckiest Guy", cursive', fontSize: "clamp(32px, 5vw, 48px)" }}
              >
                Before the Timeline. The World Itself.
              </h2>
            </FadeUp>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {WORLD_CARDS.map((c, i) => (
                <FadeUp key={c.title} delay={i * 0.05}>
                  <WorldCard {...c} />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: TIMELINE */}
        <section id="timeline" className="py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <FadeUp>
              <p
                className="text-center text-xs uppercase font-semibold"
                style={{
                  color: "#DD5013",
                  letterSpacing: "0.2em",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                }}
              >
                The Complete Story
              </p>
              <h2
                className="text-center mt-3 text-[#F1F5F9]"
                style={{ fontFamily: '"Luckiest Guy", cursive', fontSize: "clamp(32px, 5vw, 48px)" }}
              >
                Every Moment. In Order.
              </h2>
            </FadeUp>

            <div className="mt-16 relative">
              {/* Center line */}
              <div
                className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
                style={{ width: 2, backgroundColor: "rgba(68,123,190,0.4)" }}
              />
              <div className="flex flex-col gap-8">
                {BOOKS.map((book, bi) => {
                  let evIdx = 0;
                  return (
                    <div key={book.label} className="flex flex-col gap-6">
                      {/* Book header */}
                      <FadeUp>
                        <div className="flex justify-center relative" style={{ zIndex: 2 }}>
                          <div
                            style={{
                              backgroundColor: "#0A0F1A",
                              border: "1px solid #447BBE",
                              borderRadius: 999,
                              padding: "8px 24px",
                              color: "#447BBE",
                              fontFamily: '"Plus Jakarta Sans", sans-serif',
                              fontWeight: 700,
                              fontSize: 12,
                              letterSpacing: "0.15em",
                            }}
                          >
                            {book.label}
                          </div>
                        </div>
                      </FadeUp>
                      {/* Events */}
                      <div className="flex flex-col gap-6">
                        {book.events.map((e, i) => {
                          const globalIdx = bi * 100 + evIdx++;
                          const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
                          return (
                            <TimelineEvent
                              key={`${book.label}-${i}`}
                              emoji={e.emoji}
                              text={e.text}
                              side={side}
                              index={globalIdx}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: BOOKS */}
        <section
          id="books"
          className="py-20"
          style={{
            backgroundColor: "rgba(221,80,19,0.03)",
            borderTop: "1px solid rgba(221,80,19,0.1)",
          }}
        >
          <div className="container mx-auto px-6 max-w-6xl">
            <FadeUp>
              <p
                className="text-center text-xs uppercase font-semibold"
                style={{
                  color: "#DD5013",
                  letterSpacing: "0.2em",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                }}
              >
                Read the Series
              </p>
              <h2
                className="text-center mt-3 text-[#F1F5F9]"
                style={{ fontFamily: '"Luckiest Guy", cursive', fontSize: "clamp(32px, 5vw, 48px)" }}
              >
                Start at Book One. Don't Skip.
              </h2>
            </FadeUp>

            <div className="mt-12">
              {/* Horizontal scroll on mobile, grid on desktop */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
                {BOOK_CARDS.map((b) => (
                  <BookCard key={b.title} {...b} />
                ))}
              </div>
              <div className="md:hidden flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x">
                {BOOK_CARDS.map((b) => (
                  <div key={b.title} className="snap-start shrink-0 w-[260px]">
                    <BookCard {...b} />
                  </div>
                ))}
              </div>
            </div>

            <FadeUp delay={0.1}>
              <div className="mt-12 flex flex-col items-center gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href="https://www.amazon.com/s?k=harry+potter+complete+box+set"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white transition-transform duration-200 hover:scale-105"
                    style={{
                      backgroundColor: "#DD5013",
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      padding: "14px 32px",
                      borderRadius: 999,
                    }}
                  >
                    Get the Full Box Set →
                  </a>
                  <a
                    href="https://www.audible.com/search?keywords=harry+potter+jim+dale"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold transition-colors duration-200"
                    style={{
                      border: "2px solid #447BBE",
                      color: "#447BBE",
                      padding: "12px 30px",
                      borderRadius: 999,
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#447BBE";
                      (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "#447BBE";
                    }}
                  >
                    Listen on Audible →
                  </a>
                </div>
                <p
                  className="italic text-sm"
                  style={{ color: "rgba(233,228,166,0.5)", fontFamily: '"DM Sans", sans-serif' }}
                >
                  Jim Dale's narration. Unmatched.
                </p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* SECTION 6: CLOSING QUOTE */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-4xl text-center relative">
            <span
              aria-hidden
              className="absolute select-none pointer-events-none"
              style={{
                top: -40,
                left: 0,
                color: "rgba(68,123,190,0.15)",
                fontSize: 200,
                lineHeight: 1,
                fontFamily: 'Georgia, serif',
                zIndex: 0,
              }}
            >
              &ldquo;
            </span>
            <FadeUp>
              <p
                className="italic relative"
                style={{
                  color: "#E9E4A6",
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: "clamp(20px, 3vw, 28px)",
                  lineHeight: 1.5,
                  zIndex: 1,
                }}
              >
                "It is our choices that show what we truly are, far more than our abilities."
              </p>
              <p
                className="mt-4 text-sm relative"
                style={{ color: "rgba(233,228,166,0.5)", zIndex: 1 }}
              >
                — Albus Dumbledore
              </p>
            </FadeUp>
          </div>
        </section>
      </div>

      {/* Floating snitch */}
      <div
        className="fixed"
        style={{ bottom: 100, right: 24, zIndex: 50 }}
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
      >
        {showTip && (
          <div
            className="absolute left-1/2 -translate-x-1/2 -top-10 whitespace-nowrap rounded-full text-white text-xs font-semibold"
            style={{ backgroundColor: "#DD5013", padding: "6px 12px" }}
          >
            I open at the close
          </div>
        )}
        <div
          className="cursor-pointer transition-transform duration-200 hover:scale-[1.3]"
          style={{
            fontSize: 48,
            lineHeight: 1,
            animation: "funFloatBounce 1.5s ease-in-out infinite",
          }}
          aria-label="Golden snitch"
        >
          ✨
        </div>
      </div>
    </div>
  );
};

export default HarryPotter;
