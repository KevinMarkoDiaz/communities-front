import { Helmet } from "react-helmet-async";

import bndc from "../../assets/bndc.png";
import bnnl from "../../assets/bnnl.png";
import bnpf from "../../assets/bnpf.png";
import bannerBTN from "../../assets/bannerBTN.mp4"; // ✅ Importar video

import { usePromociones } from "../../data/usePromociones";
import BannerPromociones from "../../components/promo/BannerPromociones";
import ScrollCarousel from "../../components/ScrollCarousel";
import CardPromoHome from "../../components/promo/CardPromoHome";
import PromocionesDestacadas from "../../components/home/PromocionesDestacadas";
import { Link } from "react-router-dom";

export default function Promociones() {
  const { lista: promociones } = usePromociones();

  const promosDescuento = promociones.filter((p) => p.tipo === "descuento");
  const promosLanzamiento = promociones.filter((p) => p.tipo === "lanzamiento");
  const promosFinSemana = promociones.filter((p) => p.tipo === "fin_de_semana");

  const renderCarrusel = (titulo, imagen, items, tipo) => {
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
              key={promo.id}
              to={`/promociones/${promo.id || promo._id}`}
              className="flex-shrink-0 snap-start w-[160px] sm:w-[180px] md:w-[200px]"
            >
              <CardPromoHome
                title={promo.titulo}
                image={promo.imagenDestacada}
                isNew={promo.isNew}
                hasDiscount={promo.hasDiscount}
                descuento={promo.descuento}
                isVerified={promo.isVerified}
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

      <div className="w-full max-w-full overflow-hidden flex flex-col gap-36">
        <PromocionesDestacadas />

        {renderCarrusel(
          "Descuentos imperdibles",
          bndc,
          promosDescuento,
          "descuento"
        )}
        {renderCarrusel(
          "Nuevos lanzamientos",
          bnnl,
          promosLanzamiento,
          "lanzamiento"
        )}
        {renderCarrusel(
          "Promo fin de semana",
          bnpf,
          promosFinSemana,
          "fin_de_semana"
        )}
        <div className="w-full flex justify-center px-4 py-10">
          <video
            src={bannerBTN}
            autoPlay
            muted
            playsInline
            className="rounded-xl max-w-6xl w-full shadow-lg"
          />
        </div>
      </div>
    </>
  );
}
