import { Helmet } from "react-helmet-async";
import { usePromociones } from "../../data/usePromociones";
import BannerPromociones from "../../components/promo/BannerPromociones";
import CardPromoHome from "../../components/promo/CardPromoHome";

import promoDescuentos from "../../assets/a.jpg"; // Reemplazá por la imagen real

export default function DescuentosImperdibles() {
  const { lista: promociones } = usePromociones();

  const promosDescuento = promociones.filter((p) => p.tipo === "descuento");

  return (
    <>
      <Helmet>
        <title>Descuentos imperdibles | Communities</title>
        <meta
          name="description"
          content="Descubrí promociones con descuentos exclusivos para tu comunidad."
        />
      </Helmet>

      <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-6xl mx-auto space-y-8">
        {/* Banner */}
        <BannerPromociones
          titulo="Descuentos imperdibles"
          imagen={promoDescuentos}
        />

        {/* Grid de promociones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {promosDescuento.map((promo) => (
            <CardPromoHome
              key={promo.id}
              title={promo.titulo}
              image={promo.imagenDestacada}
              isNew={promo.isNew}
              hasDiscount={promo.hasDiscount}
              descuento={promo.descuento}
              isVerified={promo.verificado}
            />
          ))}
        </div>
      </div>
    </>
  );
}
