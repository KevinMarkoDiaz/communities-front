import { Link } from "react-router-dom";
import ScrollCarousel from "../ScrollCarousel";
import BannerTituloSugeridos from "../BannerTituloSugeridos";
import CardDestacado from "../Card";
import SugeridosSkeleton from "../Skeleton/SugeridosSkeleton";

export default function ComunidadesDestacadas({
  comunidades = [],
  loading,
  imagen,
}) {
  if (loading) return <SugeridosSkeleton />;

  const destacadas = comunidades.slice(0, 6);

  if (destacadas.length === 0) return null;

  return (
    <section className="space-y-4">
      <BannerTituloSugeridos
        titulo="Encontrá tu comunidad y sentite en casa"
        imagen={imagen}
        link="/comunidades"
      />

      <ScrollCarousel>
        {destacadas.map((comunidad) => (
          <Link
            to={`/comunidades/${comunidad._id || comunidad.id}`}
            key={comunidad._id || comunidad.id}
            className="flex-shrink-0 snap-start min-w-[280px] sm:min-w-[250px] md:min-w-[250px] lg:min-w-[320px]"
          >
            <CardDestacado
              title={comunidad.name}
              image={comunidad.bannerImage || comunidad.flagImage}
              modo="vertical"
              logo={comunidad.flagImage}
            />
          </Link>
        ))}
      </ScrollCarousel>
    </section>
  );
}
