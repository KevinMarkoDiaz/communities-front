import { Link } from "react-router-dom";
import Card from "../Card";
import ScrollCarousel from "../ScrollCarousel";
import { useEventos } from "../../hooks/useEventos";
import hb from "../../assets/hb.png";
import BannerTituloSugeridos from "../BannerTituloSugeridos";

export default function EventosProximos() {
  const { lista: eventos } = useEventos();

  const eventosProximos = eventos
    .filter((e) => new Date(e.date) > new Date())
    .slice(0, 6); // más eventos para scroll

  if (eventosProximos.length === 0) return null;

  return (
    <section className="space-y-16">
      <BannerTituloSugeridos
        titulo="Viví tu cultura. Sumate a los eventos que hacen vibrar tu comunidad."
        imagen={hb}
        link="/eventos"
      />

      <ScrollCarousel>
        {eventosProximos.map((evento) => (
          <Link
            to={`/eventos/${evento.id || evento._id}`}
            key={evento.id || evento._id}
            className="flex-shrink-0 snap-start min-w-[340px] sm:min-w-[360px] md:min-w-[400px]"
          >
            <Card
              title={evento.title}
              description={`📅 ${new Date(evento.date).toLocaleDateString(
                "es-ES",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}`}
              image={evento.image}
              modo="vertical"
            />
          </Link>
        ))}
      </ScrollCarousel>
    </section>
  );
}
