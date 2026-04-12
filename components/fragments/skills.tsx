"use client";
import { useEffect, useRef } from "react";
import type { IconType } from "react-icons";
import { animate, createScope, stagger } from "animejs";
import {
  SiTypescript, SiJavascript, SiReact, SiNextdotjs,
  SiAngular, SiVuedotjs, SiHtml5, SiCss,
  SiTailwindcss, SiStorybook,
  SiNodedotjs, SiExpress, SiFastify,
  SiFastapi, SiDotnet, SiSwagger,
  SiFlutter, SiPostgresql, SiPrisma,
  SiNginx, SiVercel, SiDocker,
  SiRabbitmq, SiArduino, SiGit, SiGithub,
  SiNpm, SiLinux, SiJira, SiGithubactions, SiN8N, SiNotion,
  SiLangchain, SiCplusplus, SiEspressif,
} from "react-icons/si";
import { FaLayerGroup, FaAws, FaBrain } from "react-icons/fa6";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMergedRef } from "@/hooks/useMergedRef";
import Section from "../ui/section";
import TechCard from "../ui/tech_card";

type TechItem = {
  name: string;
  Icon: IconType;
  featured?: boolean;
};

const CATEGORIES: { title: string; techs: TechItem[] }[] = [
  {
    title: "Frontend",
    techs: [
      { name: "TypeScript", Icon: SiTypescript, featured: true },
      { name: "JavaScript", Icon: SiJavascript, featured: true },
      { name: "React", Icon: SiReact, featured: true },
      { name: "Next.js", Icon: SiNextdotjs, featured: true },
      { name: "Angular", Icon: SiAngular },
      { name: "Vue.js", Icon: SiVuedotjs },
      { name: "HTML5", Icon: SiHtml5 },
      { name: "CSS3", Icon: SiCss },
      { name: "Storybook", Icon: SiStorybook },
      { name: "Tailwind CSS", Icon: SiTailwindcss, featured: true },
    ],
  },
  {
    title: "Backend",
    techs: [
      { name: "Node.js", Icon: SiNodedotjs, featured: true },
      { name: "Express.js", Icon: SiExpress, featured: true },
      { name: "Fastify", Icon: SiFastify, featured: true },
      { name: "FastAPI", Icon: SiFastapi },
      { name: ".NET", Icon: SiDotnet },
      { name: "Swagger / OpenAPI", Icon: SiSwagger },
    ],
  },
  {
    title: "Mobile",
    techs: [
      { name: "Flutter", Icon: SiFlutter, featured: true },
      { name: "React Native", Icon: SiReact },
    ],
  },
  {
    title: "Banco de Dados",
    techs: [
      { name: "PostgreSQL", Icon: SiPostgresql, featured: true },
      { name: "Prisma", Icon: SiPrisma },
    ],
  },
  {
    title: "Cloud e DevOps",
    techs: [
      { name: "AWS", Icon: FaAws, featured: true },
      { name: "Nginx", Icon: SiNginx },
      { name: "Vercel", Icon: SiVercel, featured: true },
      { name: "Docker", Icon: SiDocker, featured: true },
      { name: "RabbitMQ", Icon: SiRabbitmq },
    ],
  },
  {
    title: "IA e LLM",
    techs: [
      { name: "Pinecone", Icon: FaLayerGroup, featured: true },
      { name: "LangChain", Icon: SiLangchain },
      { name: "AI SDK", Icon: FaBrain, featured: true },
    ],
  },
  {
    title: "Ferramentas",
    techs: [
      { name: "Git", Icon: SiGit, featured: true },
      { name: "GitHub", Icon: SiGithub, featured: true },
      { name: "NPM", Icon: SiNpm },
      { name: "Linux", Icon: SiLinux, featured: true },
      { name: "Jira", Icon: SiJira, featured: true },
      { name: "GitHub Actions", Icon: SiGithubactions, featured: true },
      { name: "n8n", Icon: SiN8N },
      { name: "Notion", Icon: SiNotion, featured: true },
    ],
  },
  {
    title: "Embarcados",
    techs: [
      { name: "C++", Icon: SiCplusplus, featured: true },
      { name: "Arduino", Icon: SiArduino },
      { name: "ESP32", Icon: SiEspressif },
    ],
  },
];

export default function Skills() {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  const { ref: triggerRef, isVisible } = useScrollReveal(0.1);
  const mergedRef = useMergedRef(root, triggerRef);

  useEffect(() => {
    if (!isVisible) return;

    scope.current = createScope({ root }).add(() => {
      animate(".skills-title", {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 700,
        ease: "out(4)",
      });

      animate(".category-block", {
        translateY: [50, 0],
        opacity: [0, 1],
        delay: stagger(120, { start: 200 }),
        duration: 700,
        ease: "out(4)",
      });

      animate(".tech-card", {
        translateY: [20, 0],
        opacity: [0, 1],
        delay: stagger(40, { start: 400 }),
        duration: 500,
        ease: "out(3)",
      });
    });

    return () => scope.current?.revert();
  }, [isVisible]);

  return (
    <Section id="skills" className="bg-night-deep">
      <div ref={mergedRef}>
        <h2 className="skills-title font-azonix text-2xl md:text-4xl text-foreground text-center mb-16 opacity-0">
          TECNO<span className="text-kiwi">LOGIAS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="category-block opacity-0">
              <h3 className="text-kiwi font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-kiwi" />
                {cat.title}
              </h3>
              <div className="flex flex-col gap-2">
                {[...cat.techs]
                  .sort(
                    (a, b) => Number(!!b.featured) - Number(!!a.featured)
                  )
                  .map((tech) => (
                    <TechCard
                      key={tech.name}
                      name={tech.name}
                      Icon={tech.Icon}
                      featured={!!tech.featured}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
