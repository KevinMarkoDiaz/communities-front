import { Link } from "react-router-dom";
import Card from "../Card";
import GridWrapper from "../GridWrapper";
import { useNegocios } from "../../hooks/useNegocios";

export default function NegociosSugeridos() {
  const { lista: negocios } = useNegocios();
  return (
    <section className="space-y-16">
      <h2 className="text-2xl font-extrabold text-[#FB8500] flex items-center gap-2">
        <Link to="/negocios">Destacados de tu comunidad</Link>
      </h2>

      <GridWrapper>
        {negocios.slice(0, 4).map((negocio) => (
          <Link
            to={`/negocios/${negocio.id || negocio._id}`}
            key={negocio.id || negocio._id}
            className="flex-shrink-0"
          >
            <Card
              title={negocio.nombre}
              description={negocio.descripcion}
              image={negocio.imagenDestacada}
            />
          </Link>
        ))}
      </GridWrapper>
    </section>
  );
}
