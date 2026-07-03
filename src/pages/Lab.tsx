import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import pokemonImg from "@/assets/pokemon-pokedex.png";
import harryPotterImg from "@/assets/harry-potter-world.png";

const PROJECTS = [
  {
    title: "Zain's Notion Pokédex",
    description:
      "All 151 original Pokémon. Every stat, type, height, weight, and HP. Filterable and built entirely in Notion.",
    image: pokemonImg,
    href: "/pokedex",
    cta: "Open the Pokédex →",
    badge: "151 Pokémon",
    badgeBg: "#DD5013",
  },
  {
    title: "Harry Potter World",
    description:
      "A Hogwarts-themed hub built in Notion. Books, audiobooks, key story moments, and lore. For the obsessed.",
    image: harryPotterImg,
    href: "/harry-potter",
    cta: "Enter the Wizarding World →",
    badge: "Hogwarts Built",
    badgeBg: "#447BBE",
  },
];

const Lab = () => {
  return (
    <div className="min-h-screen bg-[#0F1D2E]">
      <Helmet>
        <title>The Lab — Just For Fun | Zain Adtani</title>
        <meta
          name="description"
          content="Pokémon, Harry Potter, and other side projects Zain built for fun in Notion."
        />
      </Helmet>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-[#447BBE] text-center">
            THE LAB · JUST FOR FUN
          </p>
          <h1 className="font-display font-extrabold text-[40px] md:text-[56px] leading-[1.1] text-[#447BBE] text-center mt-3">
            Not everything has to make money.
          </h1>
          <p className="font-sans text-[16px] text-white/80 text-center mt-4 max-w-2xl mx-auto">
            Sometimes I build things because they're cool. Pokémon. Harry Potter. More coming.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {PROJECTS.map((p) => (
              <div
                key={p.title}
                className="rounded-xl overflow-hidden bg-[#0F1D2E] border border-[#1E3A5F] flex flex-col transition-all duration-200 hover:-translate-y-1 hover:border-[#447BBE]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                  <span
                    className="absolute top-3 left-3 rounded-full text-white text-xs font-semibold px-3 py-1.5"
                    style={{ backgroundColor: p.badgeBg }}
                  >
                    {p.badge}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h3 className="font-sans font-bold text-xl text-white">{p.title}</h3>
                  <p className="text-sm text-[#E9E4A6] flex-1">{p.description}</p>
                  <Link
                    to={p.href}
                    className="mt-2 inline-flex items-center justify-center w-full bg-[#DD5013] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {p.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lab;
