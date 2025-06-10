import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useComunidades } from "../hooks/useComunidades";

import GridWrapper from "../components/GridWrapper";
import CardLista from "../components/CardLista"; // Cambiamos a CardLista para mantener consistencia visual
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import BannerComunidades from "../components/communities/BannerComunidades";
import ComunidadesDestacadas from "../components/home/ComunidadesDestacadas";
import Pagination from "../components/Pagination";

export default function Comunidades() {
  const { comunidadesFiltradas, busqueda, setBusqueda, error, loading } =
    useComunidades();

  const gridRef = useRef(null);

  const [paginaActual, setPaginaActual] = useState(1);
  const comunidadesPorPagina = 12;

  const totalPaginas = Math.ceil(
    comunidadesFiltradas.length / comunidadesPorPagina
  );
  const indexInicio = (paginaActual - 1) * comunidadesPorPagina;
  const indexFin = indexInicio + comunidadesPorPagina;
  const comunidadesPaginadas = comunidadesFiltradas.slice(
    indexInicio,
    indexFin
  );

  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

  if (loading) return <Loading mensaje="Cargando comunidades..." />;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <>
      <Helmet>
        <title>Communities | Comunidades</title>
        <meta
          name="description"
          content="Explora comunidades migrantes con negocios, eventos y servicios propios."
        />
      </Helmet>

      <div className="w-full max-w-full overflow-hidden flex flex-col gap-18">
        <div className="flex flex-col gap-18">
          {/* Aquí podrías agregar un CategoryCarousel si vas a tener categorías de comunidades */}
          <SearchBar
            value={busqueda}
            onChange={setBusqueda}
            placeholder="Buscar comunidades..."
          />
        </div>

        <ComunidadesDestacadas />

        <GridWrapper ref={gridRef} tipo="lista" className="min-h-[70vh]">
          {comunidadesPaginadas.map((comunidad) => (
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

          {comunidadesFiltradas.length === 0 && (
            <p className="text-gray-500 w-full text-center">
              No se encontraron comunidades.
            </p>
          )}
        </GridWrapper>

        <Pagination
          totalPages={totalPaginas}
          currentPage={paginaActual}
          onPageChange={setPaginaActual}
        />

        <BannerComunidades scrollToRef={gridRef} />
      </div>
    </>
  );
}
