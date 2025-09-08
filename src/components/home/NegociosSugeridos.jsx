import { Link } from "react-router-dom";
import CardDestacado from "../Card";
import ScrollCarousel from "../ScrollCarousel";
import SugeridosSkeleton from "../Skeleton/SugeridosSkeleton";

const PLACEHOLDER_IMG = "https://cdn.usegalileo.ai/sdxl10/placeholder.png";

export default function NegociosSugeridos({ negocios = [], loading, imagen }) {
  if (loading) return <SugeridosSkeleton />;

  const lista = Array.isArray(negocios) ? negocios : [];
  const destacados = lista.slice(0, 6);

  if (destacados.length === 0) return null;

  return (
    <section className="space-y-4">
      <ScrollCarousel>
        {destacados.map((raw, i) => {
          const n = raw ?? {};
          const id = n._id ?? n.id ?? null;
          const to = id ? `/negocios/${id}` : null;

          return (
            <div
              key={id ?? `neg-sug-${i}`}
              className="flex-shrink-0 snap-start min-w-[280px] sm:min-w-[250px] md:min-w-[250px] lg:min-w-[320px]"
            >
              {to ? (
                <Link to={to} className="block">
                  <CardDestacado
                    isPremium={n.isPremium === true}
                    title={n.name ?? "Sin nombre"}
                    image={n.featuredImage || imagen || PLACEHOLDER_IMG}
                    isNew={false}
                    hasDiscount={false}
                    isVerified={n.isVerified === true}
                    modo="vertical"
                    logo={n.profileImage || PLACEHOLDER_IMG}
                  />
                </Link>
              ) : (
                <div className="block opacity-90">
                  <CardDestacado
                    isPremium={n.isPremium === true}
                    title={n.name ?? "Sin nombre"}
                    image={n.featuredImage || imagen || PLACEHOLDER_IMG}
                    isNew={false}
                    hasDiscount={false}
                    isVerified={n.isVerified === true}
                    modo="vertical"
                    logo={n.profileImage || PLACEHOLDER_IMG}
                  />
                </div>
              )}
            </div>
          );
        })}
      </ScrollCarousel>
    </section>
  );
}
