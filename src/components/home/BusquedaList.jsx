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

  const getImagen = (item) => {
    return (
      item.imagen ||
      item.imagenDestacada ||
      item.featuredImage ||
      item.bannerImage ||
      ""
    );
  };

  const getTitulo = (item) => {
    return (
      item.nombre || item.titulo || item.title || item.name || "Sin título"
    );
  };

  const getTipo = (item) => {
    return item.tipo || "Sin tipo";
  };

  const getDescripcion = (item) => {
    return item.descripcion || item.description || "";
  };

  const hayContenido =
    loading ||
    error ||
    (input.trim() && resultados.length > 0) ||
    (input.trim() && resultados.length === 0);

  return (
    <>
      <HeroBanner
        onBuscar={() => (
          <SearchBarGlobal
            value={input}
            onChange={setInput}
            onBuscar={handleBuscar}
            onLimpiar={handleLimpiar}
          />
        )}
      />

      {hayContenido && (
        <main
          ref={resultadosRef}
          className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 max-w-screen-xl mx-auto flex flex-col gap-8 py-10"
        >
          {loading && <p className="text-gray-500">Buscando...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {!loading && resultados.length === 0 && input.trim() && (
            <p className="text-gray-500">No se encontraron resultados.</p>
          )}

          {!loading &&
            resultados.map((item) => (
              <Link
                to={getRuta(item.tipo, item.id || item._id)}
                key={item.id || item._id}
              >
                <CardHorizontal
                  title={getTitulo(item)}
                  description={getDescripcion(item)}
                  image={getImagen(item)}
                  tipo={getTipo(item)}
                />
              </Link>
            ))}
        </main>
      )}
    </>
  );
}
