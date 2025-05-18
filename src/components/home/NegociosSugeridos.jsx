import { Link } from "react-router-dom";
import Card from "../Card";
import GridWrapper from "../GridWrapper";
import { useNegocios } from "../../hooks/useNegocios";

export default function NegociosSugeridos() {
  const { lista: negocios } = useNegocios();
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xl font-bold text-[#141C24]">
          <Link to="/negocios" className="hover:underline text-blue-700">
            Recomendados para vos
          </Link>
        </h2>
      </div>

      <GridWrapper>
        {negocios.map((negocio) => (
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
