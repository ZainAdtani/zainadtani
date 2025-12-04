import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Book = {
  title: string;
  description: string;
  bookUrl?: string;
  audibleUrl?: string;
};

type Character = {
  name: string;
  role: string;
  summary: string;
};

type MagicObject = {
  name: string;
  summary: string;
};

const characters: Character[] = [
  {
    name: "Harry Potter",
    role: "The Boy Who Lived",
    summary:
      "Survived Voldemort as a baby, discovers he's a wizard, and starts his first year at Hogwarts learning magic and making friends.",
  },
  {
    name: "Ron Weasley",
    role: "Best friend",
    summary: "Loyal friend from a big wizard family who loves chess and worries about living up to his brothers.",
  },
  {
    name: "Hermione Granger",
    role: "Brightest witch in her year",
    summary: "Top student who loves books and slowly relaxes into friendship and rule bending when needed.",
  },
  {
    name: "Albus Dumbledore",
    role: "Headmaster",
    summary: "Wise leader of Hogwarts who keeps watch over Harry and the fight against Voldemort.",
  },
  {
    name: "Professor McGonagall",
    role: "Head of Gryffindor",
    summary: "Strict but fair teacher who believes in Harry and guides Gryffindor house.",
  },
  {
    name: "Hagrid",
    role: "Keeper of Keys",
    summary: "Gentle giant who introduces Harry to the wizarding world and becomes a trusted friend.",
  },
  {
    name: "Severus Snape",
    role: "Potions Master",
    summary: "Harsh teacher with secret motives who seems to dislike Harry from day one.",
  },
  {
    name: "Draco Malfoy",
    role: "Rival",
    summary: "Pure blood student who clashes with Harry from their first meeting and represents old wizard prejudice.",
  },
  {
    name: "The Weasley Family",
    role: "Gryffindor family",
    summary: "Warm, busy household that gives Harry his first taste of a real loving family.",
  },
];

const magicObjects: MagicObject[] = [
  {
    name: "Invisibility Cloak",
    summary: "Cloak Harry receives at Christmas that lets him move unseen through the castle and explore after hours.",
  },
  {
    name: "Philosopher's Stone",
    summary:
      "Object hidden under the trapdoor, able to create gold and grant eternal life, guarded by multiple challenges.",
  },
  {
    name: "Elder Wand",
    summary: "Legendary wand linked to Dumbledore, one of the three Deathly Hallows with immense power.",
  },
  {
    name: "Marauder's Map",
    summary: "Magical map that shows every hallway and moving person in Hogwarts, created by a group of pranksters.",
  },
  {
    name: "Sorting Hat",
    summary: "Ancient battered hat that reads students' minds and places them into their Hogwarts house.",
  },
  {
    name: "Time Turner",
    summary: "Hourglass necklace used for time travel, introduced in later years for attending multiple classes.",
  },
];

