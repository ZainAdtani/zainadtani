import { useState } from "react";
import { Link } from "react-router-dom";
import { EAGame } from "@/components/EAGame";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TryTaxQuestCTA from "@/components/TryTaxQuestCTA";
import { LINKS } from "@/config/links";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Gamepad2, 
  Music, 
  BookOpen, 
  Users, 
  Play,
  Rocket,
  Sparkles,
  Award,
  ChevronRight,
  FileText
} from "lucide-react";

const EnrolledAgent = () => {
  const [showGame, setShowGame] = useState(false);
  const [playingPlaylist, setPlayingPlaylist] = useState<string | null>(null);

  const playlists = [
    {
      id: "part1",
      title: "Part 1: Individuals",
      topics: "Filing Status, Exemptions, Income, Deductions",
      url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3rxVfibe1L0"
    },
    {
      id: "part2",
      title: "Part 2: Businesses",
      topics: "Business Income, Expenses, Corporate Tax",
      url: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO"
    },
    {
      id: "part3",
      title: "Part 3: Representation",
      topics: "Practice & Procedures, Ethics, Circular 230",
      url: "https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20 pb-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-dashed border-primary rounded-full animate-pulse" />
          <div className="absolute top-32 right-20 w-24 h-24 border-2 border-dashed border-accent rounded-lg rotate-12" />
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-dashed border-secondary rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-12 h-12 text-primary" />
              <Sparkles className="w-8 h-8 text-accent animate-pulse" />
              <Rocket className="w-10 h-10 text-secondary" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Enrolled Agent Study Hub
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Resources, lessons, and a playable practice game to prep smarter for the EA exam.
            </p>

            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <Sparkles className="w-6 h-6 text-primary" />
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Tax Quest CTA */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <TryTaxQuestCTA />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          
          {/* Section 1: EA Quest */}
          <Card id="ea-quest" className="relative border-2 border-dashed border-primary/40 p-8 hover:border-primary transition-all hover-lift bg-card">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Gamepad2 className="w-6 h-6 text-primary-foreground" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground mt-2">EA Quest</h2>
              <p className="text-muted-foreground">
                Test your knowledge with interactive trivia! Master EA fundamentals 
                through our gamified learning experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={() => setShowGame(!showGame)}
                  className="flex-1 group"
                  size="lg"
                >
                  {showGame ? "Hide Quest" : "Start Quest (Embedded)"}
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  <a
                    href={LINKS.TAX_QUEST}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Tax Quest (Full App) ↗
                  </a>
                </Button>
              </div>
              
              {showGame && (
                <div className="mt-6 border-2 border-dashed border-primary/20 rounded-lg p-4 bg-background/50">
                  <EAGame />
                </div>
              )}
            </div>
          </Card>

          {/* Section 2: Study Soundtracks */}
          <Card id="study-soundtracks" className="relative border-2 border-dashed border-accent/40 p-8 hover:border-accent transition-all hover-lift bg-card">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
              <Music className="w-6 h-6 text-accent-foreground" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground mt-2">Study Soundtracks</h2>
              <p className="text-muted-foreground">
                Focus playlists organized by EA exam chapters. Study smarter with 
                curated background music.
              </p>
              
              <div className="space-y-3 pt-2">
                {playlists.map((playlist) => (
                  <div key={playlist.id} className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-between group"
                      onClick={() => setPlayingPlaylist(
                        playingPlaylist === playlist.id ? null : playlist.id
                      )}
                    >
                      <div className="text-left">
                        <div className="font-semibold">{playlist.title}</div>
                        <div className="text-xs text-muted-foreground">{playlist.topics}</div>
                      </div>
                      <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </Button>
                    
                    {playingPlaylist === playlist.id && (
                      <div className="animate-fade-in">
                        <iframe
                          src={playlist.url}
                          width="100%"
                          height="152"
                          frameBorder="0"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          className="rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Section 3: EA Learning Resources */}
          <Card id="learning-materials" className="relative border-2 border-dashed border-secondary/40 p-8 hover:border-secondary transition-all hover-lift bg-card">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-secondary rounded-full flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-secondary-foreground" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold text-foreground mt-2">Learning Materials</h2>
                <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-semibold">
                  Course
                </span>
              </div>
              
              <p className="text-muted-foreground">
                Comprehensive courses, study guides, and reference materials 
                to help you ace the EA exam.
              </p>
              
              <div className="space-y-2 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span>Video course modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span>Downloadable study guides</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span>Practice exams</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span>Flashcard decks</span>
                </div>
              </div>
              
              <Button asChild className="w-full">
                <a
                  href="https://whop.com/eng2ea/?a=eng2ea"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to Engineer → EA (Part 1) →
                </a>
              </Button>
            </div>
          </Card>

          {/* Section 4: EA Community & Tools */}
          <Card id="community-tools" className="relative border-2 border-dashed border-primary/40 p-8 hover:border-primary transition-all hover-lift bg-card">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold text-foreground mt-2">Community & Tools</h2>
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                  Live
                </span>
              </div>
              
              <p className="text-muted-foreground">
                Connect with fellow EA candidates and access powerful study tools 
                to enhance your preparation.
              </p>
              
              <div className="space-y-2 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Discussion forums</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Study groups</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Tax calculators</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Progress tracking</span>
                </div>
              </div>
              
              <Button asChild variant="outline" className="w-full">
                <a
                  href="https://www.skool.com/eng2ea/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join on Skool →
                </a>
              </Button>
            </div>
          </Card>

        </div>
      </section>

      {/* EA Part 1 — Domains Overview Accordion */}
      <section id="ea-part-1" className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <Card className="rounded-2xl shadow-lg border-2 border-primary/20 p-8 bg-card ea-domains-accordion">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-3">
                🧩 EA Part 1 — <span className="text-primary">Domains Overview</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Skim the fun overview, then dive into the lessons when you're ready.
              </p>
            </div>

            <Accordion type="multiple" className="space-y-4">
              {/* Domain 1: Preliminary Work & Taxpayer Data */}
              <AccordionItem 
                id="domain-1-preliminary" 
                value="domain-1" 
                className="border-2 border-primary/20 rounded-lg px-6 bg-background/50"
              >
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">
                  Domain 1: Preliminary Work & Taxpayer Data
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 space-y-3">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                    <li>Understanding filing requirements and taxpayer identification</li>
                    <li>Determining filing status (Single, MFJ, MFS, HOH, QSS)</li>
                    <li>Dependency rules and exemptions</li>
                    <li>Recordkeeping requirements and substantiation</li>
                    <li>Tax year accounting periods and methods</li>
                  </ul>
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 text-primary hover:underline mt-4 font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    View sample lesson →
                  </a>
                </AccordionContent>
              </AccordionItem>

              {/* Domain 2: Income & Assets */}
              <AccordionItem 
                id="domain-2-income" 
                value="domain-2" 
                className="border-2 border-primary/20 rounded-lg px-6 bg-background/50"
              >
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">
                  Domain 2: Income & Assets
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 space-y-3">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                    <li>Wages, salaries, tips, and other compensation</li>
                    <li>Interest and dividend income reporting</li>
                    <li>Business and self-employment income</li>
                    <li>Capital gains and losses, basis calculations</li>
                    <li>Rental real estate, royalties, and passive activities</li>
                    <li>Retirement income (pensions, IRAs, Social Security)</li>
                  </ul>
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 text-primary hover:underline mt-4 font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    View sample lesson →
                  </a>
                </AccordionContent>
              </AccordionItem>

              {/* Domain 3: Deductions & Credits */}
              <AccordionItem 
                id="domain-3-deductions" 
                value="domain-3" 
                className="border-2 border-primary/20 rounded-lg px-6 bg-background/50"
              >
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">
                  Domain 3: Deductions & Credits
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 space-y-3">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                    <li>Standard deduction vs. itemized deductions</li>
                    <li>Medical and dental expenses, state and local taxes</li>
                    <li>Mortgage interest, charitable contributions</li>
                    <li>Business expenses and self-employment deductions</li>
                    <li>Education credits (American Opportunity, Lifetime Learning)</li>
                    <li>Child Tax Credit, Earned Income Credit, and other credits</li>
                  </ul>
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 text-primary hover:underline mt-4 font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    View sample lesson →
                  </a>
                </AccordionContent>
              </AccordionItem>

              {/* Domain 4: Taxation, Payments & Specialty Returns */}
              <AccordionItem 
                id="domain-4-taxation" 
                value="domain-4" 
                className="border-2 border-primary/20 rounded-lg px-6 bg-background/50"
              >
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">
                  Domain 4: Taxation, Payments & Specialty Returns
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 space-y-3">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                    <li>Tax calculation and alternative minimum tax (AMT)</li>
                    <li>Self-employment tax and estimated tax payments</li>
                    <li>Withholding requirements and penalties</li>
                    <li>Net Investment Income Tax (NIIT)</li>
                    <li>Estate and trust income tax basics</li>
                    <li>Gift tax fundamentals and reporting</li>
                  </ul>
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 text-primary hover:underline mt-4 font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    View sample lesson →
                  </a>
                </AccordionContent>
              </AccordionItem>

              {/* Domain 5: Specialized Returns for Business */}
              <AccordionItem 
                id="domain-5-specialized" 
                value="domain-5" 
                className="border-2 border-primary/20 rounded-lg px-6 bg-background/50"
              >
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">
                  Domain 5: Specialized Returns for Business
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 space-y-3">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                    <li>Sole proprietorships and Schedule C</li>
                    <li>Partnerships (Form 1065) and K-1 reporting</li>
                    <li>S Corporations and pass-through taxation</li>
                    <li>C Corporations and corporate tax returns</li>
                    <li>Depreciation, Section 179, and bonus depreciation</li>
                    <li>Business tax credits and incentives</li>
                  </ul>
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 text-primary hover:underline mt-4 font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    View sample lesson →
                  </a>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </section>

      {/* EA Part 2 — Domains Overview Accordion */}
      <section id="ea-part-2" className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <Card className="rounded-2xl shadow-lg border-2 border-primary/20 p-8 bg-card ea-domains-accordion">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-3">
                🧩 EA Part 2 — <span className="text-primary">Domains Overview</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Quick overview of business tax areas you'll see on the exam.
              </p>
            </div>

            <Accordion type="multiple" className="space-y-4">
              {/* Business Entities & Taxation */}
              <AccordionItem
                id="p2-domain-1-entities"
                value="p2-domain-1"
                className="border-2 border-primary/20 rounded-lg px-6 bg-background/50"
              >
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">
                  Domain 1: Business Entities & Taxation
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 space-y-3">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                    <li>Sole proprietorships (Sch C) and QBI overview</li>
                    <li>Partnerships (Form 1065), basis, capital accounts, K-1s</li>
                    <li>S Corporations (Form 1120-S), reasonable comp, AAA</li>
                    <li>C Corporations (Form 1120), dividends, NOLs</li>
                    <li>Entity selection considerations & elections (2553, 8832)</li>
                  </ul>
                  <a href="#" className="inline-flex items-center gap-2 text-primary hover:underline mt-4 font-medium">
                    <FileText className="w-4 h-4" />
                    View sample lesson →
                  </a>
                </AccordionContent>
              </AccordionItem>

              {/* Income, Expenses & Accounting */}
              <AccordionItem
                id="p2-domain-2-income-expenses"
                value="p2-domain-2"
                className="border-2 border-primary/20 rounded-lg px-6 bg-background/50"
              >
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">
                  Domain 2: Income, Expenses & Accounting
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 space-y-3">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                    <li>Gross receipts, cost of goods sold (COGS)</li>
                    <li>Ordinary & necessary expenses, Section 162</li>
                    <li>Meals, travel, auto, home office rules</li>
                    <li>Accounting methods: cash vs. accrual, UNICAP basics</li>
                    <li>1099 compliance and worker classification</li>
                  </ul>
                  <a href="#" className="inline-flex items-center gap-2 text-primary hover:underline mt-4 font-medium">
                    <FileText className="w-4 h-4" />
                    View sample lesson →
                  </a>
                </AccordionContent>
              </AccordionItem>

              {/* Depreciation & Credits */}
              <AccordionItem
                id="p2-domain-3-depr-credits"
                value="p2-domain-3"
                className="border-2 border-primary/20 rounded-lg px-6 bg-background/50"
              >
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">
                  Domain 3: Depreciation & Credits
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 space-y-3">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                    <li>MACRS, listed property, luxury auto limits</li>
                    <li>Section 179 vs. bonus depreciation</li>
                    <li>Disposition, §1231/§1245/§1250 recapture</li>
                    <li>Common business credits (WOTC, R&D basics)</li>
                  </ul>
                  <a href="#" className="inline-flex items-center gap-2 text-primary hover:underline mt-4 font-medium">
                    <FileText className="w-4 h-4" />
                    View sample lesson →
                  </a>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </section>

      {/* EA Part 3 — Domains Overview Accordion */}
      <section id="ea-part-3" className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <Card className="rounded-2xl shadow-lg border-2 border-primary/20 p-8 bg-card ea-domains-accordion">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-3">
                🧩 EA Part 3 — <span className="text-primary">Domains Overview</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Key areas for representation, ethics, and IRS procedure.
              </p>
            </div>

            <Accordion type="multiple" className="space-y-4">
              {/* Representation & Power of Attorney */}
              <AccordionItem
                id="p3-domain-1-rep"
                value="p3-domain-1"
                className="border-2 border-primary/20 rounded-lg px-6 bg-background/50"
              >
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">
                  Domain 1: Representation & Power of Attorney
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 space-y-3">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                    <li>POA (Form 2848), disclosure (8821), CAF basics</li>
                    <li>Authorization scope, revocation, best practices</li>
                    <li>Practice before the IRS: rights & limitations</li>
                  </ul>
                  <a href="#" className="inline-flex items-center gap-2 text-primary hover:underline mt-4 font-medium">
                    <FileText className="w-4 h-4" />
                    View sample lesson →
                  </a>
                </AccordionContent>
              </AccordionItem>

              {/* Exams, Appeals & Collections */}
              <AccordionItem
                id="p3-domain-2-procedures"
                value="p3-domain-2"
                className="border-2 border-primary/20 rounded-lg px-6 bg-background/50"
              >
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">
                  Domain 2: Examinations, Appeals & Collections
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 space-y-3">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                    <li>Audit process, IDRs, interview & documentation</li>
                    <li>Appeals basics, protest letters, hazards of litigation</li>
                    <li>Collections: notices, liens, levies, installment agreements</li>
                    <li>Offers in Compromise, currently not collectible</li>
                  </ul>
                  <a href="#" className="inline-flex items-center gap-2 text-primary hover:underline mt-4 font-medium">
                    <FileText className="w-4 h-4" />
                    View sample lesson →
                  </a>
                </AccordionContent>
              </AccordionItem>

              {/* Ethics & Circular 230 */}
              <AccordionItem
                id="p3-domain-3-ethics"
                value="p3-domain-3"
                className="border-2 border-primary/20 rounded-lg px-6 bg-background/50"
              >
                <AccordionTrigger className="text-xl font-semibold hover:no-underline py-4">
                  Domain 3: Ethics & Circular 230
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4 space-y-3">
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                    <li>Standards: due diligence, competence, conflicts</li>
                    <li>Sanctions, disciplinary proceedings</li>
                    <li>Advertising, contingent fees, written advice</li>
                    <li>Recordkeeping & client communications</li>
                  </ul>
                  <a href="#" className="inline-flex items-center gap-2 text-primary hover:underline mt-4 font-medium">
                    <FileText className="w-4 h-4" />
                    View sample lesson →
                  </a>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </section>

      {/* Tax Quest CTA - Bottom */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <TryTaxQuestCTA />
          
          <div className="text-center">
            <Link to="/">
              <Button variant="outline" size="lg" className="group">
                <ChevronRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Zain Education Ventures.</p>
        </div>
      </footer>
    </div>
  );
};

export default EnrolledAgent;
