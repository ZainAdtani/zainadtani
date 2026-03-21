import { useState, useCallback, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { NEWSLETTERS } from "@/data/newsletters";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type Podcast = {
  title: string;
  host: string;
  listen: string;
  image?: string | null;
};

interface WhatIFollowProps {
  podcasts: Podcast[];
}

export default function WhatIFollow({ podcasts }: WhatIFollowProps) {
  const [activeView, setActiveView] = useState<"newsletters" | "podcasts">("newsletters");
  const [nlApi, setNlApi] = useState<CarouselApi>();
  const [pcApi, setPcApi] = useState<CarouselApi>();
  const [nlCurrent, setNlCurrent] = useState(0);
  const [nlCount, setNlCount] = useState(0);
  const [pcCurrent, setPcCurrent] = useState(0);
  const [pcCount, setPcCount] = useState(0);

  // Dot indicators for newsletters
  useEffect(() => {
    if (!nlApi) return;
    setNlCount(nlApi.scrollSnapList().length);
    setNlCurrent(nlApi.selectedScrollSnap());
    nlApi.on("select", () => setNlCurrent(nlApi.selectedScrollSnap()));
  }, [nlApi]);

  // Dot indicators for podcasts
  useEffect(() => {
    if (!pcApi) return;
    setPcCount(pcApi.scrollSnapList().length);
    setPcCurrent(pcApi.selectedScrollSnap());
    pcApi.on("select", () => setPcCurrent(pcApi.selectedScrollSnap()));
  }, [pcApi]);

  const nlAutoplay = useRef(Autoplay({ delay: 8000, stopOnInteraction: false, stopOnMouseEnter: true }));
  const pcAutoplay = useRef(Autoplay({ delay: 8000, stopOnInteraction: false, stopOnMouseEnter: true }));

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-muted/20 to-accent/5" />
      <div className="absolute inset-0 backdrop-blur-sm border-y border-border/50" />

      <div className="relative z-10 container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center justify-center gap-2">
            <Bookmark className="w-5 h-5 text-primary" />
            What I Follow
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Newsletters and podcasts I learn from every week
          </p>

          {/* Toggle pills */}
          <div className="flex justify-center gap-2 mt-4">
            {(["newsletters", "podcasts"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setActiveView(v)}
                className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeView === v
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted"
                }`}
              >
                {v === "newsletters" ? "Newsletters" : "Podcasts"}
              </button>
            ))}
          </div>
        </div>

        {/* Newsletters carousel */}
        <div
          className={`transition-opacity duration-300 ${
            activeView === "newsletters" ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          <Carousel
            setApi={setNlApi}
            plugins={[nlAutoplay.current]}
            opts={{ loop: true, align: "start" }}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {NEWSLETTERS.map((nl) => (
                <CarouselItem key={nl.href} className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card className="p-4 h-full flex flex-col border-l-4 border-l-primary/60 bg-card/80 backdrop-blur-sm hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,212,170,0.1)] transition-all duration-300">
                    <h3 className="text-sm font-bold text-foreground">{nl.title}</h3>
                    {nl.byline && (
                      <p className="text-xs text-muted-foreground mt-0.5">{nl.byline}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1.5 flex-grow line-clamp-2">
                      {nl.blurb}
                    </p>
                    <a
                      href={nl.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary font-semibold mt-2 hover:underline inline-block"
                    >
                      Subscribe →
                    </a>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-10 bg-card/80 border-border hover:bg-card" />
            <CarouselNext className="hidden sm:flex -right-10 bg-card/80 border-border hover:bg-card" />
          </Carousel>
          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {Array.from({ length: nlCount }).map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === nlCurrent ? "bg-primary w-4" : "bg-muted-foreground/30"
                }`}
                onClick={() => nlApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Podcasts carousel */}
        <div
          className={`transition-opacity duration-300 ${
            activeView === "podcasts" ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          <Carousel
            setApi={setPcApi}
            plugins={[pcAutoplay.current]}
            opts={{ loop: true, align: "start" }}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {podcasts.map((podcast) => (
                <CarouselItem key={podcast.listen} className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3">
                  <a
                    href={podcast.listen}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                    aria-label={`Listen to ${podcast.title}`}
                  >
                    <Card className="p-4 h-full flex items-center gap-3 bg-card/80 backdrop-blur-sm border hover:border-primary hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(0,212,170,0.1)] transition-all duration-300 cursor-pointer">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-border">
                        {podcast.image ? (
                          <img
                            src={podcast.image}
                            alt={podcast.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-xl">
                            🎙
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{podcast.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{podcast.host}</p>
                      </div>
                    </Card>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-10 bg-card/80 border-border hover:bg-card" />
            <CarouselNext className="hidden sm:flex -right-10 bg-card/80 border-border hover:bg-card" />
          </Carousel>
          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {Array.from({ length: pcCount }).map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === pcCurrent ? "bg-primary w-4" : "bg-muted-foreground/30"
                }`}
                onClick={() => pcApi?.scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
