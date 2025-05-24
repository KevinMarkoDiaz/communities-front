import { Link } from "react-router-dom";
import Card from "../Card";
import GridWrapper from "../GridWrapper";
import { useComunidades } from "../../hooks/useComunidades";
import hb from "../../assets/hb.png"; // asegúrate que exista esa imagen
import BannerTituloSugeridos from "../BannerTituloSugeridos";

export default function ComunidadesDestacadas() {
  const { lista: comunidades } = useComunidades();

  const destacadas = comunidades.slice(0, 4);

  if (destacadas.length === 0) return null;

  return (
    <section className="space-y-16">
      <BannerTituloSugeridos
        titulo="Encontrá tu comunidad y sentite en casa"
        imagen={hb}
        link="/comunidades"
      />

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
