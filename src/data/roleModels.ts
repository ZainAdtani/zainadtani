import deanGraziosi from "@/assets/dean-graziosi.jpg";
import tonyRobbins from "@/assets/tony-robbins.jpg";
import jasonFladlien from "@/assets/jason-fladlien.jpg";
import chrisHaroun from "@/assets/chris-haroun.png";
import trentShelton from "@/assets/trent-shelton.png";
import timFerriss from "@/assets/tim-ferriss.jpg";
import alexHormozi from "@/assets/alex-hormozi.png";

export interface RoleModel {
  name: string;
  role: string;
  born: string;
  age: string;
  imageAlt: string;
  bio: string;
  bullets: string[];
  image: string;
  website: string;
  youtube?: string;
}

export const ROLE_MODELS: RoleModel[] = [
  {
    name: "Tony Robbins",
    role: "Life & Business Strategist",
    born: "Feb 29, 1960",
    age: "65 years old",
    imageAlt: "Tony Robbins headshot",
    bio: "American author and motivational coach known for high-energy seminars and best-selling books. Creator of events like Unleash the Power Within and Date With Destiny.",
    bullets: ["Author of Unlimited Power and Awaken the Giant Within", "Decades of global seminars and coaching", "Focus: peak performance, business, life strategy"],
    image: tonyRobbins,
    website: "https://www.tonyrobbins.com",
  },
  {
    name: "Dean Graziosi",
    role: "Real Estate & Knowledge Entrepreneur",
    born: "Nov 20, 1968",
    age: "56 years old",
    imageAlt: "Dean Graziosi headshot",
    bio: "NYT best-selling author and investor; co-founder of Mastermind.com with Tony Robbins, helping people package and sell what they know.",
    bullets: ["Built and advised multiple successful companies", "Teaches practical frameworks for momentum", "Focus: small business, marketing, personal growth"],
    image: deanGraziosi,
    website: "https://www.deangraziosi.com",
  },
  {
    name: "Alex Hormozi",
    role: "Founder, Acquisition.com",
    born: "",
    age: "",
    imageAlt: "Alex Hormozi headshot",
    bio: "Teaches offers, marketing, and business systems with simple frameworks. Known for $100M Offers and building acquisition.com portfolio.",
    bullets: ["Offers and pricing strategy", "Customer acquisition basics", "Systems and execution"],
    image: alexHormozi,
    website: "https://www.acquisition.com",
    youtube: "https://www.youtube.com/c/alexhormozi",
  },
  {
    name: "Jason Fladlien",
    role: "Entrepreneur & Webinar Expert",
    born: "Apr 7, 1983",
    age: "42 years old",
    imageAlt: "Jason Fladlien headshot",
    bio: 'Co-founder of Rapid Crush, known as the "$100M Webinar Man." Record-setting launches and go-to teacher for high-converting webinars.',
    bullets: ["$250M+ in sales to 150k+ customers worldwide", "Holds records for major webinar launches", "Focus: offer design, webinar conversion, scaling"],
    image: jasonFladlien,
    website: "https://jasonfladlien.com/about/",
  },
  {
    name: "Chris Haroun",
    role: "Founder & CEO, Haroun Education Ventures",
    born: "",
    age: "",
    imageAlt: "Chris Haroun headshot",
    bio: "Award-winning MBA professor and #1 bestselling business instructor on Udemy. Columbia MBA, Goldman Sachs alum, and VC.",
    bullets: ["2M+ students taught on Udemy", "Speaker at Inc. 5000, TEDx, etc.", "Focus: finance, MBA skills, career strategy"],
    image: chrisHaroun,
    website: "https://www.harouneducationventures.com/",
  },
  {
    name: "Trent Shelton",
    role: "Former NFL Player & Motivational Speaker",
    born: "Sep 21, 1984",
    age: "40 years old",
    imageAlt: "Trent Shelton headshot",
    bio: "Former NFL wide receiver turned motivational speaker. Founder of RehabTime, reaching millions with messages on self-worth and resilience.",
    bullets: ["Played for Seattle Seahawks, Indianapolis Colts, Washington Redskins", "Viral videos and millions of followers", "Focus: self-worth, mental strength, purpose"],
    image: trentShelton,
    website: "https://www.trentshelton.com/",
  },
  {
    name: "Tim Ferriss",
    role: "Author & Podcast Host",
    born: "Jul 20, 1977",
    age: "47 years old",
    imageAlt: "Tim Ferriss headshot",
    bio: 'Author of The 4-Hour Workweek and host of The Tim Ferriss Show. Early-stage investor in Uber, Facebook, and 50+ companies. Known for "deconstructing world-class performers."',
    bullets: ["700M+ podcast downloads", "Multiple NYT bestsellers", "Focus: productivity, self-experimentation, investing"],
    image: timFerriss,
    website: "https://tim.blog/",
  },
];
