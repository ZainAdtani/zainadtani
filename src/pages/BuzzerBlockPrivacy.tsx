import { Helmet } from "react-helmet-async";

const CONTACT_EMAIL = "zkadtani@gmail.com";

const paragraphClass = "mt-5 font-sans text-[16px] text-[#0A0F1A]/85 leading-[1.8]";

const BuzzerBlockPrivacy = () => {
  return (
    <div className="min-h-screen bg-white text-[#0A0F1A]">
      <Helmet>
        <title>BuzzerBlock Privacy Policy | Adtani Education Ventures</title>
        <meta
          name="description"
          content="BuzzerBlock does not collect, store, or share personal information."
        />
        <link rel="canonical" href="https://zainadtani.com/buzzerblock-privacy" />
      </Helmet>

      <div className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        <p className="font-sans text-[12px] font-semibold tracking-[0.18em] uppercase text-[#2F5C90]">
          Privacy Policy
        </p>

        <h1 className="mt-3 text-[40px] md:text-[58px] leading-[1.05] tracking-[0.01em] text-[#0A0F1A]">
          BuzzerBlock Privacy Policy
        </h1>

        <div className="mt-8 h-px w-full bg-[#0A0F1A]/10" />

        <p className={paragraphClass}>
          BuzzerBlock does not collect, store, or share personal information.
          The extension has no accounts, no ads, and no tracking.
        </p>

        <p className={paragraphClass}>
          Your settings, like favorite teams and alert choices, and the cached
          scores are stored only on your own device in Chrome storage and are
          never sent to us.
        </p>

        <p className={paragraphClass}>
          To show live scores, the extension reads ESPN's public score feed.
          Scores can run a minute or so behind live TV.
        </p>

        <p className={paragraphClass}>
          BuzzerBlock is not affiliated with the NBA or ESPN.
        </p>

        <p className={paragraphClass}>
          Questions:{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[#447BBE] underline underline-offset-2 hover:text-[#2F5C90]"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>

        <p className="mt-8 font-sans text-[14px] text-[#0A0F1A]/60">
          Updated November 2, 2026.
        </p>
      </div>
    </div>
  );
};

export default BuzzerBlockPrivacy;
