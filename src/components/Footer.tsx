"use client";

import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Focus the top of the page for accessibility
    document.body.focus();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <footer className="border-t bg-muted/30">
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-6 py-12 md:flex-row md:gap-4">
          {/* Copyright */}
          <div className="order-1 text-sm text-muted-foreground md:order-none">
            © {currentYear} Muhammad Ali Moiz
          </div>

          {/* Navigation Links */}
          <nav className="order-3 flex gap-6 md:order-none">
            <button
              onClick={() => scrollToSection("portfolio")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground focus:text-foreground focus:outline-none"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground focus:text-foreground focus:outline-none"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection("privacy")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground focus:text-foreground focus:outline-none"
            >
              Privacy
            </button>
          </nav>

          {/* Social Links and Back to Top */}
          <div className="order-2 flex items-center gap-2 md:order-none">
            <Button variant="ghost" size="sm" asChild className="h-9 w-9 p-0">
              <a
                href="https://github.com/AliMoizDeveloper"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild className="h-9 w-9 p-0">
              <a
                href="https://www.linkedin.com/in/muhammad-ali-moiz-2a0807193"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild className="h-9 w-9 p-0">
              <a
                href="mailto:alimoiz1510@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </Button>
            <div className="mx-2 h-4 w-px bg-border" />
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="h-9 gap-2 px-3 text-sm"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3 w-3" />
              Top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
