import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPromos } from "../../store/promocionesSlice";

import CardPromoHome from "../../components/promo/CardPromoHome";
import ScrollCarousel from "../../components/ScrollCarousel";
import BannerPromociones from "../../components/promo/BannerPromociones";
import PromocionesDestacadas from "../../components/home/PromocionesDestacadas";

import { Helmet } from "react-helmet-async";
import PromocionesD from "../../assets/PromocionesD.png";
import bndc from "../../assets/bndc.png";
import bnnl from "../../assets/bnnl.png";
import bnpf from "../../assets/bnpf.png";
import ModalGuardarPromo from "../../components/modal/ModalGuardarPromo";

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

  const renderCarrusel = (titulo, imagen, items, emoji, carouselProps = {}) => {
    if (items.length === 0) {
      return (
        <div className="text-center text-gray-400 text-sm italic">
          No hay promociones disponibles por ahora.
        </div>
      );
    }

    return (
      <section className="bg-gray-50 rounded-2xl shadow-inner p-6 space-y-6">
        <BannerPromociones
          titulo={
            <span className="text-2xl sm:text-3xl font-extrabold text-sky-800 tracking-tight flex items-center gap-2">
              <span>{emoji}</span> {titulo}
            </span>
          }
          imagen={imagen}
        />

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
                  className="cursor-pointer flex-shrink-0 snap-start w-[220px] sm:w-[320px] md:w-[300px] lg:w-[260px] transform hover:scale-[1.03] transition duration-300"
                >
                  <CardPromoHome
                    maxClaims={promo.maxClaims}
                    title={promo.name}
                    image={promo.featuredImage}
                    isNew={promo.type === "promo_fin_de_semana"}
                    hasDiscount={promo.type === "descuentos_imperdibles"}
                    descuento={
                      remaining !== null ? `${remaining} disponibles` : "20"
                    }
                    isVerified={true}
                  />
                </div>
              );
            })}
        </ScrollCarousel>
      </section>
    );
  };

  return (
    <div className="flex flex-col gap-12 md:gap-16 xl:gap-24 mt-12">
      <Helmet>
        <title>Communities | Promociones</title>
        <meta
          name="description"
          content="Descubrí promociones destacadas para tu comunidad."
        />
      </Helmet>

      <div className="w-full max-w-full overflow-hidden flex flex-col gap-12 md:gap-16 xl:gap-24">
        {loading && (
          <p className="text-center text-gray-500">Cargando promociones...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {/* Hero de promociones */}
            <PromocionesDestacadas Link={false} imagen={PromocionesD} />

            {/* Carruseles por tipo */}
            {renderCarrusel(
              "Descuentos imperdibles",
              bndc,
              promosDescuento,
              "🎉",
              { autoplay: true, direction: "right" }
            )}
            {renderCarrusel(
              "Nuevos lanzamientos",
              bnnl,
              promosLanzamiento,
              "🆕",
              { autoplay: true, direction: "right" }
            )}
            {renderCarrusel(
              "Promo fin de semana",
              bnpf,
              promosFinSemana,
              "🌞",
              { autoplay: true, direction: "right" }
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
