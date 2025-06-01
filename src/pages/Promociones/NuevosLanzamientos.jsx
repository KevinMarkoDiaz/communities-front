import { Helmet } from "react-helmet-async";
import { usePromociones } from "../../data/usePromociones";
import BannerPromociones from "../../components/promo/BannerPromociones";
import CardPromoHome from "../../components/promo/CardPromoHome";

// Imagen de fondo del banner
import promoLanzamientos from "../../assets/a.jpg"; // cambiá por la correcta si tenés otra

export default function NuevosLanzamientos() {
  const { lista: promociones } = usePromociones();

  const promosLanzamiento = promociones.filter((p) => p.tipo === "lanzamiento");

  return (
    <>
      <Helmet>
        <title>Nuevos lanzamientos | Communities</title>
        <meta
          name="description"
          content="Descubrí los últimos lanzamientos pensados para vos."
        />
      </Helmet>

      <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-6xl mx-auto space-y-8">
        {/* Banner */}
        <BannerPromociones
          titulo="Nuevos lanzamientos"
          imagen={promoLanzamientos}
        />

        {/* Grid de promociones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {promosLanzamiento.map((promo) => (
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
