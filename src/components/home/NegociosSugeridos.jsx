import Card from "../Card";
import ScrollCarousel from "../ScrollCarousel"; // nuevo carrusel horizontal
import { useNegocios } from "../../hooks/useNegocios";
import hb from "../../assets/hb.png";
import BannerTituloSugeridos from "../BannerTituloSugeridos";

export default function NegociosSugeridos() {
  const { lista: negocios } = useNegocios();

  return (
    <section className="space-y-16">
      <BannerTituloSugeridos
        titulo="Destacados de tu comunidad"
        imagen={hb}
        link="/negocios"
      />

      <ScrollCarousel>
        {negocios.map((n) => (
          <div
            key={n.id}
            className="flex-shrink-0 snap-start min-w-[340px] sm:min-w-[360px] md:min-w-[400px]"
          >
            <Card
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
