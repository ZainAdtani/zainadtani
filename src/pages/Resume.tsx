import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, Linkedin, Printer, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  contactInfo,
  skills,
  experience,
  education,
  certifications,
  type ExperienceItem,
} from "@/data/resumeData";

// Short summary for the clean one-pager
const shortSummary = `I build websites for small businesses. I focus on simple designs and tools that save time. I like to keep things calm and useful.`;

// Tools list
const tools = ["Lovable", "Notion", "Figma", "QuickBooks", "Canva", "GitHub"];

// Projects with one-line results
const projects = [
  { name: "Zain's World Newsletter", result: "Weekly posts to 500+ subscribers" },
  { name: "Children's Book", result: "Published illustrated story on Amazon" },
  { name: "Simple Sites for Clients", result: "Built websites for small businesses" },
];

export default function Resume() {
  const [expandedJobs, setExpandedJobs] = useState<Set<number>>(new Set());
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());

  const toggleJob = (index: number) => {
    setExpandedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const toggleProject = (index: number) => {
    setExpandedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Helmet>
        <title>Resume | Zain Adtani</title>
        <meta name="description" content="Resume of Zain Adtani - Website builder and systems guy." />
      </Helmet>

      <div className="min-h-screen bg-white text-black print:bg-white">
        <div className="max-w-4xl mx-auto px-6 py-10 md:py-16">
          {/* Header */}
          <header className="text-center mb-10 print:mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{contactInfo.name}</h1>
            <p className="text-gray-600 text-lg mb-4">Website builder and systems guy</p>
            <div className="flex flex-wrap items-center justify-center gap-3 print:hidden">
              <Button variant="outline" size="sm" asChild>
                <a href={contactInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={`mailto:${contactInfo.email}`}>
                  <Mail className="h-4 w-4 mr-2" /> Email
                </a>
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" /> Print
              </Button>
            </div>
            {/* Print-only contact line */}
            <div className="hidden print:block text-sm text-gray-600 mt-2">
              {contactInfo.email} • {contactInfo.phone} • linkedin.com/in/zainadtani
            </div>
          </header>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Summary */}
              <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
                  Summary
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">{shortSummary}</p>
              </section>

              {/* Skills */}
              <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.slice(0, 6).map((skill) => (
                    <Badge
                      key={skill.name}
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Tools */}
              <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
                  Tools
                </h2>
                <ul className="text-sm text-gray-700 space-y-1">
                  {tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
                  Education
                </h2>
                {education.map((edu, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium text-gray-900">{edu.degree}</p>
                    <p className="text-gray-600">{edu.institution}</p>
                    <p className="text-gray-500">{edu.date}</p>
                  </div>
                ))}
              </section>

              {/* Certifications */}
              <section className="print:hidden">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
                  Certifications
                </h2>
                <ul className="text-sm text-gray-700 space-y-1">
                  {certifications.slice(0, 4).map((cert) => (
                    <li key={cert.name}>{cert.name}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Experience */}
              <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
                  Experience
                </h2>
                <div className="space-y-5">
                  {experience.map((job, index) => (
                    <ExperienceItemCard
                      key={index}
                      job={job}
                      isExpanded={expandedJobs.has(index)}
                      onToggle={() => toggleJob(index)}
                    />
                  ))}
                </div>
              </section>

              {/* Projects */}
              <section>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">
                  Projects
                </h2>
                <div className="space-y-3">
                  {projects.map((project, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{project.name}</p>
                          <p className="text-gray-600">{project.result}</p>
                        </div>
                        <button
                          onClick={() => toggleProject(index)}
                          className="text-gray-400 hover:text-gray-600 print:hidden"
                        >
                          {expandedProjects.has(index) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {expandedProjects.has(index) && (
                        <p className="text-gray-500 text-xs mt-1">
                          More details coming soon.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print\\:block { display: block !important; }
          [data-sidebar] { display: none !important; }
          header[class*="border-b"] { display: none !important; }
        }
      `}</style>
    </>
  );
}

// Experience Item Component
function ExperienceItemCard({
  job,
  isExpanded,
  onToggle,
}: {
  job: ExperienceItem;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const hasMore = job.expandedBullets && job.expandedBullets.length > 0;

  return (
    <div className="text-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-gray-900">{job.title}</p>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <p className="text-gray-500 text-xs shrink-0">{job.dates}</p>
      </div>
      <ul className="mt-2 space-y-1 text-gray-700">
        {job.initialBullets.slice(0, 2).map((bullet, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-gray-400 mt-0.5">•</span>
            <span>{bullet}</span>
          </li>
        ))}
        {isExpanded &&
          job.expandedBullets?.map((bullet, i) => (
            <li key={`exp-${i}`} className="flex items-start gap-2">
              <span className="text-gray-400 mt-0.5">•</span>
              <span>{bullet}</span>
            </li>
          ))}
      </ul>
      {hasMore && (
        <button
          onClick={onToggle}
          className="flex items-center gap-1 mt-2 text-xs text-gray-500 hover:text-gray-700 print:hidden"
        >
          {isExpanded ? "Show less" : "Show details"}
          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
      )}
    </div>
  );
}
