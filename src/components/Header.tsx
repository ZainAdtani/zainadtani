import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, Lock, Cloud, Code, Award, ExternalLink, Home as HomeIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Sidebar Trigger */}
        <SidebarTrigger className="-ml-1" />
        
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
          
          <Link 
            to="/books" 
            className={`px-3 py-1.5 rounded-full font-semibold text-sm transition-all duration-300 relative overflow-hidden group ${
              isActive('/books') 
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
            <span className="relative z-10">Books</span>
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Hamburger Menu */}
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetHeader>
                <h3 className="text-lg font-semibold">More</h3>
                <p className="text-sm text-muted-foreground">Quick access</p>
              </SheetHeader>

              <nav className="mt-6 space-y-4">
                {/* Home Link */}
                <Link
                  to="/"
                  className="flex items-center gap-2 text-foreground hover:underline"
                  onClick={() => setSheetOpen(false)}
                  aria-label="Home"
                >
                  <HomeIcon className="w-4 h-4" />
                  <span>Home</span>
                </Link>

                <div className="border-t border-border pt-4 space-y-2">
                  {/* Vault Links */}
                  <Link to="/vault" className="flex items-center gap-2 text-foreground hover:underline" onClick={() => setSheetOpen(false)}>
                    <Lock className="w-4 h-4 text-primary" />
                    <span>Secret Vault</span>
                  </Link>
                  <Link to="/tools" className="flex items-center gap-2 text-foreground hover:underline" onClick={() => setSheetOpen(false)}>
                    <span>🧰 Tools</span>
                  </Link>
                  <Link to="/enrolled-agent" className="flex items-center gap-2 text-foreground hover:underline" onClick={() => setSheetOpen(false)}>
                    <Award className="w-4 h-4 text-accent" />
                    <span>Enrolled Agent</span>
                  </Link>
                </div>

                {/* Accordion Groups */}
                <div className="border-t border-border pt-4">
                  <Accordion type="multiple" className="w-full">
                    {/* Courses I Recommend */}
                    <AccordionItem value="courses">
                      <AccordionTrigger className="text-sm font-semibold">Courses I Recommend</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pl-2">
                          <a 
                            href="https://udemy.com/course/nlp-practitioner-master-practitioner-certification-course/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-full border border-primary/30 hover:bg-primary/10 transition-colors"
                            onClick={() => setSheetOpen(false)}
                          >
                            <span className="flex-1">NLP Practitioner + Master</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <a 
                            href="https://www.coursera.org/specializations/aws-fundamentals" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-full border border-primary/30 hover:bg-primary/10 transition-colors"
                            onClick={() => setSheetOpen(false)}
                          >
                            <span className="flex-1">AWS Fundamentals Specialization</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <a 
                            href="https://www.coursera.org/learn/aws-fundamentals-migrating-to-the-cloud" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-full border border-primary/30 hover:bg-primary/10 transition-colors"
                            onClick={() => setSheetOpen(false)}
                          >
                            <span className="flex-1">AWS Fundamentals: Migrating to the Cloud</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <a 
                            href="https://www.coursera.org/learn/aws-fundamentals-addressing-security" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-full border border-primary/30 hover:bg-primary/10 transition-colors"
                            onClick={() => setSheetOpen(false)}
                          >
                            <span className="flex-1">AWS Fundamentals: Addressing Security Risk</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <a 
                            href="https://www.coursera.org/learn/aws-cloud-technical-essentials" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-full border border-primary/30 hover:bg-primary/10 transition-colors"
                            onClick={() => setSheetOpen(false)}
                          >
                            <span className="flex-1">AWS Cloud Technical Essentials</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <a 
                            href="https://www.coursera.org/learn/aws-certified-cloud-practitioner-exam-prep" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-full border border-primary/30 hover:bg-primary/10 transition-colors"
                            onClick={() => setSheetOpen(false)}
                          >
                            <span className="flex-1">Exam Prep: AWS Certified Cloud Practitioner Foundations</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <a 
                            href="https://www.coursera.org/learn/aws-cloud-practitioner-essentials" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-full border border-primary/30 hover:bg-primary/10 transition-colors"
                            onClick={() => setSheetOpen(false)}
                          >
                            <span className="flex-1">AWS Cloud Practitioner Essentials</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Marketplaces */}
                    <AccordionItem value="marketplaces">
                      <AccordionTrigger className="text-sm font-semibold">Marketplaces</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pl-2">
                          {[
                            { name: "Etsy", url: "https://www.etsy.com/" },
                            { name: "eBay", url: "https://www.ebay.com/" },
                            { name: "WHOP", url: "https://whop.com/" },
                            { name: "Mastermind.com", url: "https://www.mastermind.com/" },
                            { name: "Skool", url: "https://www.skool.com/" },
                            { name: "Udemy", url: "https://www.udemy.com/" },
                            { name: "YouTube", url: "https://www.youtube.com/" }
                          ].map((marketplace) => (
                            <a 
                              key={marketplace.name}
                              href={marketplace.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-2 text-sm rounded-full border border-primary/30 hover:bg-primary/10 transition-colors"
                              onClick={() => setSheetOpen(false)}
                            >
                              <span className="flex-1">{marketplace.name}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </nav>

              {/* Theme Toggle */}
              <div className="mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="w-full"
                >
                  {theme === "light" ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                  {theme === "light" ? "Dark" : "Light"} Mode
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Theme Toggle (Desktop) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hidden md:inline-flex"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>
      </div>
    </header>
  );
};
