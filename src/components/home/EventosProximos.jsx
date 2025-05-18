import { Link } from "react-router-dom";
import Card from "../Card";
import GridWrapper from "../GridWrapper";
import { useEventos } from "../../hooks/useEventos";

export default function EventosProximos() {
  const { lista: eventos } = useEventos();

  const eventosProximos = eventos
    .filter((e) => new Date(e.date) > new Date())
    .slice(0, 15);

  if (eventosProximos.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xl font-bold text-[#141C24]">
          <Link to="/eventos" className="hover:underline text-blue-700">
            No te pierdas estos eventos
          </Link>
        </h2>
      </div>

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
