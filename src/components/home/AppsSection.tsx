const BADGE = "/badges/app-store-badge.svg";

const LIVE = [
  { name: "BuzzerBlock", icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ba/22/ac/ba22acc0-18db-ab6e-95bb-cc4b5e982995/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    sentence: "The spoiler-free way to follow your NBA teams.", url: "https://apps.apple.com/us/app/buzzerblock/id6832104995" },
  { name: "PathFolk", icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2b/35/16/2b3516a4-a26d-2523-b008-01f9b173cbdb/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    sentence: "Connect with licensed financial professionals.", url: "https://apps.apple.com/us/app/pathfolk/id6818683420" },
  { name: "NOMsters: Food Discovery", icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/65/17/a4/6517a42c-a4ad-ebf1-18ff-437283dac8b9/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
    sentence: "See the closest food first, so you can stop scrolling and go eat.", url: "https://apps.apple.com/us/app/nomsters-food-discovery/id6815714189" },
];
const SOON = ["Zigest", "StoryPond", "NovaLearn"];

export function AppsSection() {
  return (
    <section id="apps" aria-labelledby="apps-heading" className="section-y bg-white scroll-mt-20">
      <div className="container mx-auto px-5 sm:px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">On the App Store</p>
          <h2 id="apps-heading" className="font-display text-[30px] md:text-[40px] leading-[1.15] text-[#0A0F1A] mt-2">iPhone apps.</h2>
          <p className="font-sans text-[16px] leading-relaxed text-[#0A0F1A]/70 mt-3">Three are on the App Store today. The others are on the way.</p>
        </div>
        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {LIVE.map((a) => (
            <li key={a.name} className="surface-card p-5 flex flex-col items-center text-center">
              <img src={a.icon} alt={`${a.name} app icon`} width={80} height={80} loading="lazy" className="w-20 h-20 rounded-[22%]" />
              <h3 className="font-display text-[17px] leading-tight text-[#0A0F1A] mt-4">{a.name}</h3>
              <p className="font-sans text-[14px] leading-relaxed text-[#0A0F1A]/75 mt-2 flex-1">{a.sentence}</p>
              <a href={a.url} target="_blank" rel="noopener noreferrer" aria-label={`Download ${a.name} on the App Store`}
                className="mt-4 inline-block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#447BBE] focus-visible:ring-offset-2">
                <img src={BADGE} alt="Download on the App Store" className="h-10 w-auto" loading="lazy" />
              </a>
            </li>
          ))}
          {SOON.map((name) => (
            <li key={name} className="surface-card p-5 flex flex-col items-center text-center">
              <div aria-hidden="true" className="app-soon-tile w-20 h-20 rounded-[22%] flex items-center justify-center font-display text-[32px] text-[#0A0F1A]">
                {name[0]}
              </div>
              <h3 className="font-display text-[17px] leading-tight text-[#0A0F1A] mt-4">{name}</h3>
              <p className="font-sans text-[14px] font-semibold text-[#7A6F1E] mt-2">Coming soon</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
