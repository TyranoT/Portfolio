"use client";
import { useCallback, useEffect, useState } from "react";
import { useScrollSmooth } from "@/components/smooth_scroll";

const NAV_ITEMS = [
  { label: "Skills", sectionId: "skills" },
  { label: "Projetos", sectionId: "projetos" },
  { label: "GitHub", sectionId: "social" },
  { label: "Trajetória", sectionId: "timeline" },
  { label: "Sobre", sectionId: "sobre" },
  { label: "Contato", sectionId: "contato" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollSmooth = useScrollSmooth();

  const goToSection = useCallback(
    (sectionId: string) => {
      scrollSmooth(sectionId);
    },
    [scrollSmooth]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_ITEMS.map((item) =>
        document.getElementById(item.sectionId)
      ).filter(Boolean) as HTMLElement[];

      let current = "";
      for (const section of sections) {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-night-deep/90 backdrop-blur-md border-b border-foreground/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <button
          type="button"
          onClick={() => {
            goToSection("hero");
            setMobileOpen(false);
          }}
          className="font-azonix text-sm text-kiwi tracking-wider cursor-pointer bg-transparent border-0 p-0 hover:opacity-90 transition-opacity"
        >
          IM
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ label, sectionId }) => (
            <button
              key={sectionId}
              type="button"
              onClick={() => goToSection(sectionId)}
              className={`text-sm transition-colors cursor-pointer bg-transparent border-0 p-0 font-inherit ${
                activeSection === sectionId
                  ? "text-kiwi"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`w-5 h-px bg-foreground transition-transform ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`w-5 h-px bg-foreground transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-px bg-foreground transition-transform ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-night-deep/95 backdrop-blur-md border-b border-foreground/5 px-6 py-4 space-y-3">
          {NAV_ITEMS.map(({ label, sectionId }) => (
            <button
              key={sectionId}
              type="button"
              onClick={() => {
                goToSection(sectionId);
                setMobileOpen(false);
              }}
              className={`block w-full text-left text-sm py-1 cursor-pointer bg-transparent border-0 p-0 font-inherit ${
                activeSection === sectionId ? "text-kiwi" : "text-foreground/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
