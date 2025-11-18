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
    summary: "Survived Voldemort as a baby, discovers he's a wizard, and starts his first year at Hogwarts learning magic and making friends.",
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
    summary: "Object hidden under the trapdoor, able to create gold and grant eternal life, guarded by multiple challenges.",
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
      "Voldemort murders James and Lily, baby Harry survives with a lightning scar, and Dumbledore, McGonagall, and Hagrid leave him at the Dursleys' house on Privet Drive.",
  },
  {
    date: "1981–1991",
    title: "Growing up with the Dursleys",
    description:
      "Harry sleeps in the cupboard under the stairs, gets bullied by Dudley, and knows nothing about magic or the wizarding world.",
  },
  {
    date: "June 1991",
    title: "Zoo trip and the vanished glass",
    description:
      "On Dudley's birthday trip to the zoo, Harry talks to a snake and the glass on its enclosure vanishes, shocking the Dursleys.",
  },
  {
    date: "Late July 1991",
    title: "Letters from Hogwarts",
    description:
      "Letters addressed to Harry arrive in stranger and stranger ways, Vernon tries to block them, and the family hides in a hut on a rock in the sea.",
  },
  {
    date: "July 31, 1991",
    title: "Hagrid arrives",
    description:
      "Right at midnight on Harry's eleventh birthday, Hagrid bursts into the hut, explains that Harry is a wizard, gives him his Hogwarts letter, and stands up to the Dursleys.",
  },
  {
    date: "Early August 1991",
    title: "Diagon Alley",
    description:
      "Hagrid takes Harry to Diagon Alley, where Harry gets his wand, meets Draco in Madam Malkin's, first hears about Voldemort, and receives Hedwig as a birthday present.",
  },
  {
    date: "Rest of August 1991",
    title: "Waiting for Hogwarts",
    description:
      "Harry returns to the Dursleys with his school supplies, spends the month reading his new books, and counts down to September.",
  },
  {
    date: "September 1, 1991",
    title: "Hogwarts Express and Sorting",
    description:
      "Harry finds Platform Nine and Three-Quarters with the Weasleys' help, meets Ron and Hermione, clashes with Draco, rides the Hogwarts Express, and is sorted into Gryffindor with Ron, Hermione, and Neville.",
  },
  {
    date: "Early September 1991",
    title: "First week of classes",
    description:
      "Harry meets his teachers, including Professor Snape, who singles him out in Potions and treats him harshly.",
  },
  {
    date: "September 12, 1991",
    title: "Youngest Seeker in a century",
    description:
      "During flying lessons, Neville drops his Remembrall, Harry dives to catch it, impresses McGonagall, and becomes the youngest Gryffindor Seeker in a hundred years.",
  },
  {
    date: "Late September 1991",
    title: "Fluffy and the forbidden corridor",
    description:
      "Malfoy tricks Harry into a midnight duel, Harry, Ron, Hermione, and Neville flee from Filch, and they discover Fluffy, the three headed dog guarding a trapdoor.",
  },
  {
    date: "October 1991",
    title: "Mystery of the trapdoor",
    description:
      "The trio suspect that something important lies under the trapdoor and start guessing what Fluffy protects.",
  },
  {
    date: "October 31, 1991",
    title: "Halloween troll and new friendship",
    description:
      "A troll enters the castle during the Halloween feast, Harry and Ron rescue Hermione in the bathroom, and the three become close friends.",
  },
  {
    date: "Early November 1991",
    title: "First Quidditch match",
    description:
      "During Gryffindor vs Slytherin, Harry's broom goes out of control, Hermione sets fire to Snape's robes, Harry regains control, catches the Snitch, and the trio suspect Snape is after whatever Fluffy guards.",
  },
  {
    date: "Late November 1991",
    title: "Searching for Nicolas Flamel",
    description: "The trio search the library for Nicolas Flamel but cannot find his name in any book.",
  },
  {
    date: "Mid December 1991",
    title: "Christmas at Hogwarts begins",
    description:
      "Snow covers the grounds, Ron and Harry stay at school, and Hogwarts fills with decorations for the holidays.",
  },
  {
    date: "December 25, 1991",
    title: "The Mirror of Erised",
    description:
      "Harry receives an invisibility cloak that once belonged to his father, explores the castle, and discovers the Mirror of Erised, where he sees his parents and extended family.",
  },
  {
    date: "End of December 1991",
    title: "Dumbledore and the mirror",
    description:
      "Harry keeps visiting the mirror until Dumbledore finds him, explains why the mirror is dangerous, and moves it to a new hiding place.",
  },
  {
    date: "January 1992",
    title: "Back to classes and the Stone mystery",
    description:
      "Hermione returns from the holidays, and the trio continue to search for information about Flamel and the guarded object.",
  },
  {
    date: "Early spring 1992",
    title: "Learning about the Philosopher's Stone",
    description:
      "From a library book, the trio learn that Nicolas Flamel made the Philosopher's Stone, realize that Fluffy guards it, and feel sure someone is trying to steal it.",
  },
  {
    date: "April 24, 1992",
    title: "Norbert the Norwegian Ridgeback",
    description:
      "Hagrid wins a dragon egg from a hooded stranger, the egg hatches into Norbert, and the dragon quickly grows wild and dangerous.",
  },
  {
    date: "Late April 1992",
    title: "Smuggling Norbert out",
    description:
      "Harry, Ron, and Hermione send Norbert to Charlie Weasley's dragon reserve in Romania, are caught out of bed afterward, and lose many points from Gryffindor.",
  },
  {
    date: "May 1992",
    title: "Detention in the Forbidden Forest",
    description:
      "Serving detention, Harry, Hermione, Neville, and Draco help Hagrid search for a wounded unicorn, Harry sees a hooded figure drinking its blood, his scar hurts, and Firenze warns that this points to Voldemort.",
  },
  {
    date: "Late May 1992",
    title: "Exam season",
    description:
      "Students prepare for and take end of year exams, Hermione excels, and the trio stay worried about the Stone.",
  },
  {
    date: "Late May 1992",
    title: "Realizing the plan",
    description:
      "The trio learn that Hagrid told the stranger how to calm Fluffy, realize someone now knows how to get past the dog, and decide the Stone is in real danger.",
  },
  {
    date: "Early June 1992",
    title: "Through the trapdoor",
    description:
      "Thinking Snape will act, Harry, Ron, and Hermione go past Fluffy and face the teachers' challenges, including Devil's Snare, flying keys, giant wizard chess, and a logic puzzle.",
  },
  {
    date: "Early June 1992",
    title: "Quirrell and Voldemort",
    description:
      "Harry reaches the final room, finds Quirrell serving Voldemort, gets the Stone from the Mirror of Erised, and defeats Quirrell when his touch burns him, forcing Voldemort to flee.",
  },
  {
    date: "Mid June 1992",
    title: "Recovery in the hospital wing",
    description:
      "Harry wakes in the hospital wing, and Dumbledore explains more about the Stone, Lily's protection, and why Voldemort failed to take over Harry.",
  },
  {
    date: "Late June 1992",
    title: "House Cup surprise",
    description:
      "At the leaving feast, Slytherin first appears to win the House Cup, then Dumbledore awards last minute points to Harry, Ron, Hermione, and Neville for courage, and Gryffindor wins instead.",
  },
  {
    date: "End of June 1992",
    title: "Back to Privet Drive",
    description:
      "Students ride the Hogwarts Express home, and Harry returns to the Dursleys, happy that he will return to Hogwarts next year.",
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
              <div className="order-2 md:order-1">
                <img 
                  src="/images/hp-listen-magic.png" 
                  alt="Listen to the magic" 
                  className="rounded-lg shadow-2xl w-full"
                />
              </div>
              <div className="order-1 md:order-2 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-100">
                  Listen to the magic
                </h2>
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
                <p className="text-sm text-amber-200/60 mt-3">
                  Best with headphones at low volume.
                </p>
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
                  <Card key={index} className="hover:shadow-lg transition-shadow border-amber-500/20 hover:border-amber-500/40">
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
                  <Card key={index} className="hover:shadow-lg transition-shadow border-amber-500/20 hover:border-amber-500/40">
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
