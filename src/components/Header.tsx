import { Link } from "react-router-dom";
import { Moon, Sun, Menu, Lock, GraduationCap, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

export const Header = () => {
  const { theme, setTheme } = useTheme();

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
        <nav className="flex items-center gap-6">
          <a href="/#home" className="text-foreground hover:text-primary transition-colors">
            Home
          </a>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About Me
          </Link>
          <Link to="/investing" className="text-foreground hover:text-primary transition-colors">
            Investing
          </Link>
          <Link to="/digital-products" className="text-foreground hover:text-primary transition-colors">
            Digital Products
          </Link>
          <a href="/#books" className="text-foreground hover:text-primary transition-colors">
            Books
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

              <nav className="mt-6 space-y-4">
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
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span className="font-medium">Courses I Recommend</span>
                  </div>
                  <ul className="space-y-2 pl-6 text-sm">
                    <li>
                      <a
                        href="https://www.udemy.com/topic/nlp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        NLP Course on Udemy <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  </ul>
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
