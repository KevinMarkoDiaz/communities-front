import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPromos } from "../../store/promocionesSlice";

import CardPromoHome from "../../components/promo/CardPromoHome";
import ScrollCarousel from "../../components/ScrollCarousel";
import PromocionesDestacadas from "../../components/home/PromocionesDestacadas";
import ModalGuardarPromo from "../../components/modal/ModalGuardarPromo";
import FadeInOnScroll from "../../components/FadeInOnScroll";

import { Helmet } from "react-helmet-async";
import PromocionesD from "../../assets/PromocionesD.png";

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
        <div className="text-center text-gray-400 text-sm italic">
          No hay promociones disponibles por ahora.
        </div>
      );
    }

    return (
      <section className="">
        {/* Título decorado */}
        <FadeInOnScroll direction="up" duration={600} delay={100}>
          <div className="text-left mb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 font-normal">
              {/* Línea 1 */}
              <div className="relative inline-block mb-1">
                <span
                  style={{ fontFamily: '"Dancing Script", cursive' }}
                  className="relative z-10"
                >
                  {linea1}
                </span>
                <span
                  className="absolute left-0 right-0 bottom-0 h-2 bg-lime-300/60 z-0 rounded"
                  style={{ transform: "skewX(-12deg)" }}
                />
              </div>

              {/* Línea 2 */}
              <div className="relative inline-block ml-4">
                <span
                  style={{ fontFamily: '"Dancing Script", cursive' }}
                  className="relative z-10"
                >
                  {linea2}
                </span>
                <span
                  className="absolute left-0 right-0 bottom-0 h-2 bg-lime-300/60 z-0 rounded"
                  style={{ transform: "skewX(-12deg)" }}
                />
              </div>
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
                      remaining !== null
                        ? `${remaining} disponibles`
                        : "disponible"
                    }
                    isVerified={true}
                  />
                </div>
              );
            })}
        </ScrollCarousel>

        {/* Divider elegante */}
        {showDivider && (
          <div className="my-8 md:my-12">
            <hr className="border-t border-gray-200 mx-auto " />
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

      <div className="w-full max-w-full overflow-hidden flex flex-col gap-12 md:gap-16 ">
        {loading && (
          <p className="text-center text-gray-500">Cargando promociones...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {/* Hero de la sección */}
            <PromocionesDestacadas Link={false} imagen={PromocionesD} />

            {/* Carruseles con divisores entre ellos */}
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
              false // último sin divisor
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
