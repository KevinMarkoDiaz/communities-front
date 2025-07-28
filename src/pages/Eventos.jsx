import { Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardLista from "../components/CardLista";
import Loading from "../components/Loading";
import GridWrapper from "../components/GridWrapper";
import BannerEvento from "../components/eventos/BannerEvento";
import EventosProximos from "../components/home/EventosProximos";
import Pagination from "../components/Pagination";
import EventosP from "../assets/EventosP.png";
import BusquedaGlobalWrapper from "../components/search/BusquedaGlobalWrapper";
import ResetBusquedaOnMount from "../utils/ResetBusquedaOnMount";

import { obtenerEventos, setPaginaActual } from "../store/eventosSlice";

export default function Eventos() {
  const dispatch = useDispatch();
  const gridRef = useRef(null);
  const { coords } = useSelector((state) => state.ubicacion);

  const {
    lista: eventos,
    loading,
    error,
    paginaActual,
    totalPaginas,
    busqueda,
  } = useSelector((state) => state.eventos);

  // 🔁 Cargar eventos cada vez que cambie la página o las coords
  useEffect(() => {
    if (coords?.lat && coords?.lng) {
      dispatch(
        obtenerEventos({
          page: paginaActual,
          limit: 12,
          lat: coords.lat,
          lng: coords.lng,
        })
      );
    }
  }, [dispatch, paginaActual, coords]);

  // Reiniciar página si cambia el texto de búsqueda
  useEffect(() => {
    dispatch(setPaginaActual(1));
  }, [busqueda, dispatch]);

  if (loading) return <Loading mensaje="Cargando eventos..." />;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="flex flex-col gap-12 md:gap-16 xl:gap-24 mt-12">
      <ResetBusquedaOnMount />

      <Helmet>
        <title>Communities | Eventos</title>
        <meta
          name="description"
          content="Consulta eventos culturales y comunitarios relevantes para migrantes."
        />
      </Helmet>

      <div className="w-full max-w-full overflow-hidden flex flex-col gap-12 md:gap-16 xl:gap-24">
        <div className="flex flex-col gap-12 md:gap-16 xl:gap-24">
          <EventosProximos imagen={EventosP} />

          <div>
            <h4 className="text-xl md:text-xl font-bold text-black tracking-tight leading-snug my-4">
              Descubre eventos que enriquecen tu conexión cultural
            </h4>
            <BusquedaGlobalWrapper
              placeholder="Buscar eventos..."
              filtroTipo="evento"
              onSelectResultado={(item) =>
                Navigate(`/eventos/${item._id || item.id}`)
              }
            />
          </div>
        </div>

        {/* Grid paginado */}
        <GridWrapper ref={gridRef} tipo="grid" className="min-h-[70vh]">
          {eventos.map((evento) => {
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

          {eventos.length === 0 && (
            <p className="text-gray-500 w-full text-center">
              No hay eventos disponibles.
            </p>
          )}
        </GridWrapper>

        <Pagination
          totalPages={totalPaginas}
          currentPage={paginaActual}
          onPageChange={(page) => dispatch(setPaginaActual(page))}
          gridRef={gridRef}
        />

        <BannerEvento scrollToRef={gridRef} />
      </div>
    </div>
  );
}
