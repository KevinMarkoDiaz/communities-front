import { Link } from "react-router-dom";
import ScrollCarousel from "../ScrollCarousel";
import CardDestacado from "../Card";
import SugeridosSkeleton from "../Skeleton/SugeridosSkeleton";

const PLACEHOLDER_IMG = "https://cdn.usegalileo.ai/sdxl10/placeholder.png";

export default function ComunidadesDestacadas({ comunidades = [], loading }) {
  if (loading) return <SugeridosSkeleton />;

  const lista = Array.isArray(comunidades) ? comunidades : [];
  const destacadas = lista.slice(0, 6);

  if (destacadas.length === 0) return null;

  return (
    <section className="space-y-4">
      <ScrollCarousel>
        {destacadas.map((raw, i) => {
          const comunidad = raw ?? {};
          const id = comunidad._id ?? comunidad.id ?? null;
          const slugOrId = comunidad.slug || id; // ✅ preferir slug
          const to = slugOrId ? `/comunidades/${slugOrId}` : null;

          const title = comunidad.name ?? "Comunidad";
          const image =
            comunidad.bannerImage || comunidad.flagImage || PLACEHOLDER_IMG;
          const logo = comunidad.flagImage || PLACEHOLDER_IMG;

          const card = (
            <CardDestacado
              title={title}
              image={image}
              modo="vertical"
              logo={logo}
            />
          );

          return (
            <div
              key={slugOrId ?? `comunidad-${i}`} // ✅ key estable con slug/id
              className="flex-shrink-0 snap-start min-w-[220px] sm:min-w-[220px] md:min-w-[220px] lg:min-w-[300px]"
            >
              {to ? (
                <Link to={to} className="block">
                  {card}
                </Link>
              ) : (
                <div className="block opacity-90">{card}</div>
              )}
            </div>
          );
        })}
      </ScrollCarousel>
    </section>
  );
}