const books: Book[] = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    description: "The beginning of the magical journey at Hogwarts.",
    bookUrl: "https://www.amazon.com/Harry-Potter-Sorcerers-Stone-Book/dp/1338878921",
    audibleUrl: "https://www.amazon.com/Harry-Potter-Sorcerers-Stone-Book/dp/B017V4IMVQ",
  },
  {
    title: "Harry Potter and the Chamber of Secrets",
    description: "The mystery of the Chamber and the heir of Slytherin.",
    bookUrl: "https://www.amazon.com/Harry-Potter-Chamber-Secrets-Book/dp/054558292X",
    audibleUrl: "https://www.amazon.com/Harry-Potter-Chamber-Secrets-Book/dp/B017V4IPPO",
  },
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    description: "Time travel, dementors, and the truth about Sirius Black.",
    bookUrl: "https://www.amazon.com/Harry-Potter-Prisoner-Azkaban-Book/dp/0545582938",
    audibleUrl: "https://www.amazon.com/Harry-Potter-Prisoner-Azkaban-Book/dp/B017V4NTFA",
  },
  {
    title: "Harry Potter and the Goblet of Fire",
    description: "The Triwizard Tournament and the return of darkness.",
    bookUrl: "https://www.amazon.com/Harry-Potter-Goblet-Fire-Rowling/dp/0439139600",
    audibleUrl: "https://www.amazon.com/Harry-Potter-Goblet-Fire-Book/dp/B017V4NQGM",
  },
  {
    title: "Harry Potter and the Order of the Phoenix",
    description: "The formation of Dumbledore's Army and the fight against tyranny.",
    bookUrl: "https://www.amazon.com/Harry-Potter-Order-Phoenix-Book/dp/0545582970",
    audibleUrl: "https://www.amazon.com/Harry-Potter-Order-Phoenix-Book/dp/B017V4NLJ4",
  },
  {
    title: "Harry Potter and the Half-Blood Prince",
    description: "Secrets of the past and the quest for Horcruxes begins.",
    bookUrl: "https://www.amazon.com/Harry-Potter-Half-Blood-Prince-Book/dp/0545582997",
    audibleUrl: "https://www.amazon.com/Harry-Potter-Half-Blood-Prince-Book/dp/B017V4NOEG",
  },
  {
    title: "Harry Potter and the Deathly Hallows",
    description: "The final battle between good and evil.",
    bookUrl: "https://www.amazon.com/Harry-Potter-Deathly-Hallows-Book/dp/0545583004",
    audibleUrl: "https://www.amazon.com/Harry-Potter-Deathly-Hallows-Book/dp/B017WJ5PR4",
  },
];

type TimelineEvent = {
  date: string;
  title: string;
  description: string;
};

const timelineEvents: TimelineEvent[] = [
  {
    date: "November 1, 1981",
    title: "Voldemort attacks the Potters",
    description:
      "James and Lily die protecting Harry. Voldemort's curse rebounds. Hagrid takes baby Harry to Dumbledore and they leave him with the Dursleys.",
  },
  {
    date: "1981 to 1991",
    title: "Harry's life with the Dursleys",
    description:
      "Harry grows up in the cupboard under the stairs, wears Dudley's old clothes, and is treated like an outsider.",
  },
  {
    date: "Summer 1991",
    title: "The trip to the zoo",
    description:
      "On Dudley's birthday, Harry accidentally makes the glass vanish and a snake escapes, hinting at his hidden magic.",
  },
  {
    date: "Late July 1991",
    title: "Letters from Hogwarts",
    description:
      "Letters addressed to Harry arrive again and again until Vernon takes the family to a lonely hut on a rock in the sea.",
  },
  {
    date: "July 31, 1991",
    title: "Hagrid, keeper of the keys",
    description:
      "Hagrid arrives at the hut, gives Harry a birthday cake, tells him he is a wizard, and hands him his Hogwarts letter.",
  },
  {
    date: "Early August 1991",
    title: "Diagon Alley and Gringotts",
    description:
      "Hagrid and Harry visit Diagon Alley for school supplies, stop at Gringotts, and collect a mysterious package from a high security vault.",
  },
  {
    date: "September 1, 1991",
    title: "Journey to Hogwarts",
    description:
      "Harry reaches platform nine and three quarters, meets Ron and Hermione on the train, and rides to Hogwarts.",
  },
  {
    date: "September 1991",
    title: "Sorting and first classes",
    description:
      "The Sorting Hat places Harry in Gryffindor, and he begins classes with teachers like Snape and McGonagall.",
  },
  {
    date: "Autumn 1991",
    title: "Flying lesson and new Seeker",
    description:
      "Harry shows natural talent on a broom during flying lessons and becomes Seeker for the Gryffindor Quidditch team.",
  },
  {
    date: "October 31, 1991",
    title: "Troll in the castle",
    description:
      "A mountain troll gets into the castle. Harry and Ron save Hermione, and the three become close friends.",
  },
  {
    date: "November 1991",
    title: "First Quidditch match",
    description:
      "Harry plays his first Quidditch match, someone tries to jinx his broom, and the trio grow more suspicious of Snape.",
  },
  {
    date: "Christmas 1991",
    title: "The Mirror of Erised",
    description:
      "During the holidays, Harry discovers the Mirror of Erised, which shows him with his parents. Dumbledore later explains the danger of the mirror.",
  },
  {
    date: "Winter and spring 1992",
    title: "Nicolas Flamel and the Stone",
    description:
      "Harry, Ron, and Hermione discover who Nicolas Flamel is, learn about the Philosopher's Stone, and guess that someone wants to steal it.",
  },
  {
    date: "Spring 1992",
    title: "Norbert and the Forbidden Forest",
    description:
      "Hagrid raises a dragon named Norbert. The trio help smuggle him away, get caught, and serve detention in the Forbidden Forest where Harry sees a hooded figure drinking unicorn blood.",
  },
  {
    date: "June 1992",
    title: "Through the trapdoor",
    description:
      "The trio pass through the magical protections guarding the Stone. Harry faces Professor Quirrell and Voldemort's spirit.",
  },
  {
    date: "End of term 1992",
    title: "House Cup and heading home",
    description:
      "Dumbledore awards last minute points so Gryffindor wins the House Cup. Harry heads back to the Dursleys for the summer, now proud of his new life as a wizard.",
  },
];

