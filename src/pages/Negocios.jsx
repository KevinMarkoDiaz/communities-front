import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Card from "../components/Card";
import Loading from "../components/Loading";
import GridWrapper from "../components/GridWrapper";
import CategoryCarousel from "../components/CategoryCarousel";
import { useNegocios } from "../hooks/useNegocios";

export default function Negocios() {
  const { negociosFiltrados, loading, error } = useNegocios();

  if (loading) return <Loading mensaje="Cargando negocios..." />;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <>
      <Helmet>
        <title>Communities | Negocios</title>
        <meta
          name="description"
          content="Explora negocios y servicios dentro de tu comunidad migrante."
        />
      </Helmet>
      <CategoryCarousel />
      <GridWrapper>
        {negociosFiltrados.map((negocio) => (
          <Link
            key={negocio.id || negocio._id}
            to={`/negocios/${negocio.id || negocio._id}`}
            className="flex-shrink-0"
          >
            <Card
              title={negocio.nombre}
              description={negocio.descripcion}
              image={negocio.imagenDestacada}
            />
          </Link>
        ))}
        {negociosFiltrados.length === 0 && (
          <p className="text-gray-500 w-full text-center">
            No se encontraron resultados.
          </p>
        )}
      </GridWrapper>
    </>
  );
}
