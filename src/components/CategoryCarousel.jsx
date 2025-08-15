import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategorias } from "../store/categoriasSlice";
import ScrollCarousel from "./ScrollCarousel";

// slices
import {
  setCategoria as setCategoriaNegocios,
  obtenerNegocios,
} from "../store/negociosSlice";
import {
  setCategoria as setCategoriaEventos,
  obtenerEventos,
} from "../store/eventosSlice";

export default function CategoryCarousel({ tipo = "negocios" }) {
  const dispatch = useDispatch();

  const categoriaSeleccionada = useSelector((state) =>
    tipo === "eventos" ? state.eventos.categoria : state.negocios.categoria
  );

  const categorias = useSelector((state) => state.categorias.data);
  const loading = useSelector((state) => state.categorias.loading);

  useEffect(() => {
    dispatch(fetchCategorias());
  }, [dispatch]);

  const handleSeleccionCategoria = (valor) => {
    if (tipo === "eventos") {
      dispatch(setCategoriaEventos(valor));
      if (valor === "todas") {
        dispatch(obtenerEventos({ page: 1 }));
      } else {
        dispatch(obtenerEventos({ all: true }));
      }
    } else {
      dispatch(setCategoriaNegocios(valor));
      if (valor === "todas") {
        dispatch(obtenerNegocios({ page: 1 }));
      } else {
        dispatch(obtenerNegocios({ all: true }));
      }
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-[#181411] text-lg font-bold px-4 pb-2 pt-4">
        Categorías
      </h3>

      {loading ? (
        <p className="px-4">Cargando categorías...</p>
      ) : (
        <>
          <ScrollCarousel>
            {categorias.map((cat) => {
              const valor = (cat.valor || cat.name).toLowerCase();
              const seleccionada =
                categoriaSeleccionada.toLowerCase() === valor;

              return (
                <button
                  key={cat._id}
                  onClick={() => handleSeleccionCategoria(valor)}
                  className={`group flex flex-col gap-2 flex-shrink-0 snap-start p-2 cursor-pointer
                    w-[40vw] aspect-square md:w-[205px]
                    rounded-2xl text-left ring-offset-6 transition
${seleccionada ? "border-4 border-[#f4c753]" : "border border-transparent"}
                  `}
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
                  <p className="line-clamp-2 text-[#181411]  text-xs font-medium leading-tight mt-1 transition-colors duration-200 ">
                    {cat.name}
                  </p>
                </button>
              );
            })}
          </ScrollCarousel>

          <div className="px-4 pt-3">
            <button
              onClick={() => handleSeleccionCategoria("todas")}
              className="mt-4 inline-block bg-white text-[#181411] font-semibold  text-xs md:text-sm px-4 py-2 border border-gray-300 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors duration-200"
            >
              Todas las categorías
            </button>
          </div>
        </>
      )}
    </div>
  );
}
