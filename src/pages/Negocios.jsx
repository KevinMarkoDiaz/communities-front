import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import CardLista from "../components/CardLista";
import Loading from "../components/Loading";
import GridWrapper from "../components/GridWrapper";
import CategoryCarousel from "../components/CategoryCarousel";
import BannerNegocios from "../components/bussines/BannerNegocios";
import NegociosSugeridos from "../components/home/NegociosSugeridos";
import Pagination from "../components/Pagination";
import NegociosS from "../assets/NegociosS.png";
import BusquedaGlobalWrapper from "../components/search/BusquedaGlobalWrapper";
import ResetBusquedaOnMount from "../utils/ResetBusquedaOnMount";

import { obtenerNegocios } from "../store/negociosSlice";

export default function Negocios() {
  const { coords } = useSelector((state) => state.ubicacion);
  const { loaded } = useSelector((state) => state.negocios);

  const dispatch = useDispatch();
  const gridRef = useRef(null);

  const {
    lista: negociosFiltrados,
    loading,
    error,
    currentPage,
    totalPages,
    busqueda,
  } = useSelector((state) => state.negocios);

  useEffect(() => {
    if (coords && !loaded) {
      dispatch(obtenerNegocios({ page: 1 }));
    }
  }, [dispatch, coords, loaded]);

  const handlePageChange = (newPage) => {
    if (coords) {
      dispatch(obtenerNegocios({ page: newPage }));
    }
  };

  if (loading) return <Loading mensaje="Cargando negocios..." />;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="flex flex-col gap-12 md:gap-16 xl:gap-24 mt-12">
      <ResetBusquedaOnMount />

      <Helmet>
        <title>Communities | Negocios</title>
        <meta
          name="description"
          content="Explora negocios y servicios dentro de tu comunidad migrante."
        />
      </Helmet>

      <div className="w-full max-w-full overflow-hidden flex flex-col gap-12 md:gap-16 xl:gap-24">
        <div className="flex flex-col gap-12 md:gap-16 xl:gap-24">
          <NegociosSugeridos imagen={NegociosS} />
          <div>
            <h4 className="text-xl md:text-xl font-bold text-black tracking-tight leading-snug my-4">
              Busca los negocios que te conectan con tu comunidad
            </h4>
            <BusquedaGlobalWrapper
              placeholder="Buscar negocios..."
              filtroTipo="negocio"
              onSelectResultado={(item) =>
                Navigate(`/negocios/${item._id || item.id}`)
              }
            />
          </div>
          <CategoryCarousel />
        </div>

        <GridWrapper ref={gridRef} tipo="grid" className="min-h-[70vh]">
          {negociosFiltrados.map((negocio) => (
            <Link
              key={negocio._id}
              to={`/negocios/${negocio._id}`}
              className="flex-shrink-0"
            >
              <CardLista
                title={negocio.name}
                image={negocio.featuredImage}
                isVerified={negocio.isVerified}
                isNew={false}
                hasDiscount={false}
                descuento=""
                logo={negocio.profileImage || negocio.category?.icon}
                category={negocio.category?.name}
                location={`${negocio.location.city}, ${negocio.country || ""}`}
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
          totalPages={totalPages || 1}
          currentPage={currentPage || 1}
          onPageChange={handlePageChange}
          gridRef={gridRef}
        />

        <BannerNegocios scrollToRef={gridRef} />
      </div>
    </div>
  );
}