type ChapterSong = {
  chapter: number;
  title: string;
  summary: string;
  embedUrl: string;
};

const chapterSongs: ChapterSong[] = [
  {
    chapter: 1,
    title: "The Boy Who Lived",
    summary: "Voldemort attacks the Potters, baby Harry survives, and Dumbledore leaves him with the Dursleys.",
    embedUrl: "https://suno.com/embed/7775f7ce-b30d-4ebd-94e8-ad71211e7b69",
  },
  {
    chapter: 2,
    title: "The Vanishing Glass",
    summary: "Harry grows up with the Dursleys, gets bullied by Dudley, and strange magic at the zoo makes the glass vanish.",
    embedUrl: "https://suno.com/embed/3a09e3d2-52ee-4403-ae1d-9b17b049501c",
  },
  {
    chapter: 3,
    title: "The Letters from No One",
    summary: "Mysterious letters from Hogwarts keep arriving no matter where Uncle Vernon moves the family.",
    embedUrl: "https://suno.com/embed/32cbfd76-3b08-4044-8739-0d3927b5c821",
  },
  {
    chapter: 4,
    title: "The Keeper of the Keys",
    summary: "Hagrid bursts into the hut on the rock, rescues Harry from the Dursleys, and delivers his Hogwarts letter.",
    embedUrl: "https://suno.com/embed/29aaca2e-344a-4bbf-ab0c-7b91e98b36b9",
  },
];

