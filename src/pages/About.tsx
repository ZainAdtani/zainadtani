import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Youtube, Linkedin } from "lucide-react";
import zainHeadshot from "@/assets/zain-headshot-new.png";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Hero Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                From{" "}
                <span className="text-primary">Engineer</span>
                {" "}to{" "}
                <span className="text-accent">Enrolled Agent</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Helping busy beginners navigate the complex world of taxes with confidence
              </p>
            </div>

            {/* Biography Section */}
            <Card className="p-6 space-y-4 hover-lift">
              <h2 className="text-2xl font-bold text-foreground">My Journey</h2>
              <p className="text-muted-foreground leading-relaxed">
                I started my career as an engineer, solving complex technical problems and building systems. 
                But I discovered my true passion was in helping people understand and navigate the intricate 
                world of taxation. After earning my Enrolled Agent license, I dedicated myself to making tax 
                knowledge accessible to everyone.
              </p>
            </Card>

            {/* Mission Section */}
            <Card className="p-6 space-y-4 hover-lift">
              <h2 className="text-2xl font-bold text-foreground">My Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                I believe that understanding taxes shouldn't be overwhelming. My mission is to break down 
                complex tax concepts into simple, actionable steps. Whether you're just starting out or 
                looking to level up your tax knowledge, I'm here to guide you through every step of the journey.
              </p>
            </Card>

            {/* Approach Section */}
            <Card className="p-6 space-y-4 hover-lift">
              <h2 className="text-2xl font-bold text-foreground">My Approach</h2>
              <p className="text-muted-foreground leading-relaxed">
                I combine my engineering mindset with practical tax expertise to create clear, structured 
                learning paths. Through my community, courses, and resources, I focus on building your 
                confidence and competence in handling tax matters with ease and precision.
              </p>
            </Card>

            {/* Achievements */}
            <Card className="p-6 space-y-4 hover-lift">
              <h2 className="text-2xl font-bold text-foreground">Credentials & Achievements</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>IRS Enrolled Agent (EA) - Licensed to represent taxpayers before the IRS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>QuickBooks ProAdvisor Level 2 Certified</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>AWS Certified Cloud Practitioner</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Former Engineer with technical problem-solving expertise</span>
                </li>
              </ul>
            </Card>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                <a
                  href="https://youtube.com/@zainadtani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Youtube className="h-5 w-5" />
                  YouTube Channel
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="hover-scale"
              >
                <a
                  href="https://linkedin.com/in/zainadtani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Linkedin className="h-5 w-5" />
                  Connect on LinkedIn
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - Photo */}
          <div className="lg:sticky lg:top-24 animate-fade-in">
            <div className="relative">
              {/* Accent border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-2xl blur-xl opacity-30 animate-pulse" />
              <div className="relative border-4 border-accent rounded-2xl overflow-hidden shadow-2xl hover-scale">
                <img
                  src={zainHeadshot}
                  alt="Zain Adtani"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Stats Card */}
            <Card className="mt-8 p-6 space-y-4 hover-lift">
              <h3 className="text-xl font-bold text-foreground">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary">IRS</div>
                  <div className="text-sm text-muted-foreground">Enrolled Agent</div>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-3xl font-bold text-accent">QB</div>
                  <div className="text-sm text-muted-foreground">ProAdvisor L2</div>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary">AWS</div>
                  <div className="text-sm text-muted-foreground">Cloud Certified</div>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-3xl font-bold text-accent">∞</div>
                  <div className="text-sm text-muted-foreground">Lifelong Learner</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Zain Adtani. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
