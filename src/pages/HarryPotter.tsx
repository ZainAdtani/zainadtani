import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import harryPotterImg from "@/assets/harry-potter-world.png";

type Event = { emoji: string; text: string };
type Book = { label: string; events: Event[] };

const BOOKS: Book[] = [
  {
    label: "BOOK 1 — THE PHILOSOPHER'S STONE",
    events: [
      { emoji: "🔮", text: "Harry discovers he is a wizard" },
      { emoji: "🦉", text: "First letter from Hogwarts" },
      { emoji: "🚂", text: "The Hogwarts Express, Platform 9¾" },
      { emoji: "🧙", text: "Sorting Hat ceremony" },
      { emoji: "⚡", text: "First flying lesson, natural Seeker" },
      { emoji: "🪞", text: "The Mirror of Erised" },
      { emoji: "🐉", text: "Norbert the dragon" },
      { emoji: "🏆", text: "Quirrell and the Stone — Harry survives" },
    ],
  },
  {
    label: "BOOK 2 — THE CHAMBER OF SECRETS",
    events: [
      { emoji: "🚗", text: "Flying Ford Anglia to Hogwarts" },
      { emoji: "👻", text: "Nearly Headless Nick's deathday party" },
      { emoji: "🐍", text: "Harry speaks Parseltongue, school turns on him" },
      { emoji: "📖", text: "Tom Riddle's diary" },
      { emoji: "🕷️", text: "Following the spiders to Aragog" },
      { emoji: "🗡️", text: "Harry pulls the sword from the hat" },
      { emoji: "💀", text: "The Basilisk — Harry defeats it and saves Ginny" },
    ],
  },
  {
    label: "BOOK 3 — THE PRISONER OF AZKABAN",
    events: [
      { emoji: "🐺", text: "Remus Lupin joins as Defense teacher" },
      { emoji: "⏰", text: "The time turner" },
      { emoji: "🦌", text: "Expecto Patronum — Harry's first Patronus" },
      { emoji: "🗺️", text: "The Marauder's Map revealed" },
      { emoji: "🔮", text: "Trelawney's real prophecy" },
      { emoji: "🐀", text: "Scabbers revealed as Peter Pettigrew" },
      { emoji: "⏪", text: "Harry and Hermione go back in time" },
    ],
  },
  {
    label: "BOOK 4 — THE GOBLET OF FIRE",
    events: [
      { emoji: "🏆", text: "The Triwizard Tournament begins" },
      { emoji: "🐲", text: "First task — Hungarian Horntail" },
      { emoji: "🌊", text: "Second task — Gillyweed, underwater" },
      { emoji: "🧩", text: "Third task — the maze" },
      { emoji: "💀", text: "Voldemort returns. Cedric dies." },
      { emoji: "🩸", text: '"Kill the spare."' },
    ],
  },
  {
    label: "BOOK 5 — THE ORDER OF THE PHOENIX",
    events: [
      { emoji: "🏠", text: "Grimmauld Place and the Order" },
      { emoji: "📜", text: "Umbridge takes over Hogwarts" },
      { emoji: "✊", text: "Dumbledore's Army formed" },
      { emoji: "🔮", text: "The prophecy in the Department of Mysteries" },
      { emoji: "💔", text: "Sirius falls through the veil" },
    ],
  },
  {
    label: "BOOK 6 — THE HALF-BLOOD PRINCE",
    events: [
      { emoji: "🖊️", text: "The Prince's annotated potions book" },
      { emoji: "💊", text: "Felix Felicis — liquid luck" },
      { emoji: "🖤", text: "Snape's secrets deepen" },
      { emoji: "⚡", text: "Dumbledore and Harry hunt Horcruxes" },
      { emoji: "🏰", text: "The Astronomy Tower" },
      { emoji: "💀", text: '"Severus... please."' },
      { emoji: "🪄", text: "Snape kills Dumbledore" },
    ],
  },
  {
    label: "BOOK 7 — THE DEATHLY HALLOWS",
    events: [
      { emoji: "🔺", text: "The Deathly Hallows symbol appears" },
      { emoji: "💒", text: "Bill and Fleur's wedding, Death Eaters arrive" },
      { emoji: "🏕️", text: "Months on the run" },
      { emoji: "🐍", text: "Nagini, Bathilda Bagshot" },
      { emoji: "🦌", text: "The silver doe in the forest" },
      { emoji: "💀", text: 'Dobby dies. "Here lies a free elf."' },
      { emoji: "🏦", text: "Gringotts break-in, dragon escape" },
      { emoji: "🏰", text: "The Battle of Hogwarts begins" },
      { emoji: "📖", text: 'Snape\'s memories — "Always."' },
      { emoji: "🫀", text: "Harry walks to his death" },
      { emoji: "👴", text: '"All was well."' },
    ],
  },
];

type FlatItem =
  | { kind: "book"; label: string; index: number }
  | { kind: "event"; emoji: string; text: string; index: number };

const flatItems: FlatItem[] = (() => {
  const items: FlatItem[] = [];
  let i = 0;
  for (const b of BOOKS) {
    items.push({ kind: "book", label: b.label, index: i++ });
    for (const e of b.events) {
      items.push({ kind: "event", emoji: e.emoji, text: e.text, index: i++ });
    }
  }
  return items;
})();

