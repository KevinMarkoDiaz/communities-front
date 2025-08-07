import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  buscarGlobalThunk,
  limpiarBusquedaGlobal,
} from "../../store/busquedaGlobalSlice";
import SearchBarGlobal from "../home/SearchBarGlobal";
import CardResultadoCuadrada from "../home/CardResultadoCuadrada";

// Helpers
const getImagen = (item) =>
  item.imagen ||
  item.imagenDestacada ||
  item.featuredImage ||
  item.bannerImage ||
  "";
const getTitulo = (item) =>
  item.nombre || item.titulo || item.title || item.name || "Sin título";

const getTipo = (item) => item.tipo || "Sin tipo";

const getRuta = (tipo, id) => {
  switch (tipo) {
    case "negocio":
      return `/negocios/${id}`;
    case "evento":
      return `/eventos/${id}`;
    case "comunidad":
      return `/comunidades/${id}`;
    default:
      return "#";
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
  }),
};

export default function BusquedaGlobalWrapper({
  placeholder = "Buscar...",
  filtroTipo = null,
  onSelectResultado = null,
}) {
  const dispatch = useDispatch();
  const { resultados, loading, error } = useSelector(
    (state) => state.busquedaGlobal
  );
  const [input, setInput] = useState("");
  const resultadosRef = useRef(null);

  const handleBuscar = () => {
    const texto = input.trim();
    if (texto) {
      dispatch(buscarGlobalThunk(texto)).then(() => {
        resultadosRef.current?.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      dispatch(limpiarBusquedaGlobal());
    }
  };

  const handleLimpiar = () => {
    setInput("");
    dispatch(limpiarBusquedaGlobal());
  };

  const resultadosFiltrados = filtroTipo
    ? resultados.filter((item) => item.tipo === filtroTipo)
    : resultados;

  return (
    <div className="w-full flex flex-col gap-6">
      <SearchBarGlobal
        value={input}
        onChange={setInput}
        onBuscar={handleBuscar}
        onLimpiar={handleLimpiar}
        placeholder={placeholder}
      />

      {resultadosFiltrados.length > 0 && (
        <>
          <div className="min-h-[20vh]">
            {loading && <p className="text-gray-500">Buscando...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && resultadosFiltrados.length === 0 && input && (
              <p className="text-gray-500">No se encontraron resultados.</p>
            )}

            <motion.div
              ref={resultadosRef}
              className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(180px,180px))] md:grid-cols-[repeat(auto-fit,minmax(180px,180px))] gap-4 max-w-7xl mx-auto mt-10"
              initial="hidden"
              animate="visible"
            >
              {resultadosFiltrados.map((item, i) => {
                const ruta = getRuta(item.tipo, item._id || item.id);
                return (
                  <motion.div
                    key={item._id || item.id}
                    custom={i}
                    variants={itemVariants}
                    className={`cursor-pointer flex flex-col items-center justify-center ${
                      item.isPremium ? "col-span-2" : ""
                    }`}
                    onClick={() => onSelectResultado?.(item)}
                  >
                    <Link to={ruta} className="w-full flex justify-center">
                      <CardResultadoCuadrada
                        title={getTitulo(item)}
                        image={getImagen(item)}
                        tipo={getTipo(item)}
                        isPremium={item.isPremium}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-gray-200 mt-12" />

          {/* Botón limpiar */}
          <div className="flex justify-center">
            <button
              onClick={handleLimpiar}
              className="mt-4 px-6 py-2 rounded-2xl bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm transition"
            >
              Limpiar búsqueda
            </button>
          </div>
        </>
      )}
    </div>
  );
}
