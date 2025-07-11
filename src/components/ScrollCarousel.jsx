import { useRef, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ScrollCarousel({
  children,
  autoplay = false,
  initialDirection = "right", // empieza en esta dirección
  speed = 1,
  interval = 20,
  className = "",
}) {
  const scrollRef = useRef(null);
  const [currentDirection, setCurrentDirection] = useState(initialDirection);

  // Botones de scroll manual
  const scroll = (dir) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = container.offsetWidth * 0.6;
      container.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Autoplay con cambio de dirección solo en desktop
  useEffect(() => {
    if (!autoplay || !scrollRef.current) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return; // 🚫 No autoplay en mobile

    const container = scrollRef.current;

    const scrollStep = () => {
      if (currentDirection === "right") {
        container.scrollLeft += speed;
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          setCurrentDirection("left");
        }
      } else {
        container.scrollLeft -= speed;
        if (container.scrollLeft <= 0) {
          setCurrentDirection("right");
        }
      }
    };

    const intervalId = setInterval(scrollStep, interval);
    return () => clearInterval(intervalId);
  }, [autoplay, currentDirection, speed, interval]);

  return (
    <div className="relative w-full">
      {/* Flechitas decorativas solo mobile (más visibles) */}
      <div className="absolute left-1 top-1/2 -translate-y-1/2 z-10 md:hidden pointer-events-none">
        <FiChevronLeft
          size={20}
          className="text-white opacity-90 drop-shadow"
        />
      </div>
      <div className="absolute right-1 top-1/2 -translate-y-1/2 z-10 md:hidden pointer-events-none">
        <FiChevronRight
          size={20}
          className="text-white opacity-90 drop-shadow"
        />
      </div>

      {/* Botón izquierdo desktop */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-2 text-black top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
      >
        <FiChevronLeft size={20} />
      </button>

      {/* Botón derecho desktop */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-2 text-black top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
      >
        <FiChevronRight size={20} />
      </button>

      {/* Contenedor scrollable */}
      <div className="w-full overflow-x-hidden px-2">
        <div
          ref={scrollRef}
          className={`flex gap-4 overflow-x-auto scroll-smooth touch-pan-x whitespace-nowrap
            snap-x snap-mandatory
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
