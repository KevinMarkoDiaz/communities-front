import BannerTituloSugeridos from "../BannerTituloSugeridos";
import bannerDSS from "../../assets/bannerDSS.mp4";
import bannerOFF from "../../assets/bannerOFF.mp4";
import bannerTLB from "../../assets/bannerTLB.mp4";

import promo2 from "../../assets/a.jpg";
import CardPromoBanner from "./CardPromoBanner";

export default function PromocionesDestacadas() {
  const banners = [
    {
      id: 1,
      video: bannerDSS,
      to: "/promociones/promo-fin-de-semana",
    },
    {
      id: 2,
      video: bannerOFF,
      to: "/promociones/descuentos-imperdibles",
    },
    {
      id: 3,
      video: bannerTLB,
      to: "/promociones/nuevos-lanzamientos",
    },
  ];

  return (
    <section className="space-y-4">
      <BannerTituloSugeridos
        titulo="Promociones destacadas"
        imagen={promo2} // o tu imagen de promociones
        link="/promociones"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((item) => (
          <CardPromoBanner key={item.id} video={item.video} to={item.to} />
        ))}
      </div>
    </section>
  );
}
