import CardDestacado from "../Card";
import ScrollCarousel from "../ScrollCarousel";
import { useNegocios } from "../../hooks/useNegocios";
import hb from "../../assets/hb.png";
import BannerTituloSugeridos from "../BannerTituloSugeridos";

export default function NegociosSugeridos() {
  const { lista: negocios } = useNegocios();

  const destacados = negocios.slice(0, 6); // Opcional: limitar para scroll más limpio

  if (destacados.length === 0) return null;

  return (
    <section className="space-y-4">
      <BannerTituloSugeridos
        titulo="Destacados de tu comunidad"
        imagen={hb}
        link="/negocios"
      />

      <ScrollCarousel>
        {destacados.map((n) => (
          <div
            key={n.id || n._id}
            className="flex-shrink-0 snap-start min-w-[280px] sm:min-w-[320px] md:min-w-[320px]"
          >
            <CardDestacado
              title={n.nombre}
              image={n.imagenDestacada}
              description={n.descripcion}
              isNew={n.isNew}
              hasDiscount={n.hasDiscount}
              isVerified={n.verificado}
              modo="vertical"
            />
          </div>
        ))}
      </ScrollCarousel>
    </section>
  );
}
