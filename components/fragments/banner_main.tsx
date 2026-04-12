"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { animate, createScope, stagger } from "animejs";
import { FiChevronDown } from "react-icons/fi";
import ShapeGrid from "../ui/shape_grid";
import TypeWriter from "../ui/typewriter";

const BADGES = ["TypeScript", "React", "Next.js", "Node.js", "Flutter", "AWS"];

const CODE_LINES = [
  'const dev = new FullStackDev();',
  'await dev.build("portfolio");',
  'export default dev;',
];

export const BannerMain = () => {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  const [photoFailed, setPhotoFailed] = useState(false);
  const [nameDone, setNameDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);

  const handleNameDone = useCallback(() => setNameDone(true), []);
  const handleSubtitleDone = useCallback(() => setSubtitleDone(true), []);

  useEffect(() => {
    scope.current = createScope({ root }).add(() => {
      animate(".hero-photo", {
        scale: [0, 1],
        opacity: [0, 1],
        duration: 800,
        ease: "out(3)",
      });

      animate(".hero-prompt", {
        opacity: [0, 1],
        duration: 300,
        delay: 250,
        ease: "out(2)",
      });

      animate(".code-line", {
        opacity: [0, 0.04],
        translateY: [10, 0],
        delay: stagger(300, { start: 200 }),
        duration: 800,
        ease: "out(3)",
      });
    });

    return () => scope.current?.revert();
  }, []);

  useEffect(() => {
    if (!subtitleDone) return;

    const s = createScope({ root }).add(() => {
      animate(".hero-badge", {
        translateY: [20, 0],
        opacity: [0, 1],
        delay: stagger(80),
        duration: 500,
        ease: "out(3)",
      });

      animate(".hero-cta", {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        delay: 400,
        ease: "out(4)",
      });
    });

    return () => s.revert();
  }, [subtitleDone]);

  return (
    <div ref={root} className="w-full h-dvh relative overflow-hidden" id="hero">
      <div className="absolute inset-0 opacity-30">
        <ShapeGrid
          speed={0.1}
          squareSize={80}
          direction="down"
          borderColor="#89E900"
          hoverFillColor="#222"
          shape="square"
          hoverTrailAmount={0}
        />
      </div>

      {/* Decorative code lines */}
      <div className="absolute top-24 left-6 md:left-16 select-none pointer-events-none font-mono text-xs md:text-sm space-y-2">
        {CODE_LINES.map((line, i) => (
          <div key={i} className="code-line text-foreground opacity-0">
            <span className="text-kiwi/30 mr-2">{i + 1}</span>
            {line}
          </div>
        ))}
      </div>

      <div className="absolute bottom-28 right-6 md:right-16 select-none pointer-events-none font-mono text-xs md:text-sm space-y-2 text-right">
        <div className="code-line text-foreground opacity-0">
          <span className="text-kiwi/30">{'// '}</span>Paraíba, Brasil
        </div>
        <div className="code-line text-foreground opacity-0">
          <span className="text-kiwi/30">{'// '}</span>Ciência da Computação
        </div>
      </div>

      {/* Hero content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 z-10 px-6 text-center max-w-3xl">
          <div className="hero-photo relative w-32 h-32 md:w-40 md:h-40 rounded-full border-3 border-kiwi glow-kiwi overflow-hidden bg-night-light opacity-0">
            {photoFailed ? (
              <span className="flex items-center justify-center w-full h-full text-4xl md:text-5xl font-bold text-kiwi font-azonix">
                IM
              </span>
            ) : (
              <Image
                src="/assets/foto-perfil.jpeg"
                alt="Italo Monteiro"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 128px, 160px"
                priority
                onError={() => setPhotoFailed(true)}
              />
            )}
          </div>

          <div className="min-h-16 md:min-h-20 flex flex-nowrap items-center justify-center gap-0">
            <span className="hero-prompt shrink-0 text-kiwi font-mono text-xl md:text-3xl mr-2 opacity-0 self-start mt-1">
              {'>'}
            </span>
            <TypeWriter
              text="ITALO MONTEIRO"
              delay={500}
              speed={40}
              showCursor
              onComplete={handleNameDone}
              className="font-azonix text-4xl md:text-6xl lg:text-7xl text-foreground tracking-wider whitespace-nowrap"
              as="h1"
            />
          </div>

          <div className="min-h-8">
            {nameDone && (
              <TypeWriter
                text="Desenvolvedor Full Stack & Arquiteto de Software"
                delay={200}
                speed={25}
                showCursor
                onComplete={handleSubtitleDone}
                className="text-lg md:text-xl text-foreground/70"
                as="p"
              />
            )}
          </div>

          {subtitleDone && (
            <>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="hero-badge px-3 py-1.5 text-xs md:text-sm font-medium border border-kiwi/40 text-kiwi bg-kiwi/5 rounded-full opacity-0"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <a
                href="#projetos"
                className="hero-cta mt-4 flex flex-col items-center gap-2 text-kiwi hover:text-kiwi-dark transition-colors opacity-0"
              >
                <span className="text-sm font-medium tracking-widest uppercase">
                  Ver Projetos
                </span>
                <FiChevronDown className="w-5 h-5 animate-bounce" />
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
