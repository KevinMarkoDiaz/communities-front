import { Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CardLista from "../components/CardLista";
import GridWrapper from "../components/GridWrapper";
import BannerEvento from "../components/eventos/BannerEvento";
import EventosProximos from "../components/home/EventosProximos";
import Pagination from "../components/Pagination";
import BusquedaGlobalWrapper from "../components/search/BusquedaGlobalWrapper";
import ResetBusquedaOnMount from "../utils/ResetBusquedaOnMount";
import ilust2 from "../assets/ilust2.svg";

import {
  obtenerEventos,
  setPaginaActual,
  setCategoria,
} from "../store/eventosSlice";
import SkeletonNegocioCard from "../components/Skeleton/SkeletonNegocioCard"; // puedes cambiar por uno de eventos si querés
import CategoryCarousel from "../components/CategoryCarousel"; // ya deberías tenerlo

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
    categoria,
  } = useSelector((state) => state.eventos);

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

  useEffect(() => {
    dispatch(setPaginaActual(1));
  }, [busqueda, dispatch]);

  const eventosFiltrados =
    categoria === "todas"
      ? eventos
      : eventos.filter((ev) =>
          ev.categories?.some(
            (cat) => (cat.name || "").toLowerCase() === categoria.toLowerCase()
          )
        );

  return (
    <div className="flex flex-col gap-12 md:gap-16 xl:gap-24 mt-12 p-4">
      <ResetBusquedaOnMount />

      <Helmet>
        <title>Communidades | Eventos</title>
        <meta
          name="description"
          content="Consulta eventos culturales y comunitarios relevantes para migrantes."
        />
      </Helmet>

      <div className="w-full max-w-full overflow-hidden flex flex-col gap-12 md:gap-16 xl:gap-24">
        <div className="flex flex-col gap-12 md:gap-16 xl:gap-24">
          <EventosProximos />

          <div>
            <h4 className=" text-lg md: text-lg font-bold text-black tracking-tight leading-snug my-4">
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

          <CategoryCarousel tipo="eventos" />
        </div>

        <div className="min-h-[70vh]">
          <GridWrapper ref={gridRef} tipo="grid">
            {loading ? (
              Array.from({ length: 12 }).map((_, i) => (
                <SkeletonNegocioCard key={i} />
              ))
            ) : eventosFiltrados.length > 0 ? (
              eventosFiltrados.map((evento) => {
                const {
                  _id,
                  title,
                  description,
                  featuredImage,
                  isNew = false,
                  isVerified = false,
                } = evento;
                return (
                  <Link
                    to={`/eventos/${_id}`}
                    key={_id}
                    className="flex-shrink-0"
                  >
                    <CardLista
                      title={title}
                      description={
                        description?.length > 90
                          ? description.slice(0, 90) + "..."
                          : description || "Sin descripción"
                      }
                      image={featuredImage || ""}
                      isNew={isNew}
                      hasDiscount={false}
                      isVerified={isVerified}
                    />
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full flex justify-center py-16 w-full">
                <div className="flex flex-col items-center text-center gap-5 max-w-sm w-full px-4">
                  <img
                    src={ilust2}
                    alt="Sin eventos"
                    className="w-32 md:w-60 xl:w-120 opacity-90"
                  />
                  <p className="text-gray-600  text-xs md:text-base xl: text-lg">
                    Ups... no encontramos ningún evento en esta categoría dentro
                    de tu comunidad.
                    <br />
                    Quizás aún nadie lo ha organizado.
                  </p>
                  <Link
                    to="/dashboard/mis-eventos/crear"
                    className="inline-block shadow-2xl bg-orange-500 hover:bg-orange-600 text-white  text-xs font-medium px-4 py-2 xl: text-lg rounded-2xl transition"
                  >
                    ¿Tienes una idea de evento? Publícalo aquí
                  </Link>
                </div>
              </div>
            )}
          </GridWrapper>
        </div>

        {!loading && eventosFiltrados.length > 0 && (
          <Pagination
            totalPages={totalPaginas}
            currentPage={paginaActual}
            onPageChange={(page) => dispatch(setPaginaActual(page))}
            gridRef={gridRef}
          />
        )}

        <BannerEvento scrollToRef={gridRef} />
      </div>
    </div>
  );
}
