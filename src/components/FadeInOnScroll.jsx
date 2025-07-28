import { useEffect, useRef, useState } from "react";

/**
 * Props:
 * - children: contenido a animar
 * - direction: "up" | "down" | "left" | "right"
 * - duration: duración de la animación en ms (ej. 700)
 * - delay: retraso en ms (ej. 0, 300, etc.)
 * - once: si solo debe animarse una vez (default: true)
 * - className: clases adicionales
 */ export default function FadeInOnScroll({
  children,
  direction = "up",
  duration = 700,
  delay = 0,
  once = true,
  className = "",
}) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const translateMap = {
    up: "translate-y-6",
    down: "-translate-y-6",
    left: "translate-x-6",
    right: "-translate-x-6",
  };
  const initialTransform = translateMap[direction] || "translate-y-6";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`
        transition-all ease-out
        duration-[${duration}ms]
        delay-[${delay}ms]
        ${
          isVisible
            ? "opacity-100 scale-100 translate-x-0 translate-y-0"
            : `opacity-0 ${initialTransform} scale-95`
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}
