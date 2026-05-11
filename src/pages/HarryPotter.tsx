import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import harryPotterImg from "@/assets/harry-potter-world.png";

const HarryPotter = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Harry Potter World — Zain Adtani</title>
        <meta name="description" content="A Hogwarts-themed hub. Books, audiobooks, lore, and key story moments." />
      </Helmet>

      {/* Hero banner */}
      <section className="relative w-full h-[360px] md:h-[480px] overflow-hidden">
        <img src={harryPotterImg} alt="Harry Potter World" className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 text-center">
          <h1
            className="text-[#F1F5F9] text-4xl md:text-6xl"
            style={{ fontFamily: '"Luckiest Guy", cursive' }}
          >
            Harry Potter World
          </h1>
          <p className="mt-3 font-sans text-[#E9E4A6] text-base md:text-lg max-w-2xl mx-auto">
            A Hogwarts-themed hub. Books, audiobooks, lore, and key story moments.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <p className="font-sans text-base md:text-lg" style={{ color: "#E9E4A6" }}>
            This world is under construction. More magic coming soon.
          </p>

          <div className="mt-10">
            <Link to="/" className="font-sans font-medium text-[15px]" style={{ color: "#447BBE" }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HarryPotter;
