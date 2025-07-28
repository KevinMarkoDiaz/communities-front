// src/pages/Comunidades.jsx
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GridWrapper from "../components/GridWrapper";
import CardLista from "../components/CardLista";
import Loading from "../components/Loading";
import BannerComunidades from "../components/communities/BannerComunidades";
import ComunidadesDestacadas from "../components/home/ComunidadesDestacadas";
import Pagination from "../components/Pagination";
import ComunidadesD from "../assets/ComunidadesD.png";
import BusquedaGlobalWrapper from "../components/search/BusquedaGlobalWrapper";
import ResetBusquedaOnMount from "../utils/ResetBusquedaOnMount";

import { fetchComunidades, setBusqueda } from "../store/comunidadesSlice";

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

  // Cargar comunidades con paginación desde el backend
  useEffect(() => {
    if (coords) {
      dispatch(fetchComunidades({ lat: coords.lat, lng: coords.lng, page: 1 }));
    }
  }, [dispatch, coords]);

  // Reiniciar paginación si cambia la búsqueda
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

  if (loadingLista) return <Loading mensaje="Cargando comunidades..." />;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="flex flex-col gap-12 md:gap-16 xl:gap-24 mt-12">
      <ResetBusquedaOnMount />

      <Helmet>
        <title>Communities | Comunidades</title>
        <meta
          name="description"
          content="Explora comunidades migrantes con negocios, eventos y servicios propios."
        />
      </Helmet>

      <div className="w-full max-w-full overflow-hidden flex flex-col gap-12 md:gap-16 xl:gap-24">
        <div className="flex flex-col gap-12 md:gap-16 xl:gap-24">
          <ComunidadesDestacadas imagen={ComunidadesD} />

          <div>
            <h4 className="text-xl md:text-xl font-bold text-black tracking-tight leading-snug my-4">
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

        <GridWrapper ref={gridRef} tipo="grid" className="min-h-[70vh]">
          {comunidades.map((comunidad) => (
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
          ))}

          {comunidades.length === 0 && (
            <p className="text-gray-500 w-full text-center">
              No se encontraron comunidades.
            </p>
          )}
        </GridWrapper>

        <Pagination
          totalPages={totalPages || 1}
          currentPage={currentPage || 1}
          onPageChange={handlePageChange}
          gridRef={gridRef}
        />

        <BannerComunidades scrollToRef={gridRef} />
      </div>
    </div>
  );
}
