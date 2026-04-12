"use client";
import { useEffect, useRef } from "react";
import { animate, createScope, stagger } from "animejs";
import { FiMapPin, FiBook, FiCode, FiFileText, FiLinkedin } from "react-icons/fi";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMergedRef } from "@/hooks/useMergedRef";
import { LINKEDIN_URL } from "@/lib/social-links";
import Section from "../ui/section";

const FACTS = [
  { Icon: FiMapPin, label: "Paraíba, Brasil" as const },
  { Icon: FiBook, label: "Ciência da Computação" as const },
  { Icon: FiCode, label: "Full Stack Developer" as const },
  { Icon: FiFileText, label: "Código limpo & documentação" as const },
  {
    Icon: FiLinkedin,
    label: "LinkedIn — Italo Monteiro Leite",
    href: LINKEDIN_URL,
  } as const,
];

export default function About() {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  const { ref: triggerRef, isVisible } = useScrollReveal(0.15);
  const mergedRef = useMergedRef(root, triggerRef);

  useEffect(() => {
    if (!isVisible) return;

    scope.current = createScope({ root }).add(() => {
      animate(".about-title", {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 700,
        ease: "out(4)",
      });

      animate(".about-text", {
        translateY: [30, 0],
        opacity: [0, 1],
        delay: stagger(150, { start: 300 }),
        duration: 600,
        ease: "out(4)",
      });

      animate(".about-fact", {
        translateX: [-30, 0],
        opacity: [0, 1],
        delay: stagger(120, { start: 600 }),
        duration: 600,
        ease: "out(3)",
      });
    });

    return () => scope.current?.revert();
  }, [isVisible]);

  return (
    <Section id="sobre" className="bg-night-deep">
      <div ref={mergedRef}>
        <h2 className="about-title font-azonix text-2xl md:text-4xl text-foreground text-center mb-16 opacity-0">
          SOBRE <span className="text-kiwi">MIM</span>
        </h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="about-text text-foreground/70 leading-relaxed opacity-0">
              Sou desenvolvedor e arquiteto de software da Paraíba, Brasil.
              Estudante de Ciência da Computação, focado em criar aplicações web,
              APIs e ferramentas úteis para desenvolvedores.
            </p>
            <p className="about-text text-foreground/70 leading-relaxed opacity-0">
              Trabalho principalmente com TypeScript, Node.js, React e Next.js.
              Gosto de desenvolver projetos práticos que resolvem problemas reais,
              mantendo código limpo e boa documentação.
            </p>
            <p className="about-text text-foreground/70 leading-relaxed opacity-0">
              Tenho interesse em desenvolvimento web, APIs, ferramentas para devs
              e experimentos com IoT usando ESP32 e Arduino. Busco evoluir
              constantemente como desenvolvedor full stack.
            </p>
          </div>

          <div className="space-y-4">
            {FACTS.map((fact) => {
              const { Icon, label } = fact;
              const href = "href" in fact ? fact.href : undefined;
              return (
                <div
                  key={label}
                  className="about-fact flex items-center gap-4 px-5 py-4 bg-night border border-foreground/5 rounded-lg opacity-0"
                >
                  <Icon className="w-5 h-5 text-kiwi shrink-0" />
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-kiwi transition-colors"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-foreground/80">{label}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
