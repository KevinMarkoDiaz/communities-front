import { Link } from "react-router-dom";
import CardDestacado from "../Card";
import ScrollCarousel from "../ScrollCarousel";
import { useNegocios } from "../../hooks/useNegocios";
import BannerTituloSugeridos from "../BannerTituloSugeridos";
import SugeridosSkeleton from "../Skeleton/SugeridosSkeleton";

export default function NegociosSugeridos({ imagen }) {
  const { lista: negocios, loading } = useNegocios();

  if (loading) return <SugeridosSkeleton />;

  const destacados = negocios.slice(0, 6); // Limita para un mejor scroll

  if (destacados.length === 0) return null;

  return (
    <section className="space-y-4">
      <BannerTituloSugeridos
        titulo="Destacados de tu comunidad"
        imagen={imagen}
        link="/negocios"
      />

      <ScrollCarousel>
        {destacados.map((n) => (
          <Link
            to={`/negocios/${n._id}`}
            key={n._id}
            className="flex-shrink-0 snap-start min-w-[280px] sm:min-w-[250px] md:min-w-[250px] lg:min-w-[320px]"
          >
            <CardDestacado
              title={n.name}
              image={n.featuredImage}
              isNew={false} // o lógica si quieres detectar "nuevo"
              hasDiscount={false} // futura lógica de descuentos
              isVerified={n.isVerified}
              modo="vertical"
            />
          </Link>
        ))}
      </ScrollCarousel>
    </section>
  );
}
