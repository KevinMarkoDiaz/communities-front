import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardLista from "../components/CardLista";
import Loading from "../components/Loading";
import GridWrapper from "../components/GridWrapper";
import CategoryCarousel from "../components/CategoryCarousel";
import { useNegocios } from "../hooks/useNegocios"; // 🗒️ ELIMINAR cuando uses fetch directamente
import SearchBar from "../components/SearchBar";
import { setBusqueda } from "../store/negociosSlice";
import BannerNegocios from "../components/bussines/BannerNegocios";
import NegociosSugeridos from "../components/home/NegociosSugeridos";
import Pagination from "../components/Pagination";

export default function Negocios() {
  const { negociosFiltrados, loading, error } = useNegocios(); // 🗒️ REEMPLAZAR por tu estado manual de negocios
  const dispatch = useDispatch();
  const busqueda = useSelector((state) => state.negocios.busqueda);

  const gridRef = useRef(null);

  // ✅ Estados de paginación frontend
  const [paginaActual, setPaginaActual] = useState(1);
  const negociosPorPagina = 12;

  // 🟩 Cuando tengas API, agregá estos estados y reemplazá el useNegocios()
  /*
  const [negocios, setNegocios] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    const fetchNegocios = async () => {
      const res = await fetch(`/api/negocios?page=${paginaActual}&limit=${negociosPorPagina}&busqueda=${busqueda}`);
      const data = await res.json();
      setNegocios(data.data);       // negocios actuales
      setTotalPaginas(data.pages);  // total de páginas
    };
    fetchNegocios();
  }, [paginaActual, busqueda]);
  */

  // ✅ Lógica de paginación local con slice (elimina esto al usar la API)
  const totalPaginas = Math.ceil(negociosFiltrados.length / negociosPorPagina);
  const indexInicio = (paginaActual - 1) * negociosPorPagina;
  const indexFin = indexInicio + negociosPorPagina;
  const negociosPaginados = negociosFiltrados.slice(indexInicio, indexFin); // 🗒️ REEMPLAZAR por negocios de la API

  // Solo reiniciar la página si cambia el texto de búsqueda
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

  if (loading) return <Loading mensaje="Cargando negocios..." />;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <>
      <Helmet>
        <title>Communities | Negocios</title>
        <meta
          name="description"
          content="Explora negocios y servicios dentro de tu comunidad migrante."
        />
      </Helmet>

      <div className="w-full max-w-full overflow-hidden flex flex-col gap-18">
        <div className="flex flex-col gap-18">
          <CategoryCarousel />
          <SearchBar
            value={busqueda}
            onChange={(text) => dispatch(setBusqueda(text))}
            placeholder="Buscar negocios..."
          />
        </div>
        <NegociosSugeridos />
        <GridWrapper ref={gridRef} tipo="lista" className="min-h-[70vh]">
          {negociosPaginados.map((negocio) => (
            <Link
              key={negocio.id || negocio._id}
              to={`/negocios/${negocio.id || negocio._id}`}
              className="flex-shrink-0"
            >
              <CardLista
                title={negocio.nombre}
                description={negocio.descripcion}
                image={negocio.imagenDestacada}
                isNew={negocio.isNew}
                hasDiscount={negocio.hasDiscount}
                isVerified={negocio.verificado}
              />
            </Link>
          ))}

          {negociosFiltrados.length === 0 && (
            <p className="text-gray-500 w-full text-center">
              No se encontraron resultados.
            </p>
          )}
        </GridWrapper>
        <Pagination
          totalPages={totalPaginas}
          currentPage={paginaActual}
          onPageChange={setPaginaActual}
        />
        <BannerNegocios scrollToRef={gridRef} />
      </div>
    </>
  );
}
