import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardLista from "../components/CardLista";
import Loading from "../components/Loading";
import GridWrapper from "../components/GridWrapper";
import SearchBar from "../components/SearchBar";
import BannerEvento from "../components/eventos/BannerEvento";
import EventosProximos from "../components/home/EventosProximos";
import Pagination from "../components/Pagination";
import { setBusqueda } from "../store/eventosSlice";
import { useEventos } from "../hooks/useEventos";

export default function Eventos() {
  const dispatch = useDispatch();
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
      <Helmet>
        <title>Communities | Eventos</title>
        <meta
          name="description"
          content="Consulta eventos culturales y comunitarios relevantes para migrantes."
        />
      </Helmet>

      <div className="w-full max-w-full overflow-hidden flex flex-col gap-18">
        <div className="flex flex-col gap-18">
          <SearchBar
            value={busqueda}
            onChange={(text) => dispatch(setBusqueda(text))}
            placeholder="Buscar eventos..."
          />
        </div>

        <EventosProximos />

        {/* Grid paginado */}
        <GridWrapper ref={gridRef} tipo="lista" className="min-h-[70vh]">
          {eventosPaginados.map((evento) => (
            <Link
              to={`/eventos/${evento.id || evento._id}`}
              key={evento.id || evento._id}
              className="flex-shrink-0"
            >
              <CardLista
                title={evento.title}
                description={`${evento.description?.slice(0, 90)}...`}
                image={evento.image}
                isNew={evento.isNew}
                hasDiscount={false}
                isVerified={evento.verificado}
              />
            </Link>
          ))}

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
