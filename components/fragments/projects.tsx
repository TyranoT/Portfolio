"use client";
import { useEffect, useRef } from "react";
import { animate, createScope, stagger } from "animejs";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMergedRef } from "@/hooks/useMergedRef";
import Section from "../ui/section";
import ProjectCard from "../ui/project_card";

const PROJECTS = [
  {
    title: "Molel",
    description:
      "Software de simulação de estruturas de cadeias carbônicas. Projeto desenvolvido com TypeScript, com foco em utilidade educacional e científica.",
    tags: ["TypeScript", "Simulação", "Educação"],
    previewImage: "/preview/preview_molel.png",
    previewHref: "https://molel.vercel.app/",
    links: [
      { label: "Site", url: "https://molel.vercel.app/", type: "demo" as const },
      { label: "GitHub", url: "https://github.com/TyranoT/Molel", type: "github" as const },
    ],
  },
  {
    title: "WidgetPDF",
    description:
      "Widget reutilizável para visualização de PDF publicado como pacote npm. Ferramenta útil para integração rápida em projetos web.",
    tags: ["TypeScript", "npm", "PDF", "Widget"],
    previewImage: "/preview/preview_widget_pdf.png",
    previewHref: "https://www.npmjs.com/package/@italo-git/widgetpdf",
    links: [
      {
        label: "npm",
        url: "https://www.npmjs.com/package/@italo-git/widgetpdf",
        type: "npm" as const,
      },
    ],
  },
  {
    title: "Drink-Dream",
    description:
      "Site de receitas de drinks com interface interativa. Explore receitas e descubra novos sabores.",
    tags: ["JavaScript", "Web", "Receitas"],
    previewImage: "/preview/preview_drink_dream.png",
    previewHref: "https://tyranot.github.io/Drink-Dream/",
    links: [
      { label: "Site", url: "https://tyranot.github.io/Drink-Dream/", type: "demo" as const },
      { label: "GitHub", url: "https://github.com/TyranoT/Drink-Dream", type: "github" as const },
    ],
  },
];

const PRIVATE_PROJECTS = [
  {
    title: "Sweet Control",
    description:
      "Software de precificação, controle de vendas e estoque desenvolvido para uma confeitaria.",
    tags: ["Precificação", "Vendas", "Estoque", "Vue.js", "Fastify.js"],
  },
  {
    title: "HLP Vendas",
    description:
      "Aplicativo mobile em Flutter para uma empresa de produtos de limpeza: ferramenta para vendedores, com funcionamento offline e online.",
    tags: ["Flutter", "Mobile", "Offline-first"],
  },
  {
    title: "G-NESIS",
    description:
      "Sistema com múltiplas integrações e micro frontends para gestão de obra e âmbito corporativo.",
    tags: ["Micro frontends", "Integrações", "Gestão", "Next.js", "Express.js"],
  },
  {
    title: "Dashboard Astrazeneca",
    description:
      "Sistema de apresentação comercial e de desempenho dos novos produtos da AstraZeneca no Brasil, consolidado pela diretoria e premiado internamente na empresa.",
    tags: ["Dashboard", "Comercial", "Indicadores", "Next.js", "Github API"],
  },
];

export default function Projects() {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  const { ref: triggerRef, isVisible } = useScrollReveal(0.05);
  const mergedRef = useMergedRef(root, triggerRef);

  useEffect(() => {
    if (!isVisible) return;

    scope.current = createScope({ root }).add(() => {
      animate(".projects-title", {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 700,
        ease: "out(4)",
      });

      animate(".project-card", {
        translateX: [60, 0],
        opacity: [0, 1],
        delay: stagger(150, { start: 300 }),
        duration: 800,
        ease: "out(4)",
      });
    });

    return () => scope.current?.revert();
  }, [isVisible]);

  return (
    <Section id="projetos" className="bg-night bg-grid-pattern">
      <div ref={mergedRef}>
        <h2 className="projects-title font-azonix text-2xl md:text-4xl text-foreground text-center mb-16 opacity-0">
          PRO<span className="text-kiwi">JETOS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} {...project} index={i} />
          ))}

          <p className="col-span-full pt-10 text-center text-xs font-medium uppercase tracking-[0.2em] text-foreground/40">
            Projetos em contexto empresarial
          </p>

          {PRIVATE_PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              index={PROJECTS.length + i}
              private
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
