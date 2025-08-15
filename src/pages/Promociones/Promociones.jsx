import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPromos } from "../../store/promocionesSlice";

import CardPromoHome from "../../components/promo/CardPromoHome";
import ScrollCarousel from "../../components/ScrollCarousel";
import ModalGuardarPromo from "../../components/modal/ModalGuardarPromo";
import FadeInOnScroll from "../../components/FadeInOnScroll";

import { Helmet } from "react-helmet-async";

export default function Promociones() {
  const dispatch = useDispatch();
  const {
    lista: promociones,
    loading,
    error,
  } = useSelector((state) => state.promociones);

  const [promoSeleccionada, setPromoSeleccionada] = useState(null);

  useEffect(() => {
    if (!promociones || promociones.length === 0) {
      dispatch(fetchAllPromos());
    }
  }, [dispatch, promociones]);

  const lista = Array.isArray(promociones) ? promociones : [];

  const promosDescuento = lista.filter(
    (p) => p.type === "descuentos_imperdibles"
  );
  const promosLanzamiento = lista.filter(
    (p) => p.type === "nuevos_lanzamientos"
  );
  const promosFinSemana = lista.filter((p) => p.type === "promo_fin_de_semana");

  const renderCarrusel = (
    linea1,
    linea2,
    items,
    emoji,
    carouselProps = {},
    showDivider = true
  ) => {
    if (items.length === 0) {
      return (
        <div className="text-center text-gray-400  text-xs italic">
          No hay promociones disponibles por ahora.
        </div>
      );
    }

    return (
      <section className="">
        <FadeInOnScroll direction="up" duration={600} delay={100}>
          <div className="text-left mb-4">
            <h2 className="text-md md: text-lg font-bold text-gray-800 relative inline-block">
              <span className="relative z-10">{`${linea1} ${linea2}`}</span>
              <span
                className="absolute bottom-0 h-2 bg-lime-300/60 z-0 rounded"
                style={{
                  transform: "skewX(-12deg)",
                  left: "-4px",
                  right: "-4px",
                  boxShadow: "0 4px 6px -2px rgba(0, 0, 0, 0.2)", // sombra solo hacia abajo
                }}
              />
            </h2>
          </div>
        </FadeInOnScroll>

        {/* Carrusel */}
        <ScrollCarousel
          className="relative overflow-visible"
          {...carouselProps}
        >
          {items
            .filter((promo) => promo && promo.business && promo.business._id)
            .map((promo) => {
              const maxClaims = promo.maxClaims || null;
              const claimed = promo.claimed?.length || 0;
              const remaining = maxClaims
                ? Math.max(0, maxClaims - claimed)
                : null;

              return (
                <div
                  key={promo._id}
                  onClick={() => setPromoSeleccionada(promo)}
                  className="cursor-pointer flex-shrink-0 snap-start w-[220px] sm:w-[320px] md:w-[300px] lg:w-[260px] transform transition duration-300"
                >
                  <CardPromoHome
                    maxClaims={promo.maxClaims}
                    title={promo.name}
                    image={promo.featuredImage}
                    isNew={promo.type === "promo_fin_de_semana"}
                    hasDiscount={promo.type === "descuentos_imperdibles"}
                    descuento={
                      promo.maxClaims === 0
                        ? "0 disponibles"
                        : typeof promo.maxClaims === "number"
                        ? `Quedan ${promo.maxClaims} cupones`
                        : "No te la pierdas"
                    }
                    isVerified={true}
                    businessId={promo.business?._id}
                    isPremium={promo.isPremium}
                  />
                </div>
              );
            })}
        </ScrollCarousel>

        {showDivider && (
          <div className="my-8 md:my-12">
            <hr className="border-t border-gray-200 mx-auto" />
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="flex flex-col gap-12 md:gap-10 md:mt-8">
      <Helmet>
        <title>Communities | Promociones</title>
        <meta
          name="description"
          content="Descubrí promociones destacadas para tu comunidad."
        />
      </Helmet>

      <div className="w-full max-w-full overflow-hidden flex flex-col gap-12 md:gap-16">
        {loading && (
          <p className="text-center text-gray-500">Cargando promociones...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {renderCarrusel(
              "Descuentos",
              "imperdibles",
              promosDescuento,
              "🎉",
              { autoplay: true, direction: "right" },
              true
            )}
            {renderCarrusel(
              "Nuevos",
              "lanzamientos",
              promosLanzamiento,
              "🆕",
              { autoplay: true, direction: "right" },
              true
            )}
            {renderCarrusel(
              "Promo",
              "fin de semana",
              promosFinSemana,
              "🌞",
              { autoplay: true, direction: "right" },
              false
            )}
          </>
        )}
      </div>

      {promoSeleccionada && (
        <ModalGuardarPromo
          promo={promoSeleccionada}
          onClose={() => setPromoSeleccionada(null)}
        />
      )}
    </div>
  );
}
