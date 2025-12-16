import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, FileText, Users, ExternalLink, ArrowLeft, Award, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import engineerToEABanner2 from "@/assets/engineer-to-ea-banner-2.png";

const LegacyEATax = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Legacy EA & Tax Hub | Zain Adtani</title>
        <meta
          name="description"
          content="Archive of Enrolled Agent, tax study, and bookkeeping resources from my EA study era. Free courses, study tools, and QuickBooks notes."
        />
      </Helmet>

      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-yellow-500/10 via-background to-amber-500/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="text-center">
            <Badge variant="secondary" className="mb-4">Legacy Archive</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Legacy EA & Tax Hub
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This is the archive of my Enrolled Agent, tax, and bookkeeping era. If you found me through those projects, all the resources still live here for you. My main focus now is helping tiny businesses build simple sites, but you are welcome to use any of these legacy study tools and notes.
            </p>
          </div>
        </div>
      </section>

      {/* EA Exam & Study Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">EA Exam & Study</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Engineer to EA Course */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2">
              <div className="flex items-start gap-4">
                <Award className="w-10 h-10 text-yellow-500 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Engineer to Enrolled Agent Part 1</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Legacy free course from my EA study journey. Step-by-step lessons covering individuals taxation for the Special Enrollment Examination.
                  </p>
                  <Button asChild className="w-full">
                    <a href="https://whop.com/eng2ea/?a=eng2ea" target="_blank" rel="noopener noreferrer">
                      Access Free Course <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>

            {/* EA Study Hub */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2">
              <div className="flex items-start gap-4">
                <BookOpen className="w-10 h-10 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">EA Study Hub</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Legacy EA study resources — notes, domain breakdowns, practice tools, and study systems.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/enrolled-agent">
                      Open Study Hub <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* EA Study Chatbot */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2">
              <div className="flex items-start gap-4">
                <FileText className="w-10 h-10 text-accent flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">EA Study Chatbot</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI-powered study assistant for EA exam prep. Ask questions about tax topics and get clear explanations.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/projects/ea-study-chatbot">
                      Try the Chatbot <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* EA GPT */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🤖</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">EA GPT</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Friendly Enrolled Agent study coach. Answers tax questions in plain language and turns exam topics into practice drills.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a href="https://chatgpt.com/g/g-68e11a2ec4688191a07e8f83eef33861-ea-gpt" target="_blank" rel="noopener noreferrer">
                      Open on ChatGPT <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Tax & Bookkeeping Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Tax & Bookkeeping</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* QuickBooks Resources */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📊</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">QuickBooks Resources</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    QuickBooks and bookkeeping notes from my learning phase. Setup guides, cleanup tips, and best practices.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/quickbooks">
                      View QuickBooks Hub <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Tax Resources */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2">
              <div className="flex items-start gap-4">
                <span className="text-3xl">📋</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Tax Tools & Checklists</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tax preparation tools, IRS resource links, and study checklists from my exam prep days.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/resources">
                      Browse Resources <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Community</h2>
          </div>

          <Card className="p-8 md:p-10 border-2 shadow-lg bg-background/90 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Visual / Cover Images */}
              <div className="md:col-span-1 space-y-4">
                <div className="rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg">
                  <img
                    src={engineerToEABanner2}
                    alt="Engineer to Enrolled Agent - Community Cover"
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                <div
                  className="relative rounded-2xl overflow-hidden border-2 border-accent/40 bg-gradient-to-br from-yellow-300/40 via-yellow-200/30 to-yellow-100/40 dark:from-yellow-400/20 dark:via-yellow-300/15 dark:to-yellow-200/10"
                >
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-300/30 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="aspect-[16/10] flex items-center justify-center p-6">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 tracking-wide">
                        Engineer → Enrolled Agent
                      </p>
                      <p className="text-xl md:text-2xl font-extrabold text-yellow-900 dark:text-yellow-100 mt-1">
                        Free Community
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-2">
                <Badge variant="outline" className="mb-3">Legacy Resource</Badge>
                
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300/70 dark:bg-yellow-900/30 dark:text-yellow-100 dark:border-yellow-700/50">
                    ✅ Free to join
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300/70 dark:bg-yellow-900/30 dark:text-yellow-100 dark:border-yellow-700/50">
                    📚 Short lessons
                  </span>
                  <span className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 border border-yellow-300/70 dark:bg-yellow-900/30 dark:text-yellow-100 dark:border-yellow-700/50">
                    🧠 Study systems
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  Engineer → Enrolled Agent (Free Community)
                </h3>
                <p className="text-muted-foreground mt-2">
                  This is a legacy community from my EA study phase. Short lessons, no fluff. Study tips, resources, and support—built for busy beginners and career switchers.
                </p>

                <ul className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">🟡</span>
                    <span>EA Part 1 bite-size lessons & weekly practice prompts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">🟡</span>
                    <span>Printable tools: one-pagers, flowcharts, study planners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">🟡</span>
                    <span>Author templates: outlines, chapter kits, publishing shortcuts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">🟡</span>
                    <span>Friendly accountability to keep you consistent</span>
                  </li>
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold border-2 border-yellow-600/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <a href="https://www.skool.com/eng2ea/about" target="_blank" rel="noopener noreferrer">
                      Join Free →
                    </a>
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    100% free • No spam • Cancel anytime
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <Link to="/" className="text-primary hover:underline">
            ← Back to Main Site
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            © {new Date().getFullYear()} Zain Education Ventures. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LegacyEATax;
