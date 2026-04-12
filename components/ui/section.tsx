"use client";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export default function Section({ id, children, className = "", fullHeight }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full px-6 md:px-12 lg:px-24 py-20 md:py-28 ${fullHeight ? "min-h-dvh flex items-center" : ""} ${className}`}
    >
      {children}
    </section>
  );
}
