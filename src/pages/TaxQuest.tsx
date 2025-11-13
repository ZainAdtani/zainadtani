import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { LINKS } from "@/config/links";
import {
  Award,
  Sparkles,
  Rocket,
  ChevronRight,
  Trophy,
  Target,
  Briefcase,
  Scale,
  Star,
  Clock,
  Zap,
  TrendingUp,
  CheckCircle2,
  User,
} from "lucide-react";

const TaxQuest = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [missionRevealed, setMissionRevealed] = useState(false);
  const [checklist, setChecklist] = useState({
    irsAccount: false,
    studyGuide: false,
    examWindow: false,
    scheduledPart1: false,
  });

  const stages = [
    {
      level: 0,
      name: "Civilian",
      goal: "Understand what an Enrolled Agent is and how taxes work at a basic level",
      icon: User,
    },
    {
      level: 1,
      name: "Rookie Preparer",
      goal: "Learn enough individual tax to handle simple returns and EA Part 1",
      icon: Target,
    },
    {
      level: 2,
      name: "Business Specialist",
      goal: "Learn small business tax and entities for EA Part 2",
      icon: Briefcase,
    },
    {
      level: 3,
      name: "IRS Defender",
      goal: "Learn representation, ethics, and procedures for EA Part 3",
      icon: Scale,
    },
    {
      level: 4,
      name: "Working EA",
      goal: "Build a basic plan to get clients, set prices, and keep learning",
      icon: Trophy,
    },
  ];

  const acts = [
    {
      id: 0,
      title: "Act 0: Welcome to Tax Quest",
      goal: "Decide if EA is the right path",
      time: "2 to 3 hours",
      chapters: [
        "What is an Enrolled Agent",
        "EA vs CPA vs other paths",
        "SEE exam overview",
        "Roadmap from today to passing",
      ],
    },
    {
      id: 1,
      title: "Act 1: Individuals (EA Part 1)",
      goal: "Understand a basic Form 1040",
      time: "3 to 4 hours",
      chapters: [
        "Who must file",
        "Filing status",
        "Dependents",
        "Income basics",
        "Adjustments and deductions",
        "Credits",
        "Capital gains basics",
        "Practice exam block",
      ],
    },
    {
      id: 2,
      title: "Act 2: Businesses (EA Part 2)",
      goal: "Understand core business forms and flows",
      time: "3 to 4 hours",
      chapters: [
        "Sole proprietors and Schedule C",
        "Partnership basics",
        "S corporation basics",
        "C corporation overview",
        "Depreciation and Section 179 basics",
        "Payroll and self employment tax basics",
        "Practice exam block",
      ],
    },
    {
      id: 3,
      title: "Act 3: Representation, Ethics, Procedures (EA Part 3)",
      goal: "Learn how to stand between client and IRS",
      time: "2 to 4 hours",
      chapters: [
        "Your power as an EA",
        "Circular 230 and ethics",
        "Notices and letters",
        "Audits",
        "Collections and payment plans",
        "Practice exam block",
      ],
    },
    {
      id: 4,
      title: "Act 4: Launch as a Working EA",
      goal: "First real steps to get paid work",
      time: "2 to 3 hours",
      chapters: [
        "Registering PTIN",
        "Picking software",
        "Picking a niche",
        "Offer and pricing examples",
        "How to run a first client call",
        "Plan your first 90 days",
      ],
    },
  ];

  const checklistItems = [
    { id: "irsAccount", label: "Created IRS account" },
    { id: "studyGuide", label: "Bought an EA study guide" },
    { id: "examWindow", label: "Picked an exam window" },
    { id: "scheduledPart1", label: "Scheduled Part 1" },
  ];

  const totalChecked = Object.values(checklist).filter(Boolean).length;
  const realProgressPercent = (totalChecked / checklistItems.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Tax Quest | Enrolled Agent Study Hub</title>
        <meta
          name="description"
          content="Turn EA prep into a game. Start as a complete beginner. Finish with a clear plan to pass the EA exam and help real people with their taxes."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20 pb-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-dashed border-primary rounded-full animate-pulse" />
          <div className="absolute top-32 right-20 w-24 h-24 border-2 border-dashed border-accent rounded-lg rotate-12" />
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-dashed border-secondary rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-12 h-12 text-primary" />
              <Sparkles className="w-8 h-8 text-accent animate-pulse" />
              <Rocket className="w-10 h-10 text-secondary" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Tax Quest: Turn EA Prep Into A Game
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start as a complete beginner. Finish with a clear plan to pass the EA exam and help real people with
              their taxes.
            </p>

            <div className="flex flex-col items-center gap-4 pt-6">
              <Button asChild size="lg" className="text-lg px-8 py-6 group">
                <a href={LINKS.TAX_QUEST} target="_blank" rel="noopener noreferrer">
                  Start Tax Quest
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>

              <Link to="/enrolled-agent" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                ← Back to Study Hub
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 pt-4">
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <Sparkles className="w-6 h-6 text-primary" />
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Progress Path Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Your Progress Path</h2>
            <p className="text-muted-foreground">Click any stage to preview your journey</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stages.map((stage) => {
              const StageIcon = stage.icon;
              const isActive = currentStage === stage.level;
              const isPast = currentStage > stage.level;

              return (
                <Card
                  key={stage.level}
                  className={`p-6 cursor-pointer transition-all hover-lift ${
                    isActive ? "border-2 border-primary shadow-lg" : isPast ? "border border-accent/50" : "border-dashed"
                  }`}
                  onClick={() => setCurrentStage(stage.level)}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <Badge variant={isActive ? "default" : "outline"} className="text-sm">
                      Stage {stage.level}
                    </Badge>
                    <StageIcon className={`w-10 h-10 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    <h3 className="font-bold text-lg">{stage.name}</h3>
                    <p className="text-sm text-muted-foreground leading-snug">{stage.goal}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Acts and Chapters Section */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Acts & Chapters</h2>
              <p className="text-muted-foreground">Five acts, each with clear goals and checkpoints</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {acts.map((act) => (
                <Card key={act.id} className="p-6 hover-lift border-2 border-dashed border-primary/30 hover:border-primary transition-all">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{act.title}</h3>
                      <p className="text-sm text-muted-foreground">{act.goal}</p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Estimated time: {act.time}</span>
                    </div>

                    <ul className="space-y-2">
                      {act.chapters.map((chapter, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span>{chapter}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Mission Loop Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Core Mission Loop</h2>
            <p className="text-muted-foreground">Every mission follows a simple five step pattern</p>
          </div>

          <Card className="p-8 border-2 border-dashed border-secondary/40">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Setup</h4>
                    <p className="text-sm text-muted-foreground">Read the client situation</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Learn</h4>
                    <p className="text-sm text-muted-foreground">Review the quick reference material</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Decide</h4>
                    <p className="text-sm text-muted-foreground">Choose your answer from the options</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Result</h4>
                    <p className="text-sm text-muted-foreground">See if you got it right</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                    5
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Reflect</h4>
                    <p className="text-sm text-muted-foreground">Read the explanation and earn XP</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h4 className="font-bold text-foreground mb-3">Example Scenario</h4>
                <div className="bg-background/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      M
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Maria</p>
                      <p className="text-sm text-muted-foreground">Single mom with one child, asks about child tax credit</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic pt-2">
                    "Does Maria qualify for the Child Tax Credit and why?"
                  </p>
                  <p className="text-xs text-muted-foreground pt-2">
                    ✓ Result: Maria qualifies. The child meets age and residency requirements.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Sample Mission Preview */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Sample Mission</h2>
              <p className="text-muted-foreground">Try a quick preview of how missions work</p>
            </div>

            <Card className="p-8 border-2 border-primary/30">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg flex-shrink-0">
                    M
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground">Maria Rodriguez</h3>
                    <p className="text-sm text-muted-foreground">
                      Single mom, one 8 year old child, modified AGI of $65,000, child lived with her all year
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="font-semibold text-foreground">Does Maria qualify for the Child Tax Credit?</p>

                  <div className="space-y-2">
                    <button className="w-full text-left p-3 rounded-lg border-2 border-border hover:border-primary transition-colors">
                      <span className="font-semibold text-foreground">A)</span> Maria qualifies for the Child Tax Credit
                    </button>
                    <button className="w-full text-left p-3 rounded-lg border-2 border-border hover:border-primary transition-colors">
                      <span className="font-semibold text-foreground">B)</span> Maria does not qualify because her child is
                      too old
                    </button>
                    <button className="w-full text-left p-3 rounded-lg border-2 border-border hover:border-primary transition-colors">
                      <span className="font-semibold text-foreground">C)</span> Maria does not qualify because income is
                      too high
                    </button>
                  </div>
                </div>

                <Button onClick={() => setMissionRevealed(!missionRevealed)} variant="outline" className="w-full">
                  {missionRevealed ? "Hide Answer" : "Reveal Answer"}
                </Button>

                {missionRevealed && (
                  <div className="animate-fade-in space-y-4 border-t border-border pt-6">
                    <div className="bg-primary/10 rounded-lg p-4">
                      <p className="font-bold text-primary mb-2">✓ Correct Answer: A</p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Child is under 17 at end of year (8 years old qualifies)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Child lived with Maria for more than half the year (all year qualifies)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>Income of $65,000 is well below the phaseout threshold for Head of Household filers</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Mission XP</span>
                        <span className="font-bold text-primary">+100 XP</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Game Mechanics Teaser */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Game Mechanics</h2>
            <p className="text-muted-foreground">Progress systems that keep you moving forward</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover-lift">
              <Clock className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Short Sessions</h3>
              <p className="text-sm text-muted-foreground">Most missions take 5 to 10 minutes</p>
            </Card>

            <Card className="p-6 text-center hover-lift">
              <TrendingUp className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Levels & XP</h3>
              <p className="text-sm text-muted-foreground mb-3">Progress through ranks</p>
              <div className="flex flex-wrap gap-1 justify-center text-xs">
                <Badge variant="outline">Tax Tourist</Badge>
                <Badge variant="outline">Preparer in Training</Badge>
                <Badge variant="outline">EA in Action</Badge>
              </div>
            </Card>

            <Card className="p-6 text-center hover-lift">
              <Award className="w-10 h-10 text-secondary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Badges</h3>
              <p className="text-sm text-muted-foreground mb-3">Unlock achievements</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div>🔍 Dependents Detective</div>
                <div>⚖️ Audit Whisperer</div>
                <div>📄 First 1040 Filed</div>
              </div>
            </Card>

            <Card className="p-6 text-center hover-lift">
              <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Streaks</h3>
              <p className="text-sm text-muted-foreground mb-3">Build momentum</p>
              <div className="flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-accent" />
                <span className="font-bold text-2xl text-foreground">4</span>
                <span className="text-sm text-muted-foreground">day streak</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Real World Progress Checklist */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Real World Progress</h2>
              <p className="text-muted-foreground">Track actual steps toward becoming a working EA</p>
            </div>

            <Card className="p-8">
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-foreground">Game Progress</h3>
                      <span className="text-sm text-muted-foreground">850 / 1000 XP</span>
                    </div>
                    <Progress value={85} className="h-3" />
                    <p className="text-xs text-muted-foreground">85% through current level</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-foreground">Real Steps</h3>
                      <span className="text-sm text-muted-foreground">
                        {totalChecked} / {checklistItems.length}
                      </span>
                    </div>
                    <Progress value={realProgressPercent} className="h-3" />
                    <p className="text-xs text-muted-foreground">{Math.round(realProgressPercent)}% of key milestones complete</p>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-border">
                  <h3 className="font-bold text-foreground mb-4">Your EA Launch Checklist</h3>
                  {checklistItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox
                        id={item.id}
                        checked={checklist[item.id as keyof typeof checklist]}
                        onCheckedChange={(checked) =>
                          setChecklist((prev) => ({ ...prev, [item.id]: checked === true }))
                        }
                      />
                      <label
                        htmlFor={item.id}
                        className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <Card className="p-8 md:p-12 border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <Trophy className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Quest?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              No login required. Mobile friendly. Jump in and start building your tax knowledge today.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6 group">
              <a href={LINKS.TAX_QUEST} target="_blank" rel="noopener noreferrer">
                Launch Tax Quest
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default TaxQuest;
