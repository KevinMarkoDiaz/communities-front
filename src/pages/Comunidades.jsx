import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import GridWrapper from "../components/GridWrapper";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { useComunidades } from "../hooks/useComunidades";
import SearchBar from "../components/SearchBar";
import BannerComunidades from "../components/communities/BannerComunidades";

import { useRef, useEffect, useState } from "react";
import ComunidadesDestacadas from "../components/home/ComunidadesDestacadas";
import Pagination from "../components/Pagination";

export default function Comunidades() {
  const { comunidadesFiltradas, busqueda, setBusqueda, error, loading } =
    useComunidades(); // 🗒️ Reemplazar más adelante con fetch paginado

  const gridRef = useRef(null);

  // ✅ Estados de paginación local
  const [paginaActual, setPaginaActual] = useState(1);
  const comunidadesPorPagina = 12;

  // 🟩 Cuando uses API, reemplazá por estos estados y un fetch
  /*
  const [comunidades, setComunidades] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState(1);
  useEffect(() => {
    const fetchComunidades = async () => {
      const res = await fetch(`/api/comunidades?page=${paginaActual}&limit=${comunidadesPorPagina}&busqueda=${busqueda}`);
      const data = await res.json();
      setComunidades(data.data);
      setTotalPaginas(data.pages);
    };
    fetchComunidades();
  }, [paginaActual, busqueda]);
  */

  // ✅ Paginar desde el frontend (mock o lista completa)
  const totalPaginas = Math.ceil(
    comunidadesFiltradas.length / comunidadesPorPagina
  );
  const indexInicio = (paginaActual - 1) * comunidadesPorPagina;
  const indexFin = indexInicio + comunidadesPorPagina;
  const comunidadesPaginadas = comunidadesFiltradas.slice(
    indexInicio,
    indexFin
  );

  // ✅ Volver a página 1 cuando se cambia la búsqueda
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

      <div className="w-full max-w-[95%] lg:max-w-[80%] xl:max-w-[70%] mx-auto flex flex-col gap-20">
        <BannerComunidades scrollToRef={gridRef} />

        <SearchBar
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar comunidades..."
        />

        <ComunidadesDestacadas />

        {/* ✅ Grid de resultados paginados */}
        <div ref={gridRef}>
          <GridWrapper>
            {comunidadesPaginadas.map((comunidad) => (
              <Link
                key={comunidad.id || comunidad._id}
                to={`/comunidades/${comunidad.id || comunidad._id}`}
                className="flex-shrink-0"
              >
                <Card
                  title={comunidad.name}
                  description={comunidad.description}
                  image={comunidad.flagImage}
                />
              </Link>
            ))}

            {comunidadesFiltradas.length === 0 && (
              <p className="text-gray-500 w-full text-center">
                No se encontraron comunidades.
              </p>
            )}
          </GridWrapper>
        </div>

        {/* ✅ Paginador */}
        <Pagination
          totalPages={totalPaginas}
          currentPage={paginaActual}
          onPageChange={setPaginaActual}
        />
      </div>
    </>
  );
}
