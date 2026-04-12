"use client";
import { useEffect, useRef } from "react";
import { animate, createScope, stagger } from "animejs";
import { FiAward, FiGithub, FiLinkedin } from "react-icons/fi";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMergedRef } from "@/hooks/useMergedRef";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/social-links";
import Section from "../ui/section";
import AnimatedCounter from "../ui/animated_counter";

const STATS = [
  { value: 15, label: "Repositórios", suffix: "+" },
  { value: 7, label: "Seguidores" },
  { value: 500, label: "Contribuições", suffix: "+" },
];

const BADGES = [
  { name: "Pull Shark", desc: "Múltiplos pull requests mergeados" },
  { name: "YOLO", desc: "Push direto sem review" },
];

export default function SocialProof() {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  const { ref: triggerRef, isVisible } = useScrollReveal(0.15);
  const mergedRef = useMergedRef(root, triggerRef);

  useEffect(() => {
    if (!isVisible) return;

    scope.current = createScope({ root }).add(() => {
      animate(".social-title", {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 700,
        ease: "out(4)",
      });

      animate(".counter-item", {
        scale: [0.8, 1],
        opacity: [0, 1],
        delay: stagger(200, { start: 300 }),
        duration: 700,
        ease: "out(3)",
      });

      animate(".social-cta-desc", {
        translateY: [16, 0],
        opacity: [0, 1],
        duration: 600,
        delay: 750,
        ease: "out(4)",
      });

      animate(".social-cta-link", {
        translateY: [20, 0],
        opacity: [0, 1],
        delay: stagger(100, { start: 850 }),
        duration: 600,
        ease: "out(4)",
      });

      animate(".badge-card", {
        translateY: [30, 0],
        opacity: [0, 1],
        delay: stagger(150, { start: 1100 }),
        duration: 600,
        ease: "out(4)",
      });
    });

    return () => scope.current?.revert();
  }, [isVisible]);

  return (
    <Section id="social" className="bg-night-deep">
      <div ref={mergedRef}>
        <h2 className="social-title font-azonix text-2xl md:text-4xl text-foreground text-center mb-16 opacity-0">
          GIT<span className="text-kiwi">HUB</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-12 md:gap-20 mb-12">
          {STATS.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              shouldAnimate={isVisible}
            />
          ))}
        </div>

        <p className="social-cta-desc text-center text-sm text-foreground/50 max-w-xl mx-auto mb-6 opacity-0">
          Perfil profissional e trajetória no LinkedIn; código e projetos no
          GitHub.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="social-cta-link inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-foreground/15 bg-night text-foreground/80 hover:border-kiwi/50 hover:text-kiwi transition-colors opacity-0"
          >
            <FiGithub className="w-4 h-4" />
            GitHub
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="social-cta-link inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-foreground/15 bg-night text-foreground/80 hover:border-kiwi/50 hover:text-kiwi transition-colors opacity-0"
          >
            <FiLinkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {BADGES.map((badge) => (
            <div
              key={badge.name}
              className="badge-card flex items-center gap-4 px-6 py-4 bg-night border border-kiwi/20 rounded-lg opacity-0"
            >
              <FiAward className="w-8 h-8 text-kiwi shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{badge.name}</p>
                <p className="text-sm text-foreground/50">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
