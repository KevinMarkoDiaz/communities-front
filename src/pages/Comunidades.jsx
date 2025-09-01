// src/pages/Comunidades.jsx
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import GridWrapper from "../components/GridWrapper";
import CardLista from "../components/CardLista";
import BannerComunidades from "../components/communities/BannerComunidades";
import ComunidadesDestacadas from "../components/home/ComunidadesDestacadas";
import Pagination from "../components/Pagination";
import BusquedaGlobalWrapper from "../components/search/BusquedaGlobalWrapper";
import ResetBusquedaOnMount from "../utils/ResetBusquedaOnMount";

import { fetchComunidades } from "../store/comunidadesSlice";
import SkeletonNegocioCard from "../components/Skeleton/SkeletonNegocioCard";

export default function Comunidades() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gridRef = useRef(null);

  const {
    lista: comunidades,
    loadingLista,
    error,
    busqueda,
    totalPages,
    currentPage,
  } = useSelector((state) => state.comunidades) || {};
  const { coords } = useSelector((state) => state.ubicacion) || {};

  // Normaliza cualquier forma de lista a array
  const comunidadesSeguras = useMemo(() => {
    if (Array.isArray(comunidades)) return comunidades;
    if (Array.isArray(comunidades?.data)) return comunidades.data;
    if (comunidades && typeof comunidades === "object") {
      const plausible = Object.values(comunidades).find((v) =>
        Array.isArray(v)
      );
      if (Array.isArray(plausible)) return plausible;
    }
    return [];
  }, [comunidades]);

  // Carga inicial y cuando cambie la búsqueda/paginación
  useEffect(() => {
    if (!coords) return;
    dispatch(fetchComunidades({ lat: coords.lat, lng: coords.lng, page: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, coords]);

  // Si quisieras refetch por cambios en busqueda (según tu slice)
  useEffect(() => {
    if (!coords) return;
    dispatch(fetchComunidades({ lat: coords.lat, lng: coords.lng, page: 1 }));
  }, [dispatch, coords, busqueda]);

  const handlePageChange = (page) => {
    if (!coords) return;
    dispatch(fetchComunidades({ lat: coords.lat, lng: coords.lng, page }));
  };

  if (error)
    return <div className="p-4 text-red-600">Error: {String(error)}</div>;

  return (
    <div className="flex flex-col gap-12 md:gap-16 xl:gap-24 mt-12">
      <ResetBusquedaOnMount />

      <Helmet>
        <title>Communidades | Comunidades</title>
        <meta
          name="description"
          content="Explora comunidades migrantes con negocios, eventos y servicios propios."
        />
      </Helmet>

      {/* SECCIÓN DESTACADA + BUSCADOR */}
      <div className="flex flex-col gap-12 md:gap-16 xl:gap-24">
        <ComunidadesDestacadas />

        <div>
          <h4 className=" text-lg sm:text-2xl font-bold text-black tracking-tight leading-snug my-4">
            Buscá tu comunidad de origen o afinidad
          </h4>
          <BusquedaGlobalWrapper
            placeholder="Buscar tu comunidad..."
            filtroTipo="comunidad"
            onSelectResultado={(item) =>
              navigate(`/comunidades/${item?._id || item?.id}`)
            }
          />
        </div>
      </div>

      {/* GRID DE COMUNIDADES */}
      <GridWrapper
        ref={gridRef}
        tipo="grid"
        className="min-h-[30vh] md:min-h-[130vh] flex-grow"
      >
        {loadingLista ? (
          Array.from({ length: 12 }).map((_, i) => (
            <SkeletonNegocioCard key={i} />
          ))
        ) : comunidadesSeguras.length > 0 ? (
          comunidadesSeguras.map((comunidad) => {
            if (!comunidad) return null;
            const id = comunidad.id || comunidad._id;
            const title = comunidad.name || "Comunidad";
            const description = comunidad.description || "";
            const image = comunidad.bannerImage || comunidad.flagImage;
            const logo = comunidad.flagImage;
            const isVerified = Boolean(comunidad.isVerified);

            return (
              <Link
                key={id}
                to={`/comunidades/${id}`}
                className="flex-shrink-0"
              >
                <CardLista
                  title={title}
                  description={description}
                  image={image}
                  isVerified={isVerified}
                  logo={logo}
                />
              </Link>
            );
          })
        ) : (
          <p className="text-gray-500 w-full text-center">
            No se encontraron comunidades.
          </p>
        )}
      </GridWrapper>

      {/* Paginación */}
      {!loadingLista && comunidadesSeguras.length > 0 && (
        <Pagination
          totalPages={totalPages || 1}
          currentPage={currentPage || 1}
          onPageChange={handlePageChange}
          gridRef={gridRef}
        />
      )}

      {/* Banner final */}
      <BannerComunidades scrollToRef={gridRef} />
    </div>
  );
}
