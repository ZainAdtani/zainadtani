import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";

type Book = {
  title: string;
  description: string;
  bookUrl?: string;
  audibleUrl?: string;
};

const books: Book[] = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    description: "The beginning of the magical journey at Hogwarts.",
    bookUrl: "#",
    audibleUrl: "#",
  },
  {
    title: "Harry Potter and the Chamber of Secrets",
    description: "The mystery of the Chamber and the heir of Slytherin.",
    bookUrl: "#",
    audibleUrl: "#",
  },
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    description: "Time travel, dementors, and the truth about Sirius Black.",
    bookUrl: "#",
    audibleUrl: "#",
  },
  {
    title: "Harry Potter and the Goblet of Fire",
    description: "The Triwizard Tournament and the return of darkness.",
    bookUrl: "#",
    audibleUrl: "#",
  },
  {
    title: "Harry Potter and the Order of the Phoenix",
    description: "The formation of Dumbledore's Army and the fight against tyranny.",
    bookUrl: "#",
    audibleUrl: "#",
  },
  {
    title: "Harry Potter and the Half-Blood Prince",
    description: "Secrets of the past and the quest for Horcruxes begins.",
    bookUrl: "#",
    audibleUrl: "#",
  },
  {
    title: "Harry Potter and the Deathly Hallows",
    description: "The final battle between good and evil.",
    bookUrl: "#",
    audibleUrl: "#",
  },
];

type TimelineEvent = {
  date: string;
  title: string;
  description: string;
};

const timelineEvents: TimelineEvent[] = [
  {
    date: "September 1",
    title: "Hogwarts Express and Sorting",
    description: "First years board the Hogwarts Express at Platform 9¾ and are sorted into their houses.",
  },
  {
    date: "October 31",
    title: "Halloween Feast",
    description: "The Great Hall is decorated with floating pumpkins and the traditional Halloween feast.",
  },
  {
    date: "December 25",
    title: "Christmas at Hogwarts",
    description: "Those who stay at Hogwarts celebrate Christmas with festive decorations and a grand feast.",
  },
  {
    date: "Late May",
    title: "End of Year Exams",
    description: "Students take their final exams before summer break.",
  },
  {
    date: "June",
    title: "House Cup Ceremony",
    description: "The house with the most points wins the House Cup in a grand end-of-year ceremony.",
  },
];

export default function HarryPotterWorld() {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audio] = useState(() => {
    const audioElement = new Audio("/audio/harry-potter-ambient.mp3");
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
        // Handle autoplay restrictions
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
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Harry Potter World</span>
            </nav>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Harry Potter World
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl">
              Books, audiobooks, and a timeline through the wizarding year.
            </p>

            <Button
              onClick={toggleAudio}
              variant="outline"
              className="gap-2 bg-background/50 backdrop-blur-sm border-amber-500/30 hover:bg-amber-500/10 hover:border-amber-500/50"
            >
              {audioPlaying ? (
                <>
                  <Volume2 className="w-4 h-4" />
                  Sound On
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  Sound Off
                </>
              )}
            </Button>
          </div>
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

        {/* Hogwarts Year Timeline Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Hogwarts Year Timeline</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-amber-400 to-amber-500"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-4 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
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
