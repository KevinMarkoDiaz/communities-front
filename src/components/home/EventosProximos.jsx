import { Link } from "react-router-dom";
import ScrollCarousel from "../ScrollCarousel";
import CardDestacado from "../Card";
import SugeridosSkeleton from "../Skeleton/SugeridosSkeleton";

const PLACEHOLDER_IMG = "https://cdn.usegalileo.ai/sdxl10/placeholder.png";

export default function EventosProximos({ eventos = [], loading, imagen }) {
  if (loading) return <SugeridosSkeleton />;

  const lista = Array.isArray(eventos) ? eventos : [];

  const eventosProximos = lista
    .filter((e) => {
      const fechaEvento = new Date(e?.date);
      return !isNaN(fechaEvento) && fechaEvento > new Date();
    })
    .slice(0, 6);

  if (eventosProximos.length === 0) return null;

  return (
    <section className="space-y-4">
      <ScrollCarousel>
        {eventosProximos.map((raw, i) => {
          const evento = raw ?? {};
          const id = evento._id ?? evento.id ?? null;
          const to = id ? `/eventos/${id}` : null;

          const card = (
            <CardDestacado
              title={evento.title ?? "Evento sin título"}
              image={evento.featuredImage || imagen || PLACEHOLDER_IMG}
              modo="vertical"
            />
          );

          return (
            <div
              key={id ?? `evento-${i}`}
              className="flex-shrink-0 snap-start min-w-[280px] sm:min-w-[250px] md:min-w-[250px] lg:min-w-[320px]"
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
