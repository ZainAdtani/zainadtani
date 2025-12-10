import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { 
  MapPin, Mail, Phone, Linkedin, Globe, Download, 
  ChevronDown, ChevronUp, ArrowUp,
  BookOpen, Code, Users, Dribbble, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  contactInfo,
  summary,
  skills,
  experience,
  education,
  certifications,
  activities,
  resumePdfPath,
  type ExperienceItem,
  type ActivityItem,
} from "@/data/resumeData";
import { cn } from "@/lib/utils";

const sections = [
  { id: "summary", label: "Summary" },
  { id: "skills", label: "Key Competencies" },
  { id: "experience", label: "Professional Experience" },
  { id: "education", label: "Education & Certifications" },
  { id: "activities", label: "Activities" },
  { id: "download", label: "Download PDF" },
];

const activityIcons: Record<ActivityItem["icon"], React.ElementType> = {
  book: BookOpen,
  code: Code,
  users: Users,
  basketball: Dribbble,
  globe: Globe,
  heart: Heart,
};

export default function Resume() {
  const [activeSection, setActiveSection] = useState("summary");
  const [expandedJobs, setExpandedJobs] = useState<Set<number>>(new Set());
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Track scroll position for back-to-top button and active section
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);

      // Find active section based on scroll position
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i].element;
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sectionElements[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleJobExpanded = (index: number) => {
    setExpandedJobs(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <>
      <Helmet>
        <title>Interactive Resume | Zain Adtani</title>
        <meta name="description" content="Interactive resume of Zain Adtani - Software Engineer, Enrolled Agent, and Teacher helping tiny business owners build simple sites." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          {/* Header Section */}
          <header className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {contactInfo.name}
            </h1>
            
            {/* Contact Icons Row */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-muted-foreground mb-4">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {contactInfo.location}
              </span>
              <a 
                href={`mailto:${contactInfo.email}`} 
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                {contactInfo.email}
              </a>
              <a 
                href={`tel:${contactInfo.phone}`} 
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                {contactInfo.phone}
              </a>
              <a 
                href={contactInfo.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a 
                href={contactInfo.siteUrl} 
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Globe className="w-4 h-4" />
                MySite
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <Button asChild>
                <a href={resumePdfPath} download>
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={`mailto:${contactInfo.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email Me
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={contactInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Last updated: {contactInfo.lastUpdated}
            </p>
          </header>

          {/* Main Content with Side Navigation */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Side Navigation - Sticky on Desktop */}
            <nav className="md:w-48 shrink-0">
              <div className="md:sticky md:top-24">
                {/* Mobile: Horizontal scrollable */}
                <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors text-left",
                        activeSection === section.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {section.label}
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            {/* Content Sections */}
            <main className="flex-1 space-y-12">
              {/* Summary Section */}
              <section id="summary" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Summary</h2>
                <Card className="p-6 bg-card">
                  <p className="text-muted-foreground leading-relaxed">{summary}</p>
                </Card>
              </section>

              {/* Skills Section */}
              <section id="skills" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Key Competencies</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Tooltip key={skill.name}>
                      <TooltipTrigger asChild>
                        <Badge 
                          variant="secondary" 
                          className="px-4 py-2 text-sm cursor-default hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {skill.name}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{skill.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </section>

              {/* Experience Section */}
              <section id="experience" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Professional Experience</h2>
                <div className="space-y-4">
                  {experience.map((job, index) => (
                    <ExperienceCard
                      key={index}
                      job={job}
                      isExpanded={expandedJobs.has(index)}
                      onToggle={() => toggleJobExpanded(index)}
                    />
                  ))}
                </div>
              </section>

              {/* Education & Certifications Section */}
              <section id="education" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Education & Certifications</h2>
                
                {/* Education */}
                <div className="space-y-4 mb-6">
                  {education.map((edu, index) => (
                    <Card key={index} className="p-5 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-foreground">{edu.institution}</h3>
                      <p className="text-muted-foreground">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground">{edu.date}</p>
                      {edu.honors && (
                        <div className="flex gap-2 mt-2">
                          {edu.honors.map((honor) => (
                            <Badge key={honor} variant="outline" className="text-xs">
                              {honor}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>

                {/* Certifications */}
                <h3 className="text-lg font-medium text-foreground mb-3">Licenses & Certifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {certifications.map((cert, index) => (
                    <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                      <p className="font-medium text-foreground">{cert.name}</p>
                      {cert.issuer && (
                        <p className="text-sm text-muted-foreground">
                          {cert.issuer} {cert.date && `• ${cert.date}`}
                        </p>
                      )}
                    </Card>
                  ))}
                </div>
              </section>

              {/* Activities Section */}
              <section id="activities" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Extracurricular Activities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activities.map((activity, index) => {
                    const IconComponent = activityIcons[activity.icon];
                    return (
                      <Card key={index} className="p-4 flex items-start gap-3 hover:shadow-md transition-shadow">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </section>

              {/* Download Section */}
              <section id="download" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Download Resume</h2>
                <Card className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">
                    Download a PDF copy of my resume for your records.
                  </p>
                  <Button size="lg" asChild>
                    {/* TODO: Replace resumePdfPath in resumeData.ts with your actual PDF */}
                    <a href={resumePdfPath} download>
                      <Download className="w-5 h-5 mr-2" />
                      Download Resume as PDF
                    </a>
                  </Button>
                </Card>
              </section>
            </main>
          </div>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 z-50"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </>
  );
}

// Expandable Experience Card Component
function ExperienceCard({ 
  job, 
  isExpanded, 
  onToggle 
}: { 
  job: ExperienceItem; 
  isExpanded: boolean; 
  onToggle: () => void;
}) {
  const hasMoreBullets = job.expandedBullets.length > 0;

  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-3">
        <div>
          <h3 className="font-semibold text-foreground">{job.company}</h3>
          <p className="text-primary font-medium">{job.title}</p>
        </div>
        <div className="text-sm text-muted-foreground text-left sm:text-right">
          <p>{job.dates}</p>
          <p>{job.location}</p>
        </div>
      </div>

      <ul className="space-y-2 text-muted-foreground">
        {job.initialBullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-primary mt-1.5">•</span>
            <span>{bullet}</span>
          </li>
        ))}
        {isExpanded && job.expandedBullets.map((bullet, i) => (
          <li key={`exp-${i}`} className="flex items-start gap-2 animate-fade-in">
            <span className="text-primary mt-1.5">•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {hasMoreBullets && (
        <button
          onClick={onToggle}
          className="flex items-center gap-1 mt-3 text-sm text-primary hover:underline"
        >
          {isExpanded ? (
            <>
              Show less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show more <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </Card>
  );
}
