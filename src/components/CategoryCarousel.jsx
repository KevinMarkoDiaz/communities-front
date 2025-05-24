import { useDispatch, useSelector } from "react-redux";
import { setCategoria } from "../store/negociosSlice";
import { categoriasMock } from "../data/categoriasMock";
import ScrollCarousel from "./ScrollCarousel";

export default function CategoryCarousel() {
  const dispatch = useDispatch();
  const categoriaSeleccionada = useSelector(
    (state) => state.negocios.categoria
  );

  return (
    <div className="mt-4">
      <h3 className="text-[#181411] text-lg font-bold px-4 pb-2 pt-4">
        Categorías
      </h3>

      <ScrollCarousel>
        {categoriasMock.map((cat) => (
          <button
            key={cat.valor}
            onClick={() => dispatch(setCategoria(cat.valor))}
            className={`flex flex-col gap-2 flex-shrink-0 snap-start min-w-[120px] sm:min-w-[140px] md:min-w-[160px]
    rounded-lg text-left transition ring-offset-1 ${
      categoriaSeleccionada === cat.valor ? "ring-2 ring-[#f4c753]" : ""
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
            <p className="text-[#181411] text-sm font-medium leading-tight truncate">
              {cat.nombre}
            </p>
          </button>
        ))}
      </ScrollCarousel>
    </div>
  );
}
