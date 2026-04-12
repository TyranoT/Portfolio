"use client";
import { useEffect, useRef } from "react";
import { animate, createScope, stagger } from "animejs";
import { FiGithub, FiLinkedin, FiInstagram, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMergedRef } from "@/hooks/useMergedRef";
import Section from "../ui/section";
import {
  EMAIL_MAILTO,
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  WHATSAPP_URL,
} from "@/lib/social-links";

const SOCIALS = [
  { Icon: FiGithub, label: "GitHub", url: GITHUB_URL, external: true },
  { Icon: FiLinkedin, label: "LinkedIn", url: LINKEDIN_URL, external: true },
  { Icon: FiInstagram, label: "Instagram", url: INSTAGRAM_URL, external: true },
  { Icon: FaWhatsapp, label: "WhatsApp", url: WHATSAPP_URL, external: true },
  { Icon: FiMail, label: "Email", url: EMAIL_MAILTO, external: false },
];

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<ReturnType<typeof createScope> | null>(null);
  const { ref: triggerRef, isVisible } = useScrollReveal(0.15);
  const mergedRef = useMergedRef(root, triggerRef);

  useEffect(() => {
    if (!isVisible) return;

    scope.current = createScope({ root }).add(() => {
      animate(".contact-title", {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 700,
        ease: "out(4)",
      });

      animate(".contact-desc", {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        delay: 200,
        ease: "out(4)",
      });

      animate(".contact-link", {
        scale: [0, 1],
        opacity: [0, 1],
        delay: stagger(100, { start: 500 }),
        duration: 600,
        ease: "out(3)",
      });

      animate(".contact-cta", {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 600,
        delay: 900,
        ease: "out(4)",
      });
    });

    return () => scope.current?.revert();
  }, [isVisible]);

  return (
    <Section id="contato" className="bg-night bg-grid-pattern">
      <div ref={mergedRef} className="text-center">
        <h2 className="contact-title font-azonix text-2xl md:text-4xl text-foreground mb-6 opacity-0">
          VAMOS <span className="text-kiwi">CONSTRUIR</span> ALGO JUNTOS?
        </h2>

        <p className="contact-desc text-foreground/50 max-w-lg mx-auto mb-12 opacity-0">
          Estou sempre aberto a novos projetos, colaborações e oportunidades.
          Entre em contato por qualquer um dos canais abaixo.
        </p>

        <div className="flex justify-center gap-6 md:gap-8 mb-12">
          {SOCIALS.map(({ Icon, label, url, external }) => (
            <a
              key={label}
              href={url}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              aria-label={label}
              className="contact-link w-14 h-14 flex items-center justify-center rounded-full border border-foreground/10 bg-night-light/40 text-foreground/60 hover:border-kiwi hover:text-kiwi hover:bg-kiwi/10 transition-all duration-300 opacity-0"
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        <a
          href={EMAIL_MAILTO}
          className="contact-cta inline-block px-8 py-3 bg-kiwi text-night-deep font-bold rounded-lg hover:bg-kiwi-dark transition-colors glow-kiwi opacity-0"
        >
          ENVIAR MENSAGEM
        </a>
      </div>
    </Section>
  );
}
