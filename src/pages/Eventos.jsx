import { Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import CardLista from "../components/CardLista";
import Loading from "../components/Loading";
import GridWrapper from "../components/GridWrapper";
import BannerEvento from "../components/eventos/BannerEvento";
import EventosProximos from "../components/home/EventosProximos";
import Pagination from "../components/Pagination";
import { useEventos } from "../hooks/useEventos";
import EventosP from "../assets/EventosP.png";
import BusquedaGlobalWrapper from "../components/search/BusquedaGlobalWrapper";
import ResetBusquedaOnMount from "../utils/ResetBusquedaOnMount";

export default function Eventos() {
  const { lista: eventosFiltrados, loading, error } = useEventos();
  const busqueda = useSelector((state) => state.eventos.busqueda);

  const gridRef = useRef(null);

  // Estados de paginación frontend
  const [paginaActual, setPaginaActual] = useState(1);
  const eventosPorPagina = 12;

  // Lógica de paginación local con slice
  const totalPaginas = Math.ceil(eventosFiltrados.length / eventosPorPagina);
  const indexInicio = (paginaActual - 1) * eventosPorPagina;
  const indexFin = indexInicio + eventosPorPagina;
  const eventosPaginados = eventosFiltrados.slice(indexInicio, indexFin);

  // Reiniciar página si cambia el texto de búsqueda
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

  if (loading) return <Loading mensaje="Cargando eventos..." />;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <>
      <ResetBusquedaOnMount />

      <Helmet>
        <title>Communities | Eventos</title>
        <meta
          name="description"
          content="Consulta eventos culturales y comunitarios relevantes para migrantes."
        />
      </Helmet>

      <div className="w-full max-w-full overflow-hidden flex flex-col gap-18">
        <div className="flex flex-col gap-18">
          <EventosProximos imagen={EventosP} />
          <div>
            <h4 className="text-xl md:text-xl font-bold text-black tracking-tight leading-snug my-4">
              Descubre eventos que enriquecen tu conexión cultural
            </h4>
            <BusquedaGlobalWrapper
              placeholder="Buscar eventos..."
              filtroTipo="evento"
              onSelectResultado={(item) =>
                Navigate(`/negocios/${item._id || item.id}`)
              }
            />
          </div>
        </div>

        {/* Grid paginado */}
        <GridWrapper ref={gridRef} tipo="grid" className="min-h-[70vh]">
          {eventosPaginados.map((evento) => {
            const {
              _id,
              title,
              description,
              featuredImage,
              isNew = false,
              isVerified = false,
            } = evento;
            return (
              <Link to={`/eventos/${_id}`} key={_id} className="flex-shrink-0">
                <CardLista
                  title={title}
                  description={
                    description?.length > 90
                      ? description.slice(0, 90) + "..."
                      : description || "Sin descripción"
                  }
                  image={featuredImage || ``}
                  isNew={isNew}
                  hasDiscount={false}
                  isVerified={isVerified}
                />
              </Link>
            );
          })}

          {eventosFiltrados.length === 0 && (
            <p className="text-gray-500 w-full text-center">
              No hay eventos disponibles.
            </p>
          )}
        </GridWrapper>

        <Pagination
          totalPages={totalPaginas}
          currentPage={paginaActual}
          onPageChange={setPaginaActual}
        />
        <BannerEvento scrollToRef={gridRef} />
      </div>
    </>
  );
}
