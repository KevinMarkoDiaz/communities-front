import { useDispatch, useSelector } from "react-redux";
import { setCategoria } from "../store/negociosSlice.js";
import { useRef } from "react";
import { categoriasMock } from "../data/categoriasMock.js";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function CategoryCarousel() {
  const dispatch = useDispatch();
  const categoriaSeleccionada = useSelector(
    (state) => state.negocios.categoria
  );
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
    <div className="relative mt-4 w-full ">
      <h3 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Categorías
      </h3>

      {/* Botones visibles solo en tablet/desktop */}
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

      {/* Contenedor del carrusel con overflow oculto externo */}
      <div className="relative overflow-hidden px-4">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth touch-pan-x 
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categoriasMock.map((cat) => (
            <button
              key={cat.valor}
              onClick={() => dispatch(setCategoria(cat.valor))}
              className={`flex flex-col gap-4 rounded-lg min-w-40 text-left flex-shrink-0 ${
                categoriaSeleccionada === cat.valor
                  ? "ring-2 ring-[#f4c753]"
                  : ""
              }`}
            >
              <div
                className={`w-full aspect-square rounded-xl flex items-center justify-center ${
                  cat.imagen ? "bg-cover bg-center bg-no-repeat" : "bg-gray-100"
                }`}
                style={
                  cat.imagen ? { backgroundImage: `url("${cat.imagen}")` } : {}
                }
              >
                {!cat.imagen && (
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                      10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.55-.63-4.9-1.69.01-2.5 3.27-3.88 4.9-3.88
                      1.63 0 4.89 1.38 4.9 3.88C15.55 19.37 13.85 20 12 20zm0-8a3 3 0 100-6 3 3 0 000 6z"
                    />
                  </svg>
                )}
              </div>

              <p className="text-[#181411] text-base font-medium leading-normal">
                {cat.nombre}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
