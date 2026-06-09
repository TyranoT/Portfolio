"use client";
import { useEffect, useRef } from "react";
import { animate, createScope, stagger } from "animejs";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMergedRef } from "@/hooks/useMergedRef";
import Section from "../ui/section";
import TimelineItem from "../ui/timeline_item";

const EVENTS = [
  {
    year: "2024 – hoje",
    title: "Tech Lead & Full-Stack — AahBrant",
    description:
      "Promoção para Full-Stack Developer e liderança técnica da empresa. Responsável pela estruturação completa do setor de Tecnologia e Inovação: arquitetura de sistemas, decisões técnicas, micro frontends e integrações corporativas.",
  },
  {
    year: "2026 – hoje",
    title: "Responsável pela Strongy",
    description:
      "Lidera o desenvolvimento da Strongy, IA pessoal no WhatsApp capaz de interpretar áudios, fotos e textos. Stack: FastAPI, Gemini, ChatGPT, Next.js, Meta API e PostgreSQL.",
  },
  {
    year: "2023 – 2024",
    title: "Frontend Estagiário → Júnior — AahBrant",
    description:
      "Entrada na AahBrant Engenharia & Construções como estagiário frontend. Evolução para Júnior com participação em projetos reais de gestão e dashboards internos.",
  },
  {
    year: "2023",
    title: "WidgetPDF & Molel — Open Source",
    description:
      "Publicação do pacote npm WidgetPDF e desenvolvimento do Molel, simulador de cadeias carbônicas em TypeScript. Primeiro contato com open source e projetos científicos.",
  },
  {
    year: "2024",
    title: "Início — Ciência da Computação & IoT",
    description:
      "Ingresso no curso de Ciência da Computação na Paraíba. Paralelamente, primeiros experimentos com IoT: projetos com Arduino e ESP32.",
  },
  {
    year: "2022 – hoje",
    title: "Freelancer Frontend",
    description:
      "Início como desenvolvedor freelancer, atendendo clientes com projetos web responsivos. Expansão do stack com Flutter e React Native.",
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
