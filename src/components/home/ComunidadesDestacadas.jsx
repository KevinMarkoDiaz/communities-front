import { Link } from "react-router-dom";
import ScrollCarousel from "../ScrollCarousel";
import { useComunidades } from "../../hooks/useComunidades";
import hb from "../../assets/hb.png";
import BannerTituloSugeridos from "../BannerTituloSugeridos";
import CardDestacado from "../Card";

export default function ComunidadesDestacadas() {
  const { lista: comunidades } = useComunidades();

  const destacadas = comunidades.slice(0, 6);

  if (destacadas.length === 0) return null;

  return (
    <section className="space-y-4">
      <BannerTituloSugeridos
        titulo="Encontrá tu comunidad y sentite en casa"
        imagen={hb}
        link="/comunidades"
      />

      <ScrollCarousel>
        {destacadas.map((comunidad) => (
          <Link
            to={`/comunidades/${comunidad.id || comunidad._id}`}
            key={comunidad.id || comunidad._id}
            className="flex-shrink-0 snap-start min-w-[280px] sm:min-w-[320px] md:min-w-[320px]"
          >
            <CardDestacado
              title={comunidad.name}
              description={comunidad.description}
              image={comunidad.flagImage}
              modo="vertical"
            />
          </Link>
        ))}
      </ScrollCarousel>
    </section>
  );
}
