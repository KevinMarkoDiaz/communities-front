import { Link } from "react-router-dom";
import CardDestacado from "../Card";
import ScrollCarousel from "../ScrollCarousel";
import SugeridosSkeleton from "../Skeleton/SugeridosSkeleton";

export default function NegociosSugeridos({ negocios = [], loading, imagen }) {
  if (loading) return <SugeridosSkeleton />;

  const destacados = negocios.slice(0, 6); // Limita para un mejor scroll

  if (destacados.length === 0) return null;

  return (
    <section className="space-y-4">
      <ScrollCarousel>
        {destacados.map((n) => (
          <Link
            to={`/negocios/${n._id}`}
            key={n._id}
            className="flex-shrink-0 snap-start min-w-[280px] sm:min-w-[250px] md:min-w-[250px] lg:min-w-[320px]"
          >
            <CardDestacado
              isPremium={n.isPremium}
              title={n.name}
              image={n.featuredImage}
              isNew={false} // Lógica futura para marcar nuevos
              hasDiscount={false} // Lógica futura para descuentos
              isVerified={n.isVerified}
              modo="vertical"
              logo={n.profileImage}
            />
          </Link>
        ))}
      </ScrollCarousel>
    </section>
  );
}
