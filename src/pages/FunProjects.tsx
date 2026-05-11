import { Helmet } from "react-helmet-async";
import pokemonImg from "@/assets/pokemon-pokedex.png";
import harryPotterImg from "@/assets/harry-potter-world.png";

interface FunProject {
  title: string;
  description: string;
  image: string;
  href: string;
  buttonText: string;
  badgeText: string;
  badgeBg: string;
}

export const FUN_PROJECTS: FunProject[] = [
  {
    title: "Zain's Notion Pokédex",
    description:
      "All 151 original Pokemon. Every stat, type, height, weight, and HP. Filterable by number, weight, height, type, and attack. Built entirely in Notion. Yes, I made this.",
    image: pokemonImg,
    href: "https://zainadtani.notion.site/Zain-s-Notion-Pok-dex-3d1da8f06b194c24a7aeb9f54aa43294",
    buttonText: "Open the Pokédex →",
    badgeText: "151 Pokémon",
    badgeBg: "#DD5013",
  },
  {
    title: "Harry Potter World",
    description:
      "A Hogwarts-themed hub built in Notion. Books, audiobooks, key story moments, and lore. For the obsessed.",
    image: harryPotterImg,
    href: "#",
    buttonText: "Enter the Wizarding World →",
    badgeText: "Hogwarts Built",
    badgeBg: "#447BBE",
  },
];

export function FunProjectCard({ project }: { project: FunProject }) {
  return (
    <div
      className="rounded-xl overflow-hidden bg-[#0F2340] border border-[#1E3A5F] flex flex-col transition-all duration-200 ease-out hover:-translate-y-1"
      style={{ transitionProperty: "transform, box-shadow" }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.3)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
        <span
          className="absolute top-3 left-3 rounded-full text-white text-xs font-semibold"
          style={{ backgroundColor: project.badgeBg, padding: "8px 14px" }}
        >
          {project.badgeText}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent pointer-events-none" />
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="font-sans font-bold text-xl text-white">{project.title}</h3>
        <p className="text-sm text-[#E9E4A6] flex-1">{project.description}</p>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center justify-center w-full bg-[#DD5013] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          {project.buttonText}
        </a>
      </div>
    </div>
  );
}

const FunProjects = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Fun Projects — Zain Adtani</title>
        <meta name="description" content="Side projects, experiments, and fun builds." />
      </Helmet>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="font-display text-5xl md:text-6xl text-foreground">Fun Projects</h1>
            <p className="mt-4 text-muted-foreground text-base md:text-lg">
              Side projects, experiments, and fun builds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FUN_PROJECTS.map((p) => (
              <FunProjectCard key={p.title} project={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FunProjects;
