import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import GridWrapper from "../components/GridWrapper";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { useComunidades } from "../hooks/useComunidades";

export default function Comunidades() {
  const { comunidadesFiltradas, loading, error } = useComunidades();

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
    </>
  );
}
