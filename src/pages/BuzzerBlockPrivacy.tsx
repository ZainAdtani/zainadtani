import { Helmet } from "react-helmet-async";

const CONTACT_ADDRESS = "1909 Central Drive, Suite 201, Bedford, TX 76021";
const CONTACT_EMAIL = "zkadtani@gmail.com";

type SectionProps = {
  heading: string;
  children: React.ReactNode;
};

function Section({ heading, children }: SectionProps) {
  return (
    <section className="mt-10">
      <h2 className="text-[26px] leading-tight tracking-[0.01em] text-[#0A0F1A]">
        {heading}
      </h2>

      <div className="mt-2.5 font-sans text-[16px] text-[#0A0F1A]/75 leading-[1.8]">
        {children}
      </div>
    </section>
  );
}

const BuzzerBlockPrivacy = () => {
  return (
    <div className="min-h-screen bg-white text-[#0A0F1A]">
      <Helmet>
        <title>BuzzerBlock Privacy Policy | Adtani Education Ventures</title>
        <meta
          name="description"
          content="Privacy policy for BuzzerBlock, the spoiler-safe NBA alerts Chrome extension and iPhone app from Adtani Education Ventures LLC."
        />
        <link rel="canonical" href="https://zainadtani.com/buzzerblock-privacy" />
      </Helmet>

      <main className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
        <p className="font-sans text-[12px] font-semibold tracking-[0.18em] uppercase text-[#2F5C90]">
          Privacy Policy
        </p>

        <h1 className="mt-3 text-[40px] md:text-[58px] leading-[1.05] tracking-[0.01em] text-[#0A0F1A]">
          BuzzerBlock Privacy Policy
        </h1>


        <p className="mt-4 font-sans text-[17px] md:text-[19px] font-semibold text-[#0A0F1A]">
          BuzzerBlock (Spoiler-Safe NBA Alerts)
        </p>

        <p className="mt-2 font-sans text-[14px] text-[#0A0F1A]/60">
          Effective date: October 31, 2026
        </p>

        <div className="mt-8 h-px w-full bg-[#0A0F1A]/10" />

        <p className="mt-8 font-sans text-[16px] text-[#0A0F1A]/85 leading-[1.8]">
          BuzzerBlock is a Chrome extension and iPhone app made by Adtani
          Education Ventures LLC.
        </p>

        <Section heading="What data we use">
          BuzzerBlock uses public NBA scoreboard data from ESPN only. The Chrome
          extension requests a single host permission:
          <span className="block mt-1.5 font-mono text-[14px] text-[#0A0F1A] break-all">
            https://site.api.espn.com/*
          </span>
        </Section>

        <Section heading="Notifications">
          BuzzerBlock notifications never show scores.
        </Section>

        <Section heading="Your settings">
          Your settings are stored locally on your device.
        </Section>

        <Section heading="What we do not do">
          No accounts. We do not collect personal data. We do not sell or share
          any data. No analytics.
        </Section>

        <Section heading="Contact">
          Adtani Education Ventures LLC
          <span className="block">{CONTACT_ADDRESS}</span>
          <span className="block mt-1.5">
            Email:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#447BBE] underline underline-offset-2 hover:text-[#2F5C90]"
            >
              {CONTACT_EMAIL}
            </a>
          </span>
        </Section>
      </main>
    </div>
  );
};

export default BuzzerBlockPrivacy;
