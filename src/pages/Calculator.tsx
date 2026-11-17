import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";

const CALCULATOR_URL = "https://zainadtani.github.io/missed-call-calculator/";

/** The calculator switches to its two column layout at 720px of its own width. */
const TWO_COLUMN_AT = 720;
/** Measured content heights, with a little slack so nothing scrolls inside the frame. */
const TALL_HEIGHT = 2280;
const WIDE_HEIGHT = 1420;

/**
 * Keeps the frame exactly as tall as the calculator needs at the width it
 * actually got, so the whole tool shows without inner scrolling.
 */
function useCalculatorHeight() {
  const bandRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(TALL_HEIGHT);

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;

    const apply = () => {
      setHeight(band.clientWidth >= TWO_COLUMN_AT ? WIDE_HEIGHT : TALL_HEIGHT);
    };

    apply();

    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(apply);
    observer.observe(band);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.add("hide-floating-controls");
    return () => document.body.classList.remove("hide-floating-controls");
  }, []);

  return { bandRef, height };
}

const Calculator = () => {
  const { bandRef, height } = useCalculatorHeight();

  return (
    <div className="min-h-screen bg-white text-[#0A0F1A]">
      <Helmet>
        <title>Missed Call Money Calculator | Zain Adtani</title>
        <meta
          name="description"
          content="See what missed calls could be costing your business. Free, takes about a minute. From Zain Adtani."
        />
        <link rel="canonical" href="https://zainadtani.com/calculator" />
        <meta
          property="og:title"
          content="Missed Call Money Calculator | Zain Adtani"
        />
        <meta
          property="og:description"
          content="See what missed calls could be costing your business. Free, takes about a minute."
        />
        <meta property="og:url" content="https://zainadtani.com/calculator" />
      </Helmet>

      <section className="hero-warm border-b border-[#0A0F1A]/10">
        <div className="mx-auto max-w-4xl px-6 py-14 text-center md:py-20">
          <h1
            className="text-[#0A0F1A] text-[38px] md:text-[58px] leading-[1.05]"
            style={{ fontFamily: "'Luckiest Guy', cursive", letterSpacing: "0.02em" }}
          >
            Missed Call Money Calculator
          </h1>
          <p className="mt-4 font-sans text-[18px] md:text-[20px] text-[#0A0F1A]/75">
            See what missed calls could be costing your business. Free, takes
            about a minute.
          </p>
        </div>
      </section>

      <section ref={bandRef} aria-label="Missed Call Money Calculator" className="w-full">
        <iframe
          title="Missed Call Money Calculator"
          src={CALCULATOR_URL}
          className="block w-full border-0 bg-[#F3F7FB]"
          style={{ height }}
          loading="eager"
        />
      </section>
    </div>
  );
};

export default Calculator;