const TimelineCard = ({ item, side }: { item: FlatItem; side: "left" | "right" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delay = `${(item.index % 8) * 0.1}s`;

  return (
    <div
      ref={ref}
      className={`relative md:w-1/2 ${side === "left" ? "md:pr-10 md:self-start md:text-right" : "md:pl-10 md:self-end md:ml-auto md:text-left"}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.4s ease ${delay}, transform 0.4s ease ${delay}`,
      }}
    >
      {/* Dot on center line */}
      <div
        className="hidden md:block absolute top-6 w-3 h-3 rounded-full"
        style={{
          backgroundColor: "#DD5013",
          [side === "left" ? "right" : "left"]: "-41px",
          boxShadow: "0 0 0 3px #0A0F1A",
        }}
      />
      {item.kind === "book" ? (
        <div
          className="font-bold text-sm tracking-wide mb-3"
          style={{ color: "#447BBE", fontFamily: '"Plus Jakarta Sans", sans-serif' }}
        >
          {item.label}
        </div>
      ) : (
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            backgroundColor: hover ? "rgba(68,123,190,0.08)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${hover ? "#447BBE" : "rgba(68,123,190,0.15)"}`,
            borderRadius: 12,
            padding: "20px 24px",
            transform: hover ? "translateY(-2px)" : "translateY(0)",
            transition: "all 0.2s ease",
          }}
          className="flex items-start gap-3"
        >
          <span style={{ fontSize: 24, lineHeight: 1.2 }}>{item.emoji}</span>
          <span
            className="text-[15px] leading-relaxed text-left"
            style={{ color: "#E9E4A6", fontFamily: '"DM Sans", sans-serif' }}
          >
            {item.text}
          </span>
        </div>
      )}
    </div>
  );
};

const HarryPotter = () => {
  const [showTip, setShowTip] = useState(false);

  const closingCards = [
    {
      title: "Read the Series",
      text: "Start with The Philosopher's Stone. Don't skip. Don't jump ahead.",
      linkText: "Find on Amazon →",
      href: "https://www.amazon.com/s?k=harry+potter+books+set",
    },
    {
      title: "Listen to the Series",
      text: "Jim Dale's narration is unmatched. Every voice, every world.",
      linkText: "Find on Audible →",
      href: "https://www.audible.com/search?keywords=harry+potter",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0F1A" }}>
      <Helmet>
        <title>Harry Potter World — Zain Adtani</title>
        <meta name="description" content="Seven books. One journey. Every moment that mattered." />
      </Helmet>

      <style>{`@keyframes funFloatBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }`}</style>

      {/* Back button */}
      <div className="container mx-auto px-6 max-w-6xl pt-6">
        <Link to="/" className="font-sans font-medium text-[15px]" style={{ color: "#447BBE" }}>
          ← Back to Home
        </Link>
      </div>

      {/* Hero */}
      <section className="relative w-full h-[360px] md:h-[480px] overflow-hidden mt-4">
        <img src={harryPotterImg} alt="Harry Potter World" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/60 to-[#0A0F1A]/40" />
        <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 text-center">
          <h1 className="text-[#F1F5F9] text-4xl md:text-6xl" style={{ fontFamily: '"Luckiest Guy", cursive' }}>
            Harry Potter World
          </h1>
          <p className="mt-3 font-sans text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#E9E4A6" }}>
            A Hogwarts-themed hub. Books, audiobooks, lore, and key story moments.
          </p>
        </div>
      </section>

      {/* Section 1: Intro bar */}
      <section
        className="w-full text-center"
        style={{ backgroundColor: "rgba(68,123,190,0.06)", padding: "32px 24px" }}
      >
        <p
          className="italic text-base md:text-lg"
          style={{ color: "#E9E4A6", fontFamily: '"Plus Jakarta Sans", sans-serif' }}
        >
          Seven books. One journey. Every moment that mattered.
        </p>
      </section>

      {/* Section 2: Timeline */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-5xl relative">
          {/* Center line */}
          <div
            className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2"
            style={{ width: 2, backgroundColor: "#447BBE" }}
          />
          <div className="flex flex-col gap-6 md:gap-8">
            {flatItems.map((item, idx) => (
              <TimelineCard
                key={`${item.kind}-${idx}`}
                item={item}
                side={idx % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Closing */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <p
            className="italic text-xl md:text-2xl leading-relaxed"
            style={{ color: "#E9E4A6", fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            "It is our choices that show what we truly are, far more than our abilities."
          </p>
          <p className="mt-3 text-sm" style={{ color: "rgba(233,228,166,0.5)" }}>
            — Albus Dumbledore
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {closingCards.map((c) => (
              <div
                key={c.title}
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(68,123,190,0.2)",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <h3 className="font-bold text-xl text-[#F1F5F9] mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  {c.title}
                </h3>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#E9E4A6" }}>
                  {c.text}
                </p>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[15px] hover:underline"
                  style={{ color: "#DD5013" }}
                >
                  {c.linkText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

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
