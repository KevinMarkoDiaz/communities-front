import { useDispatch, useSelector } from "react-redux";
import { setCategoria } from "../store/negociosSlice";
import { useRef } from "react";

import { categoriasMock } from "../data/categoriasMock.js";

export default function CategoryCarousel() {
  const dispatch = useDispatch();
  const categoriaSeleccionada = useSelector(
    (state) => state.negocios.categoria
  );
  const scrollRef = useRef(null);

  return (
    <div className="mt-4">
      <h3 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Categories
      </h3>

      <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div ref={scrollRef} className="flex items-stretch p-4 gap-3">
          {categoriasMock.map((cat) => (
            <button
              key={cat.valor}
              onClick={() => dispatch(setCategoria(cat.valor))}
              className={`flex h-full flex-col gap-4 rounded-lg min-w-40 text-left ${
                categoriaSeleccionada === cat.valor
                  ? "ring-2 ring-[#f4c753]"
                  : ""
              }`}
            >
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col"
                style={{
                  backgroundImage: cat.imagen ? `url("${cat.imagen}")` : "none",
                  backgroundColor: cat.imagen ? "transparent" : "#E4E9F1",
                }}
              />
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
