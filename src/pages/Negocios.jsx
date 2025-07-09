import { Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useRef, useState, useEffect } from "react";

import CardLista from "../components/CardLista";
import Loading from "../components/Loading";
import GridWrapper from "../components/GridWrapper";
import CategoryCarousel from "../components/CategoryCarousel";
import BannerNegocios from "../components/bussines/BannerNegocios";
import NegociosSugeridos from "../components/home/NegociosSugeridos";
import Pagination from "../components/Pagination";
import NegociosS from "../assets/NegociosS.png";

import { useNegocios } from "../hooks/useNegocios";
import BusquedaGlobalWrapper from "../components/search/BusquedaGlobalWrapper";
import ResetBusquedaOnMount from "../utils/ResetBusquedaOnMount";

export default function Negocios() {
  const { negociosFiltrados, loading, error, busqueda } = useNegocios();

  const gridRef = useRef(null);

  // Paginación local
  const [paginaActual, setPaginaActual] = useState(1);
  const negociosPorPagina = 12;
  const totalPaginas = Math.ceil(negociosFiltrados.length / negociosPorPagina);
  const indexInicio = (paginaActual - 1) * negociosPorPagina;
  const indexFin = indexInicio + negociosPorPagina;
  const negociosPaginados = negociosFiltrados.slice(indexInicio, indexFin);

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

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
          <CategoryCarousel />
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
        </div>

        <GridWrapper ref={gridRef} tipo="grid" className="min-h-[70vh]">
          {negociosPaginados.map((negocio) => (
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
          totalPages={totalPaginas}
          currentPage={paginaActual}
          onPageChange={setPaginaActual}
          gridRef={gridRef}
        />

        <BannerNegocios scrollToRef={gridRef} />
      </div>
    </div>
  );
}
