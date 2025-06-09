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

      <main
        ref={resultadosRef}
        className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 max-w-screen-xl mx-auto flex flex-col gap-8 py-10"
      >
        {loading && <p className="text-gray-500">Buscando...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && resultados.length === 0 && input && (
          <p className="text-gray-500">No se encontraron resultados.</p>
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
            <Link to={to} key={id} className="w-full">
              <CardHorizontal
                title={title}
                description={description}
                image={image}
              />
            </Link>
          );
        })}
      </main>
    </>
  );
}
