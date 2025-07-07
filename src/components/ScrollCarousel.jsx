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

  // Autoplay con cambio de dirección
  useEffect(() => {
    if (!autoplay || !scrollRef.current) return;

    const container = scrollRef.current;

    const scrollStep = () => {
      if (currentDirection === "right") {
        container.scrollLeft += speed;
        // Si llegamos al final, cambiar dirección
        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth
        ) {
          setCurrentDirection("left");
        }
      } else {
        container.scrollLeft -= speed;
        // Si llegamos al principio, cambiar dirección
        if (container.scrollLeft <= 0) {
          setCurrentDirection("right");
        }
      }
    };

    const intervalId = setInterval(scrollStep, interval);
    return () => clearInterval(intervalId);
  }, [autoplay, currentDirection, speed, interval]);

  return (
    <div className="relative w-full overflow-x-hidden gap-32">
      {/* Botón izquierdo */}
      <button
        onClick={() => scroll("left")}
        className="md:flex absolute left-2 text-[#fff] md:text-black top-1/2 -translate-y-1/2 z-10 md:bg-white p-2 rounded-full md:shadow"
      >
        <FiChevronLeft size={20} />
      </button>
      {/* Botón derecho */}
      <button
        onClick={() => scroll("right")}
        className="md:flex absolute right-2 text-[#fff] md:text-black top-1/2 -translate-y-1/2 z-10 md:bg-white p-2 rounded-full md:shadow"
      >
        <FiChevronRight size={20} />
      </button>

      {/* Contenedor scrollable */}
      <div className="w-full overflow-x-hidden px-4">
        <div
          ref={scrollRef}
          className={`flex gap-4 overflow-x-auto scroll-smooth touch-pan-x whitespace-nowrap
            scroll-snap-x scroll-snap-mandatory
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
