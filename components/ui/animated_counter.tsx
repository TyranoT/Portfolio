"use client";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

interface AnimatedCounterProps {
  value: number;
  label: string;
  suffix?: string;
  shouldAnimate: boolean;
}

export default function AnimatedCounter({ value, label, suffix = "", shouldAnimate }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    if (!shouldAnimate || animated.current) return;
    animated.current = true;

    const obj = { val: 0 };
    animate(obj, {
      val: value,
      duration: 2000,
      ease: "out(4)",
      onUpdate: () => setDisplay(Math.round(obj.val)),
    });
  }, [shouldAnimate, value]);

  return (
    <div className="counter-item flex flex-col items-center gap-2 opacity-0">
      <span className="font-azonix text-3xl md:text-5xl text-kiwi glow-kiwi-text">
        {display}{suffix}
      </span>
      <span className="text-sm text-foreground/50 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
