"use client";

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
}

export default function TimelineItem({ year, title, description, index }: TimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <div className="timeline-node opacity-0 relative flex items-center w-full">
      {/* Desktop: alternating layout */}
      <div className={`hidden md:flex w-full items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
        <div className="w-[calc(50%-2rem)]">
          <div className={`bg-night border border-foreground/5 rounded-lg p-6 hover:border-kiwi/30 transition-colors ${isLeft ? "text-right" : "text-left"}`}>
            <span className="text-kiwi font-azonix text-sm">{year}</span>
            <h4 className="text-foreground font-semibold text-lg mt-1">{title}</h4>
            <p className="text-foreground/50 text-sm mt-2 leading-relaxed">{description}</p>
          </div>
        </div>

        <div className="relative flex items-center justify-center w-16 shrink-0">
          <div className="w-4 h-4 rounded-full bg-kiwi glow-kiwi-sm z-10" />
        </div>

        <div className="w-[calc(50%-2rem)]" />
      </div>

      {/* Mobile: linear layout */}
      <div className="flex md:hidden items-start gap-4 w-full">
        <div className="relative flex flex-col items-center shrink-0">
          <div className="w-3 h-3 rounded-full bg-kiwi glow-kiwi-sm z-10" />
        </div>
        <div className="bg-night border border-foreground/5 rounded-lg p-5 flex-1">
          <span className="text-kiwi font-azonix text-xs">{year}</span>
          <h4 className="text-foreground font-semibold mt-1">{title}</h4>
          <p className="text-foreground/50 text-sm mt-2 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
