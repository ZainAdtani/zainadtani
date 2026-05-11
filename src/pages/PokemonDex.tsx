import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import pokemonImg from "@/assets/pokemon-pokedex.png";

const PokemonDex = () => {
  const [showTip, setShowTip] = useState(false);
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0F1A" }}>
      <Helmet>
        <title>Zain's Notion Pokédex — Zain Adtani</title>
        <meta name="description" content="All 151 original Pokémon. Built in Notion." />
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

      {/* Notion embed */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div style={{ borderRadius: 12, overflow: "hidden" }}>
            <iframe
              src="https://zainadtani.notion.site/Zain-s-Notion-Pok-dex-3d1da8f06b194c24a7aeb9f54aa43294"
              width="100%"
              height="800px"
              frameBorder={0}
              title="Zain's Notion Pokédex"
              style={{ display: "block", border: 0 }}
            />
          </div>
        </div>
      </section>

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
