import { Link } from "react-router-dom";
import Card from "../Card";
import GridWrapper from "../GridWrapper";
import { useComunidades } from "../../hooks/useComunidades";

export default function ComunidadesDestacadas() {
  const { lista: comunidades } = useComunidades();

  const destacadas = comunidades.slice(0, 4);

  if (destacadas.length === 0) return null;

  return (
    <section className="space-y-16">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-2xl font-extrabold text-[#4B5563] tracking-tight leading-snug">
          <Link to="/comunidades">Encontrá tu comunidad y sentite en casa</Link>
        </h2>
      </div>

      <GridWrapper>
        {destacadas.map((comunidad) => (
          <Link
            to={`/comunidades/${comunidad.id || comunidad._id}`}
            key={comunidad.id || comunidad._id}
            className="flex-shrink-0"
          >
            <Card
              title={comunidad.name}
              description={comunidad.description}
              image={comunidad.flagImage}
            />
          </Link>
        ))}
      </GridWrapper>
    </section>
  );
}
