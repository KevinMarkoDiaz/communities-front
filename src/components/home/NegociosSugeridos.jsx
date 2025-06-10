import { Link } from "react-router-dom";
import CardDestacado from "../Card";
import ScrollCarousel from "../ScrollCarousel";
import { useNegocios } from "../../hooks/useNegocios";
import hb from "../../assets/hb.png";
import BannerTituloSugeridos from "../BannerTituloSugeridos";

export default function NegociosSugeridos() {
  const { lista: negocios } = useNegocios();

  const destacados = negocios.slice(0, 6); // Limita para un mejor scroll

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
          <Link
            to={`/negocios/${n._id}`}
            key={n._id}
            className="flex-shrink-0 snap-start min-w-[250px] sm:min-w-[300px] md:min-w-[250px] lg:min-w-[320px]"
          >
            <CardDestacado
              title={n.name}
              image={n.featuredImage}
              isNew={false} // o lógica: Date.now() - new Date(n.createdAt) < 7 días
              hasDiscount={false} // futura lógica
              isVerified={n.isVerified}
              modo="vertical"
            />
          </Link>
        ))}
      </ScrollCarousel>
    </section>
  );
}
