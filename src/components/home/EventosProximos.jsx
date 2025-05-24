import { Link } from "react-router-dom";
import Card from "../Card";
import GridWrapper from "../GridWrapper";
import { useEventos } from "../../hooks/useEventos";
import hb from "../../assets/hb.png"; // asegúrate que exista esa imagen
import BannerTituloSugeridos from "../BannerTituloSugeridos";

export default function EventosProximos() {
  const { lista: eventos } = useEventos();

  const eventosProximos = eventos
    .filter((e) => new Date(e.date) > new Date())
    .slice(0, 4);

  if (eventosProximos.length === 0) return null;

  return (
    <section className="space-y-16">
      <BannerTituloSugeridos
        titulo="Viví tu cultura. Sumate a los eventos que hacen vibrar tu comunidad."
        imagen={hb}
        link="/eventos"
      />

      <GridWrapper>
        {eventosProximos.map((evento) => (
          <Link
            to={`/eventos/${evento.id || evento._id}`}
            key={evento.id || evento._id}
            className="flex-shrink-0"
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
            />
          </Link>
        ))}
      </GridWrapper>
    </section>
  );
}
