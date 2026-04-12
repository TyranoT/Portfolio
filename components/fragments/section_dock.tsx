"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FiCpu,
  FiClock,
  FiGithub,
  FiHome,
  FiLayers,
  FiMail,
  FiUser,
} from "react-icons/fi";
import { useScrollSmooth } from "@/components/smooth_scroll";

const DOCK_ITEMS = [
  { sectionId: "hero", label: "Início", Icon: FiHome },
  { sectionId: "skills", label: "Skills", Icon: FiCpu },
  { sectionId: "projetos", label: "Projetos", Icon: FiLayers },
  { sectionId: "social", label: "GitHub & prova social", Icon: FiGithub },
  { sectionId: "timeline", label: "Trajetória", Icon: FiClock },
  { sectionId: "sobre", label: "Sobre", Icon: FiUser },
  { sectionId: "contato", label: "Contato", Icon: FiMail },
] as const;

export default function SectionDock() {
  const [activeSection, setActiveSection] = useState("");
  const scrollSmooth = useScrollSmooth();

  const updateActive = useCallback(() => {
    let current = "";
    for (const { sectionId } of DOCK_ITEMS) {
      const el = document.getElementById(sectionId);
      if (!el) continue;
      if (window.scrollY >= el.offsetTop - 120) {
        current = sectionId;
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  return (
    <nav
      className="pointer-events-none fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 md:block"
      aria-label="Navegação rápida por secções"
    >
      <div className="pointer-events-auto flex flex-col items-center gap-1 rounded-2xl border border-foreground/10 bg-night-deep/90 px-1.5 py-2 shadow-lg backdrop-blur-md">
        {DOCK_ITEMS.map(({ sectionId, label, Icon }) => {
          const active = activeSection === sectionId;
          return (
            <button
              key={sectionId}
              type="button"
              title={label}
              aria-label={label}
              aria-current={active ? "true" : undefined}
              onClick={() => scrollSmooth(sectionId)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                active
                  ? "bg-kiwi/15 text-kiwi"
                  : "text-foreground/45 hover:bg-kiwi/10 hover:text-kiwi"
              }`}
            >
              <Icon className="h-[18px] w-[18px] shrink-0 stroke-2" aria-hidden />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
