import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import harryPotterImg from "@/assets/harry-potter-world.png";

const BOOKS = [
  "The Philosopher's Stone",
  "The Chamber of Secrets",
  "The Prisoner of Azkaban",
  "The Goblet of Fire",
  "The Order of the Phoenix",
  "The Half-Blood Prince",
  "The Deathly Hallows",
];

const MOMENTS: { emoji: string; text: string }[] = [
  { emoji: "⚡", text: '"You\'re a wizard, Harry."' },
  { emoji: "🪄", text: "The first Quidditch match" },
  { emoji: "💀", text: "Dumbledore's death" },
  { emoji: "🐍", text: "The final battle" },
  { emoji: "❤️", text: '"Always."' },
];

const cardStyle: React.CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(68,123,190,0.15)",
  borderLeft: "3px solid #447BBE",
  borderRadius: 12,
  padding: 24,
};

const HarryPotter = () => {
  const [showTip, setShowTip] = useState(false);
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0F1A" }}>
      <Helmet>
        <title>Harry Potter World — Zain Adtani</title>
        <meta name="description" content="A Hogwarts-themed hub. Books, audiobooks, lore, and key story moments." />
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

      {/* Two cards */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <div style={cardStyle}>
            <h2 className="font-display font-bold text-2xl text-[#F1F5F9]">The Books</h2>
            <ul className="mt-4 space-y-3">
              {BOOKS.map((b) => (
                <li key={b} className="font-sans text-[15px]" style={{ color: "#E9E4A6" }}>
                  📖 {b}
                </li>
              ))}
            </ul>
          </div>
          <div style={cardStyle}>
            <h2 className="font-display font-bold text-2xl text-[#F1F5F9]">Moments That Hit Different</h2>
            <ul className="mt-4 space-y-3">
              {MOMENTS.map((m) => (
                <li key={m.text} className="font-sans text-[15px]" style={{ color: "#E9E4A6" }}>
                  {m.emoji} {m.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center font-sans text-[13px] mt-10" style={{ color: "#E9E4A6", opacity: 0.7 }}>
          More magic being added. Check back soon.
        </p>
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
