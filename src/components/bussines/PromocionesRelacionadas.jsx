import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import SkeletonPromoCard from "../Skeleton/SkeletonPromoCard";
import CardPromoHome from "../promo/CardPromoHome";
import ModalGuardarPromo from "../modal/ModalGuardarPromo";
import ScrollCarousel from "../ScrollCarousel"; // ✅ Carrusel

export default function PromocionesRelacionadas({ businessId }) {
  const [promociones, setPromociones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoSeleccionada, setPromoSeleccionada] = useState(null);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const res = await axiosInstance.get(
          `/businesses/${businessId}/promotions`
        );
        setPromociones(res.data.promotions || []);
      } catch (err) {
        console.error("Error al cargar promociones:", err);
      } finally {
        setLoading(false);
      }
    };

    if (businessId) fetchPromos();
  }, [businessId]);

  if (loading) {
    return (
      <section className="py-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Promociones destacadas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonPromoCard />
          <SkeletonPromoCard />
        </div>
      </section>
    );
  }

  if (promociones.length === 0) return null;

  return (
    <section className="py-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Promociones destacadas de este negocio
      </h3>

      <ScrollCarousel className="relative overflow-visible">
        {promociones.map((promo) => (
          <div
            key={promo._id}
            onClick={() => setPromoSeleccionada(promo)}
            className="cursor-pointer flex-shrink-0 snap-start w-[220px] sm:w-[320px] md:w-[300px] lg:w-[260px] transform transition duration-300"
          >
            <CardPromoHome
              isPremium={promo.isPremium}
              title={promo.name}
              image={promo.featuredImage}
              maxClaims={promo.maxClaims}
              descuento={
                promo.maxClaims === 0
                  ? "0 disponibles"
                  : typeof promo.maxClaims === "number"
                  ? `Quedan ${promo.maxClaims} cupones`
                  : "Activa ahora"
              }
            />
          </div>
        ))}
      </ScrollCarousel>

      {promoSeleccionada && (
        <ModalGuardarPromo
          promo={promoSeleccionada}
          onClose={() => setPromoSeleccionada(null)}
        />
      )}
    </section>
  );
}
