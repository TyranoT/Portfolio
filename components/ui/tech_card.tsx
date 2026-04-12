"use client";
import type { IconType } from "react-icons";

interface TechCardProps {
  name: string;
  Icon: IconType;
}

export default function TechCard({ name, Icon }: TechCardProps) {
  return (
    <div className="tech-card group flex items-center gap-3 px-4 py-3 bg-night-light/60 border border-foreground/5 rounded-lg hover:border-kiwi/40 hover:bg-kiwi/5 transition-all duration-300 opacity-0">
      <Icon className="w-5 h-5 text-kiwi shrink-0 group-hover:scale-110 transition-transform" />
      <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
        {name}
      </span>
    </div>
  );
}
