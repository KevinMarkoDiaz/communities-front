// src/pages/Comunidades.jsx
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GridWrapper from "../components/GridWrapper";
import CardLista from "../components/CardLista";
import BannerComunidades from "../components/communities/BannerComunidades";
import ComunidadesDestacadas from "../components/home/ComunidadesDestacadas";
import Pagination from "../components/Pagination";
import BusquedaGlobalWrapper from "../components/search/BusquedaGlobalWrapper";
import ResetBusquedaOnMount from "../utils/ResetBusquedaOnMount";

import { fetchComunidades, setBusqueda } from "../store/comunidadesSlice";
import SkeletonNegocioCard from "../components/Skeleton/SkeletonNegocioCard";

export default function Comunidades() {
  const dispatch = useDispatch();
  const gridRef = useRef(null);

  const {
    lista: comunidades,
    loadingLista,
    error,
    busqueda,
    totalPages,
    currentPage,
  } = useSelector((state) => state.comunidades);
  const { coords } = useSelector((state) => state.ubicacion);

  useEffect(() => {
    if (coords) {
      dispatch(fetchComunidades({ lat: coords.lat, lng: coords.lng, page: 1 }));
    }
  }, [dispatch, coords]);

  useEffect(() => {
    if (coords) {
      dispatch(fetchComunidades({ lat: coords.lat, lng: coords.lng, page: 1 }));
    }
  }, [busqueda]);

  const handlePageChange = (page) => {
    if (coords) {
      dispatch(fetchComunidades({ lat: coords.lat, lng: coords.lng, page }));
    }
  };

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="w-full max-w-[1440px] px-4 sm:px-6 md:px-10 xl:px-20 mx-auto flex flex-col gap-12 md:gap-16 xl:gap-24 mt-12">
      <ResetBusquedaOnMount />

      <Helmet>
        <title>Communities | Comunidades</title>
        <meta
          name="description"
          content="Explora comunidades migrantes con negocios, eventos y servicios propios."
        />
      </Helmet>

      {/* SECCIÓN DESTACADA + BUSCADOR */}
      <div className="flex flex-col gap-12 md:gap-16 xl:gap-24">
        <ComunidadesDestacadas />

        <div>
          <h4 className="text-xl sm:text-2xl font-bold text-black tracking-tight leading-snug my-4">
            Buscá tu comunidad de origen o afinidad
          </h4>
          <BusquedaGlobalWrapper
            placeholder="Buscar tu comunidad..."
            filtroTipo="comunidad"
            onSelectResultado={(item) =>
              Navigate(`/comunidades/${item._id || item.id}`)
            }
          />
        </div>
      </div>

      {/* GRID DE COMUNIDADES */}
      <GridWrapper ref={gridRef} tipo="grid" className="min-h-[30vh]">
        {loadingLista ? (
          Array.from({ length: 12 }).map((_, i) => (
            <SkeletonNegocioCard key={i} />
          ))
        ) : comunidades.length > 0 ? (
          comunidades.map((comunidad) => (
            <Link
              key={comunidad.id || comunidad._id}
              to={`/comunidades/${comunidad.id || comunidad._id}`}
              className="flex-shrink-0"
            >
              <CardLista
                title={comunidad.name}
                description={comunidad.description}
                image={comunidad.bannerImage || comunidad.flagImage}
                isVerified={comunidad.isVerified}
                logo={comunidad.flagImage}
              />
            </Link>
          ))
        ) : (
          <p className="text-gray-500 w-full text-center">
            No se encontraron comunidades.
          </p>
        )}
      </GridWrapper>

      {/* Paginación */}
      <Pagination
        totalPages={totalPages || 1}
        currentPage={currentPage || 1}
        onPageChange={handlePageChange}
        gridRef={gridRef}
      />

      {/* Banner final */}
      <BannerComunidades scrollToRef={gridRef} />
    </div>
  );
}
