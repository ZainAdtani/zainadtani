import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, Lock, Cloud, Code, Award, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="text-3xl font-bold">
            <span className="text-primary">Z</span>
            <span className="text-accent">A</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-3">
          <Link 
            to="/" 
            className={`px-3 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 relative overflow-hidden group ${
              isActive('/') && location.pathname === '/' 
                ? 'bg-primary/10 shadow-md' 
                : 'hover:shadow-lg hover:-translate-y-0.5'
            }`}
            style={{
              border: '1px solid transparent',
              backgroundImage: 'linear-gradient(var(--background), var(--background)), linear-gradient(30deg, hsl(var(--primary)), hsl(var(--accent)))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            <span className="relative z-10">Home</span>
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          <Link 
            to="/about" 
            className={`px-3 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 relative overflow-hidden group ${
              isActive('/about') 
                ? 'bg-primary/10 shadow-md' 
                : 'hover:shadow-lg hover:-translate-y-0.5'
            }`}
            style={{
              border: '1px solid transparent',
              backgroundImage: 'linear-gradient(var(--background), var(--background)), linear-gradient(30deg, hsl(var(--primary)), hsl(var(--accent)))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            <span className="relative z-10">About Me</span>
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          <Link 
            to="/investing" 
            className={`px-3 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 relative overflow-hidden group ${
              isActive('/investing') 
                ? 'bg-primary/10 shadow-md' 
                : 'hover:shadow-lg hover:-translate-y-0.5'
            }`}
            style={{
              border: '1px solid transparent',
              backgroundImage: 'linear-gradient(var(--background), var(--background)), linear-gradient(30deg, hsl(var(--primary)), hsl(var(--accent)))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            <span className="relative z-10">Investing</span>
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          <Link 
            to="/digital-products" 
            className={`px-3 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 relative overflow-hidden group ${
              isActive('/digital-products') 
                ? 'bg-primary/10 shadow-md' 
                : 'hover:shadow-lg hover:-translate-y-0.5'
            }`}
            style={{
              border: '1px solid transparent',
              backgroundImage: 'linear-gradient(var(--background), var(--background)), linear-gradient(30deg, hsl(var(--primary)), hsl(var(--accent)))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            <span className="relative z-10">Digital Products</span>
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          <a 
            href="/#books" 
            className="px-3 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5"
            style={{
              border: '1px solid transparent',
              backgroundImage: 'linear-gradient(var(--background), var(--background)), linear-gradient(30deg, hsl(var(--primary)), hsl(var(--accent)))',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box'
            }}
          >
            <span className="relative z-10">Books</span>
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Hamburger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <h3 className="text-lg font-semibold">More</h3>
                <p className="text-sm text-muted-foreground">Quick access</p>
              </SheetHeader>

              <nav className="mt-6 space-y-6">
                {/* Secret Vault */}
                <Link
                  to="/vault"
                  className="flex items-center gap-2 text-foreground hover:underline"
                  aria-label="Open Secret Vault"
                >
                  <Lock className="w-4 h-4 text-primary" />
                  <span>Secret Vault</span>
                </Link>

                {/* Courses I Recommend */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-semibold text-base">Courses I Recommend</span>
                  </div>

                  {/* AWS & Cloud */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                      <Cloud className="w-3.5 h-3.5" />
                      <span>AWS & Cloud</span>
                    </div>
                    <ul className="space-y-2 pl-5 text-sm">
                      <li>
                        <a
                          href="https://www.coursera.org/specializations/aws-fundamentals"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-1.5 hover:text-primary transition-colors"
                        >
                          <span className="flex-1 leading-tight">AWS Fundamentals Specialization</span>
                          <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                        </a>
                        <span className="text-xs text-muted-foreground">Coursera</span>
                      </li>
                      <li>
                        <a
                          href="https://www.coursera.org/learn/aws-fundamentals-migrating-to-the-cloud"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-1.5 hover:text-primary transition-colors"
                        >
                          <span className="flex-1 leading-tight">AWS Fundamentals: Migrating to the Cloud</span>
                          <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                        </a>
                        <span className="text-xs text-muted-foreground">Coursera</span>
                      </li>
                      <li>
                        <a
                          href="https://www.coursera.org/learn/aws-fundamentals-addressing-security-risk"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-1.5 hover:text-primary transition-colors"
                        >
                          <span className="flex-1 leading-tight">AWS Fundamentals: Addressing Security Risk</span>
                          <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                        </a>
                        <span className="text-xs text-muted-foreground">Coursera</span>
                      </li>
                      <li>
                        <a
                          href="https://www.coursera.org/learn/aws-cloud-technical-essentials"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-1.5 hover:text-primary transition-colors"
                        >
                          <span className="flex-1 leading-tight">AWS Cloud Technical Essentials</span>
                          <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                        </a>
                        <span className="text-xs text-muted-foreground">Coursera</span>
                      </li>
                      <li>
                        <a
                          href="https://www.coursera.org/learn/aws-cloud-practitioner-essentials"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-1.5 hover:text-primary transition-colors"
                        >
                          <span className="flex-1 leading-tight">AWS Cloud Practitioner Essentials</span>
                          <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                        </a>
                        <span className="text-xs text-muted-foreground">Coursera</span>
                      </li>
                      <li>
                        <a
                          href="https://www.coursera.org/learn/cloud-practitioner-exam-prep"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-1.5 hover:text-primary transition-colors"
                        >
                          <span className="flex-1 leading-tight">Exam Prep: AWS Certified Cloud Practitioner Foundations</span>
                          <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                        </a>
                        <span className="text-xs text-muted-foreground">Coursera</span>
                      </li>
                    </ul>
                  </div>

                  {/* Programming & Data */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                      <Code className="w-3.5 h-3.5" />
                      <span>Programming & Data</span>
                    </div>
                    <ul className="space-y-2 pl-5 text-sm">
                      <li>
                        <a
                          href="https://www.coursera.org/learn/python"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-1.5 hover:text-primary transition-colors"
                        >
                          <span className="flex-1 leading-tight">Programming for Everybody (Getting Started with Python)</span>
                          <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                        </a>
                        <span className="text-xs text-muted-foreground">Coursera</span>
                      </li>
                      <li>
                        <a
                          href="https://www.coursera.org/learn/python-data"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-1.5 hover:text-primary transition-colors"
                        >
                          <span className="flex-1 leading-tight">Python Data Structures</span>
                          <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                        </a>
                        <span className="text-xs text-muted-foreground">Coursera</span>
                      </li>
                      <li>
                        <a
                          href="https://www.coursera.org/learn/python-crash-course"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-1.5 hover:text-primary transition-colors"
                        >
                          <span className="flex-1 leading-tight">Crash Course on Python</span>
                          <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                        </a>
                        <span className="text-xs text-muted-foreground">Coursera</span>
                      </li>
                      <li>
                        <a
                          href="https://www.coursera.org/learn/the-structured-query-language-sql"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-1.5 hover:text-primary transition-colors"
                        >
                          <span className="flex-1 leading-tight">The Structured Query Language (SQL)</span>
                          <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                        </a>
                        <span className="text-xs text-muted-foreground">Coursera</span>
                      </li>
                      <li>
                        <a
                          href="https://www.coursera.org/learn/matlab"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-1.5 hover:text-primary transition-colors"
                        >
                          <span className="flex-1 leading-tight">Introduction to Programming with MATLAB</span>
                          <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                        </a>
                        <span className="text-xs text-muted-foreground">Coursera</span>
                      </li>
                      <li>
                        <a
                          href="https://www.coursera.org/account/accomplishments/certificate/YHKHYPAG6VU5"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-1.5 hover:text-primary transition-colors"
                        >
                          <Award className="w-3 h-3 mt-0.5 shrink-0 text-primary" />
                          <span className="flex-1 leading-tight">Programming for Everybody — Zain <span className="text-xs text-primary">(Certificate)</span></span>
                          <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                        </a>
                        <span className="text-xs text-muted-foreground">Coursera</span>
                      </li>
                    </ul>
                  </div>

                  {/* Other */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-sm font-medium text-muted-foreground">
                      <span>Other</span>
                    </div>
                    <ul className="space-y-2 pl-5 text-sm">
                      <li>
                        <a
                          href="https://www.udemy.com/course/nlp-practitioner-master-practitioner-certification-course/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-1.5 hover:text-primary transition-colors"
                        >
                          <span className="flex-1 leading-tight">NLP Practitioner + Master Practitioner</span>
                          <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                        </a>
                        <span className="text-xs text-muted-foreground">Udemy</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          
          {/* Dark Mode Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};
