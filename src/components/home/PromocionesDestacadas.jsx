import BannerTituloSugeridos from "../BannerTituloSugeridos";
import bannerDSS from "../../assets/bannerDSS.mp4";
import bannerOFF from "../../assets/bannerOFF.mp4";
import bannerTLB from "../../assets/bannerTLB.mp4";
import CardPromoBanner from "./CardPromoBanner";

export default function PromocionesDestacadas({ imagen }) {
  const banners = [
    {
      id: 1,
      video: bannerOFF,

      to: "/promociones/promo-fin-de-semana",
    },
    {
      id: 2,
      video: bannerDSS,
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
        titulo="Promociones destacadas de tu comunidad"
        imagen={imagen}
        link="/promociones"
      />

      <div className="flex flex-col sm:flex-row gap-6">
        {banners.map((item) => (
          <CardPromoBanner key={item.id} video={item.video} to={item.to} />
        ))}
      </div>
    </section>
  );
}
