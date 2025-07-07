// ✅ 3. pages/Promociones.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPromos } from "../../store/promocionesSlice";

import CardPromoHome from "../../components/promo/CardPromoHome";
import ScrollCarousel from "../../components/ScrollCarousel";
import BannerPromociones from "../../components/promo/BannerPromociones";
import PromocionesDestacadas from "../../components/home/PromocionesDestacadas";

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PromocionesD from "../../assets/PromocionesD.png";

import bndc from "../../assets/bndc.png";
import bnnl from "../../assets/bnnl.png";
import bnpf from "../../assets/bnpf.png";

export default function Promociones() {
  const dispatch = useDispatch();
  const {
    lista: promociones,
    loading,
    error,
  } = useSelector((state) => state.promociones);

  useEffect(() => {
    dispatch(fetchAllPromos());
  }, [dispatch]);

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
          {items.map((promo) => (
            <Link
              key={promo._id}
              to={`/negocios/${promo.business._id}`}
              className="flex-shrink-0 snap-start w-[220px] sm:w-[320px] md:w-[300px] lg:w-[260px] transform hover:scale-[1.03] transition duration-300"
            >
              <CardPromoHome
                title={promo.name}
                image={promo.featuredImage}
                isNew={promo.type === "promo_fin_de_semana"}
                hasDiscount={promo.type === "descuentos_imperdibles"}
                descuento={"20"}
                isVerified={true}
              />
            </Link>
          ))}
        </ScrollCarousel>
      </section>
    );
  };

  return (
    <>
      <Helmet>
        <title>Communities | Promociones</title>
        <meta
          name="description"
          content="Descubrí promociones destacadas para tu comunidad."
        />
      </Helmet>

      <div className="w-full max-w-full overflow-hidden flex flex-col gap-16 md:gap-28">
        {loading && (
          <p className="text-center text-gray-500">Cargando promociones...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {/* Hero de promociones */}
            <PromocionesDestacadas Link={false} imagen={PromocionesD} />

            {/* Primer carrusel: autoplay hacia la derecha */}
            {renderCarrusel(
              "Descuentos imperdibles",
              bndc,
              promosDescuento,
              "🎉",
              { autoplay: true, direction: "right" }
            )}

            {/* Carrusel del medio: sin autoplay */}
            {renderCarrusel(
              "Nuevos lanzamientos",
              bnnl,
              promosLanzamiento,
              "🆕",
              { autoplay: true, direction: "right" }
            )}

            {/* Último carrusel: autoplay hacia la izquierda */}
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
    </>
  );
}
