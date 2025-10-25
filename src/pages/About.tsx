import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Youtube, Linkedin } from "lucide-react";
import zainHeadshot from "@/assets/zain-headshot-new.png";
import zainSimba from "@/assets/zain-simba.png";
import chrisHaroun from "@/assets/chris-haroun.png";
import trentShelton from "@/assets/trent-shelton.png";
const About = () => {
  return <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            {/* Hero Headline */}
            <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Hi, I'm <span className="text-primary">Zain Adtani</span>
            </h1>
            
              
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
          </div>

          {/* Right Column - Photos */}
          <div className="lg:sticky lg:top-24 animate-fade-in space-y-8">
            {/* Main Professional Photo */}
            <div className="relative">
              {/* Accent border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-2xl blur-xl opacity-30 animate-pulse" />
              
            </div>

            {/* Zain with Simba Photo */}
            <div className="relative">
              {/* Yellow highlight effect like Dean Graziosi */}
              <div className="absolute inset-0 bg-accent rounded-2xl blur-2xl opacity-40" />
              <div className="relative border-4 border-accent rounded-2xl overflow-hidden shadow-2xl hover-scale">
                <img src={zainSimba} alt="Zain with Simba" className="w-full h-auto object-cover" />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 shadow-[0_8px_0_0_rgb(153,27,27)] hover:shadow-[0_4px_0_0_rgb(153,27,27)] active:shadow-[0_0px_0_0_rgb(153,27,27)] hover:translate-y-1 active:translate-y-2 transition-all">
                <a href="https://www.youtube.com/@engineer2ea" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Youtube className="h-5 w-5" />
                  YouTube Channel
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover-scale">
                <a href="https://linkedin.com/in/zainadtani" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Linkedin className="h-5 w-5" />
                  Connect on LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Zain Adtani. All rights reserved.</p>
        </div>
      </footer>
    </div>;
};
export default About;