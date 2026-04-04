export type Podcast = {
  title: string;
  host: string;
  listen: string;
  website?: string;
  image?: string | null;
  embedHtml?: string | null;
};

export const PODCASTS: Podcast[] = [
  {
    title: "Huberman Lab",
    host: "Andrew Huberman",
    listen: "https://open.spotify.com/show/79CkJF3UJTHFV8Dse3Oy0P",
    website: "https://www.hubermanlab.com/podcast",
    image: "/images/podcasts/huberman-lab.png",
  },
  {
    title: "Ear Biscuits",
    host: "Rhett & Link",
    listen: "https://open.spotify.com/show/3j9nu2qpJrUxEXp5qMudM7",
    website: "https://www.youtube.com/@earbiscuits",
    image: "/images/podcasts/ear-biscuits.png",
    embedHtml: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/show/3j9nu2qpJrUxEXp5qMudM7?utm_source=generator&t=420" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
  },
  {
    title: "Morning Brew Daily",
    host: "Morning Brew",
    listen: "https://open.spotify.com/show/7nc7OQdPTekErtFSRxOBKh",
    website: "https://www.morningbrew.com/podcasts/morning-brew-daily",
    image: "/images/podcasts/morning-brew-daily.png",
  },
  {
    title: "The Tim Ferriss Show",
    host: "Tim Ferriss",
    listen: "https://open.spotify.com/show/5qSUyCrk9KR69lEiXbjwXM",
    website: "https://tim.blog/podcast/",
    image: "/images/podcasts/tim-ferriss-show.png",
    embedHtml: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/show/5qSUyCrk9KR69lEiXbjwXM?utm_source=generator" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
  },
  {
    title: "Ultimate Human",
    host: "Gary Brecka",
    listen: "https://open.spotify.com/show/5Faf5ecAnYW7AzGdblqd6R",
    website: "https://www.ultimatehumanpodcast.com/",
    image: "/images/podcasts/ultimate-human.jpg",
  },
  {
    title: "On Purpose",
    host: "Jay Shetty",
    listen: "https://open.spotify.com/show/5EqqB52m2bsr4k1Ii7sStc",
    website: "https://jayshetty.me/podcast/",
    image: "/images/podcasts/on-purpose.png",
  },
  {
    title: "Impact Theory",
    host: "Tom Bilyeu",
    listen: "https://open.spotify.com/show/1nARKz2vTIOb7gC9dusE4b",
    website: "https://impacttheory.com/podcast",
    image: "/images/podcasts/impact-theory.png",
  },
  {
    title: "The Diary Of A CEO",
    host: "Steven Bartlett",
    listen: "https://open.spotify.com/show/7iQXmUT7XGuZSzAMjoNWlX",
    website: "https://www.diaryofaceo.com/",
    image: "/images/podcasts/diary-of-a-ceo.jpg",
  },
  {
    title: "Brian Windhorst & The Hoop Collective",
    host: "Brian Windhorst",
    listen: "https://open.spotify.com/show/4mOLvZqMud0JromeBgLpIh",
    website: "https://www.espn.com/podcenter/",
    image: "/images/podcasts/brian-windhorst.png",
  },
];
