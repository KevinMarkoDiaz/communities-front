import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import {
  buscarGlobalThunk,
  limpiarBusquedaGlobal,
} from "../../store/busquedaGlobalSlice";
import CardHorizontal from "./CardHorizontal";
import { Link } from "react-router-dom";
import HeroBanner from "../HeroBanner";
import SearchBarGlobal from "./SearchBarGlobal";

export default function BusquedaList() {
  const dispatch = useDispatch();
  const { resultados, loading, error } = useSelector(
    (state) => state.busquedaGlobal
  );
  const [input, setInput] = useState("");

  const resultadosRef = useRef(null); // 👈 ref para el scroll

  const handleBuscar = () => {
    const texto = input.trim();
    if (texto) {
      dispatch(buscarGlobalThunk(texto)).then(() => {
        // 👇 hacemos scroll suave a los resultados después de la búsqueda
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

  return (
    <>
      <HeroBanner
        onBuscar={() => (
          <SearchBarGlobal
            value={input}
            onChange={setInput}
            onBuscar={handleBuscar}
            onLimpiar={handleLimpiar}
            placeholder="Buscar negocios, eventos, comunidades"
          />
        )}
      />

      <div
        ref={resultadosRef} // 👈 marcamos la sección a la que hacer scroll
        className="layout-content-container flex flex-col max-w-[960px] mx-auto space-y-4"
      >
        {loading && <p className="text-gray-500 px-4">Buscando...</p>}
        {error && <p className="text-red-500 px-4">Error: {error}</p>}

        {!loading && resultados.length === 0 && input && (
          <p className="text-gray-500 px-4">No se encontraron resultados.</p>
        )}

        {resultados.map((item) => {
          const id = item.id || item._id;
          const title = item.nombre || item.title || item.name || "Sin título";
          const description = item.descripcion || item.description || "";
          const image = item.imagenDestacada || item.flagImage || null;

          let to = "#";
          if (item.tipo === "negocio") to = `/negocios/${id}`;
          else if (item.tipo === "evento") to = `/eventos/${id}`;
          else if (item.tipo === "comunidad") to = `/comunidades/${id}`;

          return (
            <Link to={to} key={id}>
              <CardHorizontal
                title={title}
                description={description}
                image={image}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}
