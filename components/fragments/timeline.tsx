"use client";
import { useEffect, useRef } from "react";
import { animate, createScope, stagger } from "animejs";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMergedRef } from "@/hooks/useMergedRef";
import Section from "../ui/section";
import TimelineItem from "../ui/timeline_item";

const EVENTS = [
  {
    year: "2024",
    title: "Projetos Full Stack & Arquitetura",
    description:
      "Desenvolvimento de aplicações completas com React, Next.js, Node.js e integrações com IA (LangChain, AI SDK). Foco em arquitetura limpa e boas práticas.",
  },
  {
    year: "2023",
    title: "Publicação npm — WidgetPDF",
    description:
      "Criação e publicação do primeiro pacote npm. Widget reutilizável para PDFs, mostrando compromisso com ferramentas open source para devs.",
  },
  {
    year: "2023",
    title: "Projeto Molel — Simulação Científica",
    description:
      "Software de simulação de cadeias carbônicas em TypeScript. Projeto educacional e científico voltado para química orgânica.",
  },
  {
    year: "2022",
    title: "Exploração Mobile & IoT",
    description:
      "Experimentos com Flutter, React Native, Arduino e ESP32. Ampliação do stack técnico para mobile e sistemas embarcados.",
  },
  {
    year: "2021",
    title: "Início — Ciência da Computação",
    description:
      "Início do curso de Ciência da Computação na Paraíba. Primeiros projetos web com HTML, CSS e JavaScript.",
  },
];

export default function Timeline() {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  const { ref: triggerRef, isVisible } = useScrollReveal(0.05);
  const mergedRef = useMergedRef(root, triggerRef);

  useEffect(() => {
    if (!isVisible) return;

    scope.current = createScope({ root }).add(() => {
      animate(".timeline-title", {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 700,
        ease: "out(4)",
      });

      animate(".timeline-line", {
        scaleY: [0, 1],
        duration: 1200,
        delay: 300,
        ease: "out(4)",
      });

      animate(".timeline-node", {
        translateY: [50, 0],
        opacity: [0, 1],
        delay: stagger(200, { start: 500 }),
        duration: 700,
        ease: "out(4)",
      });
    });

    return () => scope.current?.revert();
  }, [isVisible]);

  return (
    <Section id="timeline" className="bg-night bg-grid-pattern">
      <div ref={mergedRef}>
        <h2 className="timeline-title font-azonix text-2xl md:text-4xl text-foreground text-center mb-16 opacity-0">
          TRAJE<span className="text-kiwi">TÓRIA</span>
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line - desktop */}
          <div className="timeline-line hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-kiwi/30 -translate-x-1/2 origin-top" />
          {/* Vertical line - mobile */}
          <div className="timeline-line md:hidden absolute left-[5px] top-0 bottom-0 w-px bg-kiwi/30 origin-top" />

          <div className="flex flex-col gap-10 md:gap-12">
            {EVENTS.map((event, i) => (
              <TimelineItem key={`${event.year}-${event.title}`} {...event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
