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
    <div className="relative w-full overflow-x-hidden gap-32">
      <button
        onClick={() => scroll("left")}
        className=" md:flex absolute left-2 text-[#Fff] md:text-black top-1/2 -translate-y-2/2  md:-translate-y-2/2 z-10 md:bg-white p-2 rounded-full md:shadow"
      >
        <FiChevronLeft size={20} />
      </button>
      <button
        onClick={() => scroll("right")}
        className=" md:flex absolute right-2 text-[#fff] md:text-black top-1/2 -translate-y-2/2 z-10 md:bg-white p-2 rounded-full md:shadow"
      >
        <FiChevronRight size={20} />
      </button>
      <div className="w-full overflow-x-hidden px-4">
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
