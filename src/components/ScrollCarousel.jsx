import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ScrollCarousel({ children }) {
  const scrollRef = useRef(null);

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

  return (
    <div className="relative w-full overflow-hidden">
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
      >
        <FiChevronLeft size={20} />
      </button>
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow"
      >
        <FiChevronRight size={20} />
      </button>
      <div className="w-full overflow-hidden px-4">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth touch-pan-x whitespace-nowrap
          scroll-snap-x scroll-snap-mandatory
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