export default function HarryPotterWorld() {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audio] = useState(() => {
    const audioElement = new Audio("/audio/harry-potter-audible-intro.mp3");
    audioElement.loop = true;
    audioElement.volume = 0.3;
    return audioElement;
  });

  const toggleAudio = () => {
    if (audioPlaying) {
      audio.pause();
      setAudioPlaying(false);
    } else {
      audio.play().catch(() => {
        console.log("Audio autoplay prevented by browser");
      });
      setAudioPlaying(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Harry Potter World – Zain</title>
        <meta name="description" content="A Hogwarts themed hub for books, audiobooks, and key story moments." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-amber-950/20 via-background to-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent"></div>
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-amber-400/20"
                style={{
                  width: Math.random() * 3 + 1 + "px",
                  height: Math.random() * 3 + 1 + "px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                  animationDelay: Math.random() * 3 + "s",
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <nav className="text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link to="/projects" className="hover:text-primary transition-colors">
                Projects
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Harry Potter World</span>
            </nav>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Harry Potter World
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl">
              Books, audiobooks, and a timeline through the wizarding year.
            </p>
          </div>
        </div>

        {/* Listen to the Magic Section */}
        <div className="container mx-auto px-4 py-16">
          <Card className="bg-gradient-to-br from-amber-950/40 to-amber-900/30 border-amber-700/30 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center p-8">
              {/* Text left on desktop */}
              <div className="order-1 md:order-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-100">Listen to the magic</h2>
                <p className="text-lg text-amber-100/80 mb-6">
                  Tap the button and let Hogwarts audio play while you scroll.
                </p>
                <Button
                  onClick={toggleAudio}
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-6 text-lg w-full md:w-auto"
                >
                  {audioPlaying ? "Sound Off 🔇" : "Sound On 🔊"}
                </Button>
                <p className="text-sm text-amber-200/60 mt-3">Best with headphones at low volume.</p>
                
                {/* Bonus track row */}
                <div className="mt-6 pt-4 border-t border-amber-700/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-sm text-amber-200/70">Bonus track from the wizarding playlist</span>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-amber-500/40 text-amber-200 hover:bg-amber-700/30"
                  >
                    <a href="https://youtu.be/hV_InmMs_i0" target="_blank" rel="noopener noreferrer">
                      Watch on YouTube
                    </a>
                  </Button>
                </div>
              </div>

              {/* Image right on desktop */}
              <div className="order-2 md:order-2">
                <img
                  src="/images/hp-listen-magic.png"
                  alt="Listen to the magic"
                  className="rounded-lg shadow-2xl w-full"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Books and Audiobooks Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Books and Audiobooks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-amber-500/20">
                <CardHeader>
                  <CardTitle className="text-lg">{book.title}</CardTitle>
                  <CardDescription>{book.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex gap-2">
                  {book.bookUrl && (
                    <Button asChild variant="default" className="flex-1">
                      <a href={book.bookUrl} target="_blank" rel="noopener noreferrer">
                        View Book
                      </a>
                    </Button>
                  )}
                  {book.audibleUrl && (
                    <Button asChild variant="outline" className="flex-1">
                      <a href={book.audibleUrl} target="_blank" rel="noopener noreferrer">
                        Listen on Audible
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Chapter Songs Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Chapter Songs, Book 1: The Philosopher's Stone</h2>
          <p className="text-muted-foreground mb-8">Play a custom song for each chapter as you follow the story.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chapterSongs.map((song) => (
              <Card key={song.chapter} className="hover:shadow-lg transition-shadow border-amber-500/20">
                <CardHeader className="pb-2">
                  <div className="text-sm font-semibold text-amber-500 mb-1">Chapter {song.chapter}</div>
                  <CardTitle className="text-lg">{song.title}</CardTitle>
                  <CardDescription>{song.summary}</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <iframe
                    src={song.embedUrl}
                    className="w-full rounded-lg"
                    style={{ height: "240px" }}
                    title={`Chapter ${song.chapter} - ${song.title}`}
                    allow="autoplay"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Characters and Magic Objects Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Characters and Magic Objects</h2>
          <p className="text-muted-foreground mb-8">Quick notes on key people and items from Harry's first year.</p>

          <Tabs defaultValue="characters" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="characters">Characters</TabsTrigger>
              <TabsTrigger value="objects">Objects</TabsTrigger>
            </TabsList>

            <TabsContent value="characters">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characters.map((character, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow border-amber-500/20 hover:border-amber-500/40"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{character.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{character.role}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{character.summary}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="objects">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {magicObjects.map((object, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow border-amber-500/20 hover:border-amber-500/40"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{object.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{object.summary}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Hogwarts Year Timeline Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center flex items-center justify-center gap-3">
            <span role="img" aria-label="magic wand">
              🪄
            </span>
            <span>Timeline</span>
            <span role="img" aria-label="magic wand">
              🪄
            </span>
          </h2>
          <p className="text-muted-foreground text-center mb-8">Hogwarts First Year, 1991–1992</p>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-amber-400 to-amber-500"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-4 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50 z-10"></div>

                  {/* Content */}
                  <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <Card className="border-amber-500/20 hover:border-amber-500/40 transition-colors">
                      <CardHeader>
                        <div className="text-sm font-semibold text-amber-500 mb-1">{event.date}</div>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}
