import { useRef, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ScrollCarousel({ children, className = "" }) {
  const scrollRef = useRef(null);
  const [hasScroll, setHasScroll] = useState(false);

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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      setHasScroll(el.scrollWidth > el.clientWidth);
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [children]);

  return (
    <div className="relative w-full z-0 ">
      {/* Flechitas decorativas mobile */}
      <div className="absolute left-1 top-1/2 -translate-y-1/2 z-20 md:hidden pointer-events-none">
        <FiChevronLeft
          size={20}
          className="text-white opacity-90 drop-shadow"
        />
      </div>
      <div className="absolute right-1 top-1/2 -translate-y-1/2 z-20 md:hidden pointer-events-none">
        <FiChevronRight
          size={20}
          className="text-white opacity-90 drop-shadow"
        />
      </div>

      {/* Botones desktop */}
      {hasScroll && (
        <>
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition pointer-events-auto"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition pointer-events-auto"
          >
            <FiChevronRight size={20} />
          </button>
        </>
      )}

      {/* Contenedor scrollable */}
      <div className="w-full overflow-x-hidden ">
        <div
          ref={scrollRef}
          className={`z-10 flex gap-4  overflow-x-auto scroll-smooth touch-pan-x whitespace-nowrap
            snap-x snap-mandatory
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
