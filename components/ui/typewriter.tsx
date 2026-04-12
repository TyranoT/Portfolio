"use client";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

interface TypeWriterProps {
  text: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
  as?: "h1" | "p" | "span";
}

export default function TypeWriter({
  text,
  delay = 0,
  speed = 40,
  onComplete,
  className = "",
  showCursor = true,
  as: Tag = "span",
}: TypeWriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current) return;
    animated.current = true;

    const obj = { charIndex: 0 };
    const duration = text.length * speed;

    animate(obj, {
      charIndex: text.length,
      duration,
      delay,
      ease: "linear",
      onUpdate: () => {
        const idx = Math.floor(obj.charIndex);
        setDisplayed(text.slice(0, idx));
      },
      onComplete: () => {
        setDisplayed(text);
        setDone(true);
        onComplete?.();
      },
    });
  }, [text, delay, speed, onComplete]);

  return (
    <Tag className={className}>
      {displayed}
      {showCursor && !done && <span className="typing-cursor" />}
    </Tag>
  );
}
