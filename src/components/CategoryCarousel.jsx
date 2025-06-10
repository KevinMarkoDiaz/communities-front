import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoria } from "../store/negociosSlice";
import { fetchCategorias } from "../store/categoriasSlice";
import ScrollCarousel from "./ScrollCarousel";

export default function CategoryCarousel() {
  const dispatch = useDispatch();
  const categoriaSeleccionada = useSelector(
    (state) => state.negocios.categoria
  );
  const categorias = useSelector((state) => state.categorias.data);
  const loading = useSelector((state) => state.categorias.loading);

  useEffect(() => {
    dispatch(fetchCategorias());
  }, [dispatch]);

  return (
    <div className="mt-4">
      <h3 className="text-[#181411] text-lg font-bold px-4 pb-2 pt-4">
        Categorías
      </h3>

      {loading ? (
        <p className="px-4">Cargando categorías...</p>
      ) : (
        <ScrollCarousel>
          {categorias.map((cat) => (
            <button
              key={cat._id}
              onClick={() => dispatch(setCategoria(cat.valor || cat.name))}
              className={`flex flex-col gap-2 flex-shrink-0 snap-start
    w-[40vw] aspect-square sm:w-[140px] md:w-[160px]
    rounded-lg text-left transition ring-offset-1 ${
      categoriaSeleccionada === (cat.valor || cat.name)
        ? "ring-2 ring-[#f4c753]"
        : ""
    }`}
            >
              <div
                className="w-full h-full rounded-xl flex items-center justify-center bg-gray-100 overflow-hidden"
                style={
                  cat.icon
                    ? {
                        backgroundImage: `url("${cat.icon}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : {}
                }
              >
                {!cat.icon && (
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
              <p className="text-[#181411] text-sm font-medium leading-tight truncate mt-1">
                {cat.name}
              </p>
            </button>
          ))}
        </ScrollCarousel>
      )}
    </div>
  );
}
