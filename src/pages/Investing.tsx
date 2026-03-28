import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, PiggyBank, BookOpen, LineChart, ArrowRight, Clock, Layers, GraduationCap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Helmet } from "react-helmet-async";

const Investing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Investing | Zain Adtani</title>
        <meta name="description" content="Simple steps to grow your money over time." />
      </Helmet>

      {/* Hero */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Investing</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Simple steps to grow your money over time
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">My Investment Philosophy</h2>
              <ul className="space-y-3 text-lg text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>I focus on simple steps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>I try to avoid risky surprises.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>I build habits that last.</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { Icon: Clock, emoji: "🕰️", title: "Long Term", desc: "Hold for years. Less stress." },
                { Icon: Target, emoji: "🎯", title: "Simple Plan", desc: "Pick a plan. Stick to it." },
                { Icon: Layers, emoji: "🧩", title: "Spread Risk", desc: "Do not bet on one thing." },
                { Icon: GraduationCap, emoji: "📚", title: "Keep Learning", desc: "Learn a little each week." },
              ].map((item) => (
                <Card key={item.title} className="p-5 text-center hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,212,170,0.15)] transition-all duration-300 rounded-xl">
                  <item.Icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-1">{item.emoji} {item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">Simple Tips</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="tip-1">
                <AccordionTrigger className="text-left">🟢 Start small</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  You do not need a lot of money to start. Even $10 a week adds up over time. Consistency wins.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tip-2">
                <AccordionTrigger className="text-left">💰 Save first, then invest</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Build an emergency fund before putting money in the market. This keeps you calm when prices drop.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tip-3">
                <AccordionTrigger className="text-left">🤔 Avoid stuff you do not understand</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  If you cannot explain it simply, skip it. Stick to things you understand well.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tip-4">
                <AccordionTrigger className="text-left">✂️ Fees matter. Keep them low.</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  High fees eat into your returns over time. Look for low-cost index funds and ETFs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tip-5">
                <AccordionTrigger className="text-left">🌱 Zoom out. Think long term.</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Markets go up and down. Do not panic. Look at the 10-year chart, not the daily one.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Banking & Brokerage */}
      <section className="py-12 md:py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8">My Banking & Brokerage</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Marcus", logo: "https://logo.clearbit.com/marcus.com", FallbackIcon: PiggyBank, desc: "High yield savings for emergencies and short term goals.", href: "https://www.marcus.com/share/ZAI-3SI-69TP", cta: "Open Account" },
              { name: "Fidelity", logo: "https://logo.clearbit.com/fidelity.com", FallbackIcon: LineChart, desc: "Main brokerage for stocks, ETFs, and retirement.", href: "https://fidelity.app.link/e/wKOQHcrcRVb", cta: "Open Account" },
              { name: "Robinhood", logo: "https://logo.clearbit.com/robinhood.com", FallbackIcon: TrendingUp, desc: "Commission free trading for stocks, ETFs, and crypto.", href: "https://join.robinhood.com/zaina113", cta: "Join" },
            ].map((b) => (
              <Card key={b.name} className="p-6 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(0,212,170,0.15)] transition-all duration-300 rounded-xl flex flex-col">
                <div className="h-12 mb-4 flex items-center">
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="h-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <b.FallbackIcon className="w-8 h-8 text-primary hidden" />
                </div>
                <h3 className="text-xl font-bold mb-2">{b.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{b.desc}</p>
                <Button asChild variant="outline" className="w-full group">
                  <a href={b.href} target="_blank" rel="noopener noreferrer">
                    {b.cta} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Options Trading */}
      <section className="py-12 md:py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Master Options Trading</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Options offer leverage, flexibility, and protection.</p>
                <p>Use them to hedge, generate income, or express a view.</p>
                <p>This course breaks down calls, puts, spreads, and real strategies.</p>
              </div>
            </div>
            <Card className="p-6 hover-lift transition-all duration-300 rounded-xl">
              <LineChart className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Complete Options Course</h3>
              <p className="text-sm text-muted-foreground mb-4">From beginner to advanced. Clear lessons and examples.</p>
              <Button asChild className="w-full group">
                <a href="https://www.udemy.com/course/the-completecomplete-options-course-calls-puts-long-short/?couponCode=MT251006G3" target="_blank" rel="noopener noreferrer">
                  Get the Course <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Investing;
