"use client";
import { useEffect, useRef } from "react";
import { animate, createScope, stagger } from "animejs";
import {
  SiTypescript, SiJavascript, SiReact, SiNextdotjs,
  SiAngular, SiVuedotjs, SiHtml5, SiCss,
  SiTailwindcss, SiNodedotjs, SiExpress, SiFastify,
  SiFastapi, SiDotnet, SiSwagger,
  SiFlutter, SiPostgresql, SiPrisma,
  SiNginx, SiVercel, SiDocker,
  SiRabbitmq, SiArduino, SiGit, SiGithub,
} from "react-icons/si";
import { FaMicrochip, FaBrain, FaMobile, FaAws } from "react-icons/fa6";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMergedRef } from "@/hooks/useMergedRef";
import Section from "../ui/section";
import TechCard from "../ui/tech_card";

const CATEGORIES = [
  {
    title: "Frontend",
    techs: [
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "React", Icon: SiReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "Angular", Icon: SiAngular },
      { name: "Vue.js", Icon: SiVuedotjs },
      { name: "HTML5", Icon: SiHtml5 },
      { name: "CSS3", Icon: SiCss },
      { name: "Tailwind", Icon: SiTailwindcss },
    ],
  },
  {
    title: "Backend",
    techs: [
      { name: "Node.js", Icon: SiNodedotjs },
      { name: "Express", Icon: SiExpress },
      { name: "Fastify", Icon: SiFastify },
      { name: "FastAPI", Icon: SiFastapi },
      { name: ".NET", Icon: SiDotnet },
      { name: "Swagger", Icon: SiSwagger },
    ],
  },
  {
    title: "Mobile",
    techs: [
      { name: "Flutter", Icon: SiFlutter },
      { name: "React Native", Icon: FaMobile },
    ],
  },
  {
    title: "Banco de Dados",
    techs: [
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "Prisma", Icon: SiPrisma },
    ],
  },
  {
    title: "Cloud & DevOps",
    techs: [
      { name: "AWS", Icon: FaAws },
      { name: "Nginx", Icon: SiNginx },
      { name: "Vercel", Icon: SiVercel },
      { name: "Docker", Icon: SiDocker },
      { name: "RabbitMQ", Icon: SiRabbitmq },
    ],
  },
  {
    title: "IA & LLM",
    techs: [
      { name: "LangChain", Icon: FaBrain },
      { name: "AI SDK", Icon: FaBrain },
    ],
  },
  {
    title: "Embarcados",
    techs: [
      { name: "Arduino", Icon: SiArduino },
      { name: "ESP32", Icon: FaMicrochip },
      { name: "C++", Icon: FaMicrochip },
    ],
  },
  {
    title: "Ferramentas",
    techs: [
      { name: "Git", Icon: SiGit },
      { name: "GitHub", Icon: SiGithub },
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
                {cat.techs.map((tech) => (
                  <TechCard key={tech.name} name={tech.name} Icon={tech.Icon} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
