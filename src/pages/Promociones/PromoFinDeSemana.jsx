import { Helmet } from "react-helmet-async";
import { usePromociones } from "../../data/usePromociones";
import BannerPromociones from "../../components/promo/BannerPromociones";
import CardPromoHome from "../../components/promo/CardPromoHome";

// Imagen destacada
import promoFinDeSemana from "../../assets/a.jpg"; // o la imagen real de fondo

export default function PromoFinDeSemana() {
  const { lista: promociones } = usePromociones();

  // Filtrar solo las promos de fin de semana
  const promosFinDeSemana = promociones.filter(
    (p) => p.tipo === "fin_de_semana"
  );

  return (
    <>
      <Helmet>
        <title>Promos fin de semana | Communities</title>
        <meta
          name="description"
          content="Descubrí las mejores promociones para este fin de semana."
        />
      </Helmet>

      <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-6xl mx-auto space-y-8">
        {/* Banner */}
        <BannerPromociones
          titulo="Promo fin de semana"
          imagen={promoFinDeSemana}
        />

        {/* Grid de promociones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {promosFinDeSemana.map((promo) => (
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
