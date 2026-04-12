"use client";

/**
 * Nível 3 (landing): Lenis para inércia em wheel/touch + scroll programático.
 * Não combinar com `html { scroll-behavior: smooth }` — ver comentário em globals.css.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Lenis from "lenis";

const smoothEasing = (t: number) => 1 - Math.pow(1 - t, 3);

/** Segundos — equilíbrio entre “suave” e não exagerar (acessibilidade / controlo) */
const SECTION_SCROLL_DURATION = 1.65;

type ScrollSmoothApi = {
  scrollToSectionId: (sectionId: string) => void;
};

const ScrollSmoothContext = createContext<ScrollSmoothApi | null>(null);

function fallbackScrollToSectionId(sectionId: string) {
  const id = sectionId.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.history.replaceState(null, "", `#${id}`);
  el.scrollIntoView({
    behavior: reduce ? "instant" : "smooth",
    block: "start",
  });
}

export function useScrollSmooth() {
  return useContext(ScrollSmoothContext)?.scrollToSectionId ?? fallbackScrollToSectionId;
}

function runLenisScrollTo(lenis: Lenis, target: HTMLElement, onDone?: () => void) {
  lenis.resize();
  lenis.scrollTo(target, {
    duration: SECTION_SCROLL_DURATION,
    easing: smoothEasing,
    force: true,
    onComplete: onDone,
  });
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  const scrollToSectionId = useCallback((sectionId: string) => {
    const id = sectionId.replace(/^#/, "");
    const hash = `#${id}`;
    const el = document.getElementById(id);
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      window.history.replaceState(null, "", hash);
      el.scrollIntoView({ behavior: "instant", block: "start" });
      return;
    }

    const applyUrl = () => {
      window.history.replaceState(null, "", hash);
    };

    const run = () => {
      const l = lenisRef.current;
      if (!l) {
        applyUrl();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      runLenisScrollTo(l, el, applyUrl);
    };

    if (lenisRef.current) {
      requestAnimationFrame(run);
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(run);
    });
  }, []);

  const api = useMemo(
    () => ({ scrollToSectionId }),
    [scrollToSectionId]
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.15,
      smoothWheel: true,
      syncTouch: true,
      lerp: 0.075,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.05,
      syncTouchLerp: 0.075,
    });
    lenisRef.current = lenis;
    requestAnimationFrame(() => lenis.resize());

    const onAnchorClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = e
        .composedPath()
        .find((n) => n instanceof HTMLAnchorElement) as HTMLAnchorElement | undefined;

      if (!anchor?.hash || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;

      const targetEl = document.querySelector(anchor.hash);
      if (!(targetEl instanceof HTMLElement)) return;

      e.preventDefault();
      runLenisScrollTo(lenis, targetEl, () => {
        window.history.pushState(null, "", anchor.hash);
      });
    };

    const onPopState = () => {
      const { hash } = window.location;
      if (!hash) return;
      const targetEl = document.querySelector(hash);
      if (targetEl instanceof HTMLElement) {
        runLenisScrollTo(lenis, targetEl);
      } else {
        lenis.scrollTo(hash, {
          duration: 1.25,
          easing: smoothEasing,
          force: true,
        });
      }
    };

    document.addEventListener("click", onAnchorClick, true);
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("click", onAnchorClick, true);
      window.removeEventListener("popstate", onPopState);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  return (
    <ScrollSmoothContext.Provider value={api}>{children}</ScrollSmoothContext.Provider>
  );
}
