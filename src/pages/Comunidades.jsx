import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import GridWrapper from "../components/GridWrapper";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { useComunidades } from "../hooks/useComunidades";
import SearchBar from "../components/SearchBar";
import BannerComunidades from "../components/communities/BannerComunidades";

import { useRef } from "react";

export default function Comunidades() {
  const { comunidadesFiltradas, busqueda, setBusqueda, error, loading } =
    useComunidades();
  const gridRef = useRef(null); // Ref para scroll

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

        <div ref={gridRef}>
          <GridWrapper>
            {comunidadesFiltradas.map((comunidad) => (
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
      </div>
    </>
  );
}
