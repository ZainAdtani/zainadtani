import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

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
          <a href="/#digital-products" className="text-foreground hover:text-primary transition-colors">
            Digital Products
          </a>
          <a href="/#books" className="text-foreground hover:text-primary transition-colors">
            Books
          </a>
          
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
