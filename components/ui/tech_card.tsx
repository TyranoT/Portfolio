"use client";
import type { IconType } from "react-icons";
import { FiZap } from "react-icons/fi";

interface TechCardProps {
  name: string;
  Icon: IconType;
  /** Maior prática / foco principal nesta stack */
  featured?: boolean;
}

export default function TechCard({ name, Icon, featured = false }: TechCardProps) {
  return (
    <div
      title={featured ? "Tecnologia com maior prática" : undefined}
      className="tech-card group flex items-center gap-3 rounded-lg border border-foreground/5 bg-night-light/60 px-4 py-3 transition-all duration-300 opacity-0 hover:border-kiwi/40 hover:bg-kiwi/5"
    >
      <Icon className="h-5 w-5 shrink-0 text-kiwi transition-transform group-hover:scale-110" />
      <span className="min-w-0 flex-1 text-sm text-foreground/80 transition-colors group-hover:text-foreground">
        {name}
      </span>
      {featured && (
        <span className="flex shrink-0 items-center gap-0.5 rounded border border-kiwi/35 bg-night-deep/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-kiwi">
          <FiZap className="h-3 w-3" aria-hidden />
          Foco
        </span>
      )}
    </div>
  );
}
