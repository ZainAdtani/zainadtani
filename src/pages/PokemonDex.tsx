import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import pokemonImg from "@/assets/pokemon-pokedex.png";

const FUN_FACTS = [
  { emoji: "⚡", text: "Pikachu was almost cut from the original game. Game Freak nearly axed him before release." },
  { emoji: "🔴", text: "Pokémon Red and Blue were nearly called Capsule Monsters. Nintendo said no." },
  { emoji: "🎮", text: "The original 151 were designed by one person. Ken Sugimori drew every single one by hand." },
  { emoji: "💤", text: "Snorlax weighs 1,014 lbs. He sleeps 20 hours a day. Honestly relatable." },
  { emoji: "🐉", text: "Dragonite can fly around the entire globe in 16 hours. That's 1,556 mph." },
  { emoji: "👁️", text: "Gengar is actually the shadow of Clefable. It's been a fan theory since Gen I." },
];

const FactCard = ({ emoji, text, index }: { emoji: string; text: string; index: number }) => {
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
  const delay = `${index * 0.1}s`;
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="text-center"
      style={{
        backgroundColor: hover ? "rgba(221,80,19,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hover ? "#DD5013" : "rgba(68,123,190,0.15)"}`,
        borderRadius: 12,
        padding: 20,
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? (hover ? -2 : 0) : 20}px)`,
        transition: `opacity 0.4s ease ${delay}, transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease`,
      }}
    >
      <div style={{ fontSize: 32, lineHeight: 1.2, marginBottom: 12 }}>{emoji}</div>
      <p className="text-sm leading-relaxed" style={{ color: "#E9E4A6", fontFamily: '"DM Sans", sans-serif' }}>
        {text}
      </p>
    </div>
  );
};

const PokemonDex = () => {
  const [showTip, setShowTip] = useState(false);
  const [showPikaTip, setShowPikaTip] = useState(false);
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0F1A" }}>
      <Helmet>
        <title>Zain's Notion Pokédex — Zain Adtani</title>
        <meta name="description" content="All 151 original Pokémon. Built in Notion." />
      </Helmet>

      <style>{`
        @keyframes funFloatBounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
        @keyframes pikaBounce { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes pikaFadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* Back button */}
      <div className="container mx-auto px-6 max-w-6xl pt-6">
        <Link to="/" className="font-sans font-medium text-[15px]" style={{ color: "#447BBE" }}>
          ← Back to Home
        </Link>
      </div>

      {/* Hero */}
      <section className="relative w-full h-[360px] md:h-[480px] overflow-hidden mt-4">
        <img src={pokemonImg} alt="Pokemon" className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 text-center">
          <h1 className="text-[#F1F5F9] text-4xl md:text-6xl" style={{ fontFamily: '"Luckiest Guy", cursive' }}>
            Zain's Notion Pokédex
          </h1>
          <p className="mt-3 font-sans text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#E9E4A6" }}>
            All 151 original Pokémon. Every stat, type, height, weight, HP. Built in Notion.
          </p>
        </div>
      </section>

      {/* Stat cards + CTA */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20">
            {[
              { number: "151", label: "Original Pokémon" },
              { number: "6", label: "Filter Views" },
              { number: "Gen I", label: "Complete Catalog" },
              { number: "Free", label: "Always Open" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(68,123,190,0.2)",
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <div
                  className="text-[48px] leading-none mb-2"
                  style={{ fontFamily: '"Luckiest Guy", cursive', color: "#DD5013" }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "#E9E4A6", fontFamily: '"DM Sans", sans-serif' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "#E9E4A6" }}>
              Built entirely in Notion. Every stat filterable by type, height, weight, HP, and attack power. This is what happens when a mechanical engineer has too much free time.
            </p>
            <a
              href="https://zainadtani.notion.site/Zain-s-Notion-Pok-dex-3d1da8f06b194c24a7aeb9f54aa43294"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-bold text-white text-lg transition-transform duration-200 hover:scale-[1.04]"
              style={{
                background: "linear-gradient(135deg, #DD5013, #D97706)",
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                padding: "18px 48px",
                borderRadius: 8,
                boxShadow: "0 0 24px rgba(221,80,19,0.35)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(221,80,19,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(221,80,19,0.35)";
              }}
            >
              Open the Full Pokédex →
            </a>
            <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Opens in Notion. Free to explore.
            </p>
          </div>

          {/* Fun Facts */}
          <div className="mt-20 md:mt-24">
            <p
              className="text-center text-xs tracking-widest uppercase font-bold mb-8"
              style={{ color: "#447BBE", fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Fun Facts You Didn't Ask For
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
              {FUN_FACTS.map((f, i) => (
                <FactCard key={i} emoji={f.emoji} text={f.text} index={i} />
              ))}
            </div>
            <p
              className="text-center text-sm italic mt-10"
              style={{ color: "rgba(233,228,166,0.4)", fontFamily: '"DM Sans", sans-serif' }}
            >
              More facts dropping soon. Come back. You know you want to. 👀
            </p>
          </div>
        </div>
      </section>

      {/* Bouncing Pikachu sprite above chat bubble */}
      <div
        className="fixed"
        style={{ bottom: 80, right: 16, zIndex: 49 }}
        onMouseEnter={() => setShowPikaTip(true)}
        onMouseLeave={() => setShowPikaTip(false)}
      >
        {showPikaTip && (
          <div
            className="absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap rounded-full text-white text-xs font-semibold"
            style={{
              backgroundColor: "#DD5013",
              padding: "6px 12px",
              animation: "pikaFadeIn 0.15s ease-out",
            }}
          >
            Pika pika! ⚡
          </div>
        )}
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/25.gif"
          alt="Pikachu"
          className="cursor-pointer"
          style={{
            width: 56,
            height: "auto",
            imageRendering: "pixelated",
            animation: "pikaBounce 1s ease-in-out infinite",
            transition: "transform 0.2s ease",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.4)";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
        />
      </div>

      {/* Floating Pikachu */}
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
            Gotta catch em all!
          </div>
        )}
        <div
          className="cursor-pointer transition-transform duration-200 hover:scale-[1.3]"
          style={{
            fontSize: 48,
            lineHeight: 1,
            animation: "funFloatBounce 1.5s ease-in-out infinite",
          }}
          aria-label="Pikachu"
        >
          ⚡
        </div>
      </div>
    </div>
  );
};

export default PokemonDex;
