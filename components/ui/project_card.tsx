"use client";
import Image from "next/image";
import { useState } from "react";
import { FiGithub, FiExternalLink, FiPackage, FiMonitor } from "react-icons/fi";

interface ProjectLink {
  label: string;
  url: string;
  type: "github" | "demo" | "npm";
}

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  links?: ProjectLink[];
  index: number;
  previewImage?: string;
  previewHref?: string;
  /** Sem preview, links nem URLs — apenas menção confidencial */
  private?: boolean;
}

const LINK_ICON = {
  github: FiGithub,
  demo: FiExternalLink,
  npm: FiPackage,
};

export default function ProjectCard({
  title,
  description,
  tags,
  links = [],
  index,
  previewImage,
  previewHref,
  private: isPrivate = false,
}: ProjectCardProps) {
  const [previewFailed, setPreviewFailed] = useState(false);
  const showPreview = !isPrivate && Boolean(previewImage && previewHref);
  const showLinks = !isPrivate && links.length > 0;

  return (
    <div
      className={`project-card opacity-0 group relative flex flex-col overflow-hidden rounded-xl border border-foreground/5 bg-night transition-all duration-400 hover:border-kiwi/30 ${index % 2 === 0 ? "md:translate-x-0" : "md:translate-x-0"}`}
    >
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-kiwi/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      {showPreview && (
        <a
          href={previewHref}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-16/10 w-full shrink-0 overflow-hidden bg-night-light outline-none ring-inset ring-kiwi/0 transition-shadow focus-visible:ring-2 focus-visible:ring-kiwi/50"
          aria-label={`Abrir pré-visualização de ${title} em nova aba`}
        >
          {!previewFailed && previewImage ? (
            <Image
              src={previewImage}
              alt={`Captura de tela de ${title}`}
              fill
              className="object-cover object-top transition duration-500 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 560px"
              onError={() => setPreviewFailed(true)}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-linear-to-br from-night-light to-night-deep px-4 text-center">
              <FiMonitor className="h-10 w-10 text-kiwi/40" aria-hidden />
              <span className="text-xs font-medium uppercase tracking-widest text-kiwi/70">
                Ver ao vivo
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-night to-transparent" />
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-kiwi/30 bg-night-deep/80 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-kiwi opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            Abrir site
          </span>
        </a>
      )}

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 className="font-azonix text-lg text-foreground transition-colors group-hover:text-kiwi md:text-xl">
            {title}
          </h3>
          {isPrivate ? (
            <span className="shrink-0 rounded-full border border-kiwi/25 bg-kiwi/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-kiwi/60">
              Confidencial
            </span>
          ) : (
            showLinks && (
              <div className="flex shrink-0 gap-3">
                {links.map((link) => {
                  const Icon = LINK_ICON[link.type];
                  return (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/40 transition-colors hover:text-kiwi"
                      aria-label={link.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            )
          )}
        </div>

        <p className="mb-6 flex-1 text-sm leading-relaxed text-foreground/60 md:text-base">
          {description}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-kiwi/20 bg-kiwi/5 px-2.5 py-1 text-xs text-kiwi/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
