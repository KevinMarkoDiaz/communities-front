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

import bndc from "../../assets/bndc.png";
import bnnl from "../../assets/bnnl.png";
import bnpf from "../../assets/bnpf.png";
import bannerBTN from "../../assets/bannerBTN.mp4";

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

  const renderCarrusel = (titulo, imagen, items) => {
    if (items.length === 0) {
      return (
        <div className="text-center text-gray-400 text-sm italic">
          No hay promociones disponibles por ahora.
        </div>
      );
    }

    return (
      <section className="space-y-4">
        <BannerPromociones titulo={titulo} imagen={imagen} />
        <ScrollCarousel>
          {items.map((promo) => (
            <Link
              key={promo._id}
              to={`/promociones/${promo._id}`}
              className="flex-shrink-0 snap-start w-[220px] sm:w-[320px] md:w-[400px]"
            >
              <CardPromoHome
                title={promo.name}
                image={promo.featuredImage}
                isNew={promo.type == "promo_fin_de_semana" ? true : false}
                hasDiscount={
                  promo.type == "descuentos_imperdibles" ? true : false
                }
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

      <div className="w-full max-w-full overflow-hidden flex flex-col gap-12 md:gap-36">
        {loading && (
          <p className="text-center text-gray-500">Cargando promociones...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <PromocionesDestacadas />

            {renderCarrusel("Descuentos imperdibles", bndc, promosDescuento)}
            {renderCarrusel("Nuevos lanzamientos", bnnl, promosLanzamiento)}
            {renderCarrusel("Promo fin de semana", bnpf, promosFinSemana)}

            <div className="w-full hidden sm:flex justify-center px-4 py-10">
              <video
                src={bannerBTN}
                autoPlay
                muted
                playsInline
                className="rounded-xl max-w-6xl w-full shadow-lg"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
