// components/BusquedaGlobalWrapper.jsx
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";

import {
  buscarGlobalThunk,
  limpiarBusquedaGlobal,
} from "../../store/busquedaGlobalSlice";
import CardHorizontal from "../home/CardHorizontal";
import SearchBarGlobal from "../home/SearchBarGlobal";

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

      <div ref={resultadosRef} className="flex flex-col gap-4">
        {loading && <p className="text-gray-500">Buscando...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && resultadosFiltrados.length === 0 && input && (
          <p className="text-gray-500"></p>
        )}

        {!loading &&
          resultadosFiltrados.map((item) => (
            <div
              key={item._id || item.id}
              onClick={() => onSelectResultado?.(item)}
              className="cursor-pointer"
            >
              <CardHorizontal
                title={item.nombre || item.titulo || item.title || item.name}
                description={item.descripcion || item.description || ""}
                image={
                  item.imagen ||
                  item.imagenDestacada ||
                  item.featuredImage ||
                  item.bannerImage
                }
                tipo={item.tipo || "Sin tipo"}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
