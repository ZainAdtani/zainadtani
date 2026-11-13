import { useState } from "react";
import { NEWSLETTER_NAME, openNewsletterSignup, type NewsletterTag } from "@/data/newsletter";

const BADGE = "/badges/app-store-badge.svg";

const LIVE = [
  {
    name: "BuzzerBlock",
    icon: "/images/apps/buzzerblock.jpg",
    sentence: "The spoiler-free way to follow your NBA teams.",
    url: "https://apps.apple.com/us/app/buzzerblock/id6832104995",
  },
  {
    name: "PathFolk",
    icon: "/images/apps/pathfolk.jpg",
    sentence: "Connect with licensed financial professionals.",
    url: "https://apps.apple.com/us/app/pathfolk/id6818683420",
  },
  {
    name: "NOMsters: Food Discovery",
    icon: "/images/apps/nomsters.jpg",
    sentence: "See the closest food first, so you can stop scrolling and go eat.",
    url: "https://apps.apple.com/us/app/nomsters-food-discovery/id6815714189",
  },
];

const SOON = [
  { name: "Zigest", icon: "/images/apps/zigest.svg", campaign: "zigest", hook: "A short daily digest app." },
  { name: "StoryPond", icon: "/images/apps/storypond.svg", campaign: "storypond", hook: "A story app for kids and families." },
  { name: "NovaLearn", icon: "/images/apps/novalearn.svg", campaign: "novalearn", hook: "Quick science lessons." },
];

function waitlistTag(campaign: string): NewsletterTag {
  return { source: "zainadtani.com", medium: "app-waitlist", campaign };
}

type SubState = { kind: "idle" | "ok" | "error"; msg?: string };

export function AppsSection() {
  const [app, setApp] = useState(SOON[0].campaign);
  const [state, setState] = useState<SubState>({ kind: "idle" });
  const picked = SOON.find((item) => item.campaign === app) ?? SOON[0];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
    const email = input?.value?.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState({ kind: "error", msg: "Please enter a valid email address." });
      input?.focus();
      return;
    }
    openNewsletterSignup(email, waitlistTag(picked.campaign));
    setState({
      kind: "ok",
      msg: `Almost done. Finish joining the ${picked.name} waitlist in the new tab. That also signs you up for ${NEWSLETTER_NAME}.`,
    });
    input.value = "";
  };

  return (
    <section id="apps" aria-labelledby="apps-heading" className="section-y bg-white scroll-mt-20 max-sm:pb-32">
      <div className="container mx-auto px-5 sm:px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">On the App Store</p>
          <h2 id="apps-heading" className="font-display text-[30px] md:text-[40px] leading-[1.15] text-[#0A0F1A] mt-2">iPhone apps.</h2>
          <p className="font-sans text-[16px] leading-relaxed text-[#0A0F1A]/70 mt-3">Three are on the App Store today. The others are on the way.</p>
        </div>
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LIVE.map((a) => (
            <li key={a.name} className="surface-card p-5 flex flex-col items-center text-center">
              <img src={a.icon} alt={`${a.name} app icon`} width={80} height={80} loading="lazy" className="w-20 h-20 rounded-[22%]" />
              <h3 className="font-display text-[17px] leading-tight text-[#0A0F1A] mt-4">{a.name}</h3>
              <p className="font-sans text-[14px] leading-relaxed text-[#0A0F1A]/75 mt-2 flex-1">{a.sentence}</p>
              <a href={a.url} target="_blank" rel="noopener noreferrer" aria-label={`Download ${a.name} on the App Store`}
                className="mt-4 inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#447BBE] focus-visible:ring-offset-2">
                <img src={BADGE} alt="Download on the App Store" className="h-10 w-auto" width={120} height={40} loading="lazy" />
              </a>
            </li>
          ))}
          {SOON.map((a) => (
            <li key={a.name} className="surface-card p-5 flex flex-col items-center text-center">
              <img src={a.icon} alt="" width={80} height={80} loading="lazy" className="w-20 h-20 rounded-[22%]" />
              <h3 className="font-display text-[17px] leading-tight text-[#0A0F1A] mt-4">{a.name}</h3>
              <p className="font-sans text-[14px] leading-relaxed text-[#0A0F1A]/75 mt-2 flex-1">{a.hook}</p>
              <p className="mt-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-[#7A6F1E]">Coming soon</p>
            </li>
          ))}
        </ul>

        <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-xl rounded-2xl border border-[#D97706]/30 bg-[#FDF6E3] p-6 text-left">
          <h3 className="font-display text-[20px] text-[#0A0F1A]">Join the waitlist</h3>
          <p className="mt-2 font-sans text-[15px] leading-relaxed text-[#0A0F1A]/75">
            Get a note when one of the upcoming apps is ready. This uses the same {NEWSLETTER_NAME} signup.
          </p>
          <div className="mt-4 grid gap-3">
            <div>
              <label htmlFor="app-waitlist-choice" className="font-sans text-[13px] font-semibold text-[#0A0F1A]">Which app</label>
              <select
                id="app-waitlist-choice"
                name="app"
                value={app}
                onChange={(e) => setApp(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#447BBE]/30 bg-white px-3 py-3 font-sans text-[16px] text-[#0A0F1A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#447BBE]"
              >
                {SOON.map((item) => (
                  <option key={item.campaign} value={item.campaign}>{item.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="app-waitlist-email" className="font-sans text-[13px] font-semibold text-[#0A0F1A]">Email</label>
              <input
                id="app-waitlist-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={200}
                placeholder="you@email.com"
                className="mt-1 w-full rounded-lg border border-[#447BBE]/30 bg-white px-3 py-3 font-sans text-[16px] text-[#0A0F1A] placeholder:text-[#5C6570] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#447BBE]"
              />
            </div>
            <button type="submit" className="btn-cta w-full">Join the waitlist</button>
          </div>
          {state.kind !== "idle" && (
            <p role="status" aria-live="polite" className={`mt-3 font-sans text-[14px] font-medium ${state.kind === "error" ? "text-destructive" : "text-[#0A0F1A]"}`}>
              {state.msg}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
