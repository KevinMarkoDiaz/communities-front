import { Link } from "react-router-dom";
import ScrollCarousel from "../ScrollCarousel";
import { useEventos } from "../../hooks/useEventos";
import hb from "../../assets/hb.png";
import BannerTituloSugeridos from "../BannerTituloSugeridos";
import CardDestacado from "../Card";

export default function EventosProximos() {
  const { lista: eventos } = useEventos();

  const eventosProximos = eventos
    .filter((e) => {
      const fechaEvento = new Date(e.date);
      return !isNaN(fechaEvento) && fechaEvento > new Date();
    })
    .slice(0, 6);

  if (eventosProximos.length === 0) return null;

  return (
    <section className="space-y-4">
      <BannerTituloSugeridos
        titulo="Viví tu cultura. Sumate a los eventos que hacen vibrar tu comunidad."
        imagen={hb}
        link="/eventos"
      />

      <ScrollCarousel>
        {eventosProximos.map((evento) => {
          const { _id, title, featuredImage } = evento;

          return (
            <Link
              to={`/eventos/${_id}`}
              key={_id}
              className="flex-shrink-0 snap-start min-w-[280px] sm:min-w-[250px] md:min-w-[250px] lg:min-w-[320px]"
            >
              <CardDestacado
                title={title}
                image={
                  featuredImage || `https://cdn.usegalileo.ai/sdxl10/${_id}.png`
                }
                modo="vertical"
              />
            </Link>
          );
        })}
      </ScrollCarousel>
    </section>
  );
}
