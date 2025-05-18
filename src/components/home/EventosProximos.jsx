import { Link } from "react-router-dom";
import Card from "../Card";
import GridWrapper from "../GridWrapper";
import { useEventos } from "../../hooks/useEventos";

export default function EventosProximos() {
  const { lista: eventos } = useEventos();

  const eventosProximos = eventos
    .filter((e) => new Date(e.date) > new Date())
    .slice(0, 4);

  if (eventosProximos.length === 0) return null;

  return (
    <section className="space-y-16">
      <h2 className="text-2xl font-extrabold text-[#FB8500] tracking-tight leading-snug">
        <Link to="/eventos">
          <span className="block">Viví tu cultura.</span>
          <span className="block">
            Sumate a los eventos que hacen vibrar tu comunidad.
          </span>
        </Link>
      </h2>

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
              image={evento.imagenDestacada}
            />
          </Link>
        ))}
      </GridWrapper>
    </section>
  );
}
