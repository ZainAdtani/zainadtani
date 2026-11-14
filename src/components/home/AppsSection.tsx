import { PhoneDemo } from "@/components/home/PhoneDemo";
import { NEWSLETTER_NAME } from "@/data/newsletter";

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

export function AppsSection() {
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
              <PhoneDemo icon={a.icon} name={a.name} />
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

        <p className="mx-auto mt-10 max-w-xl text-center font-sans text-[15px] leading-relaxed text-[#0A0F1A]/70">
          App news rides in{" "}
          <a
            href="#z-letter"
            className="font-semibold text-[#2F5C90] underline underline-offset-4 hover:underline rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#447BBE]"
          >
            {NEWSLETTER_NAME}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
