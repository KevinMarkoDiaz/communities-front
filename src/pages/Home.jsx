import { Helmet } from "react-helmet-async";
import NegociosSugeridos from "../components/home/NegociosSugeridos";
import EventosProximos from "../components/home/EventosProximos";
import ComunidadesDestacadas from "../components/home/ComunidadesDestacadas";
import BusquedaList from "../components/home/BusquedaList ";
import HeroBannerLatino from "../components/home/HeroBannerLatino";
import VistaComunidad from "../components/VistaComunidad";
import PromocionesDestacadas from "../components/home/PromocionesDestacadas";
import bannerBTN from "../assets/bannerBTN.mp4"; // ✅ Importar video

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Communities | Inicio</title>
        <meta
          name="description"
          content="Explora negocios, eventos y servicios útiles para comunidades migrantes en tu ciudad."
        />
      </Helmet>

      <div className="px-4 sm:px-6 lg:px-8 py-10 space-y-12 max-w-6xl mx-auto flex flex-col gap-32">
        {/* Banner de video */}
        <div className="w-full flex justify-center px-4 py-10">
          <video
            src={bannerBTN}
            autoPlay
            muted
            playsInline
            className="rounded-xl max-w-6xl w-full shadow-lg"
          />
        </div>

        {/* Buscador y comunidad */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-5/5">
            <BusquedaList />
          </div>
          {/* <div className="w-full lg:w-3/5"><VistaComunidad /></div> */}
        </div>

        {/* Secciones principales */}
        <div className="flex flex-col gap-24">
          <PromocionesDestacadas />
          <NegociosSugeridos />
          <EventosProximos />
          <ComunidadesDestacadas />

          {/* ✅ Nueva sección: promociones */}

          {/* Sección final de bienvenida */}
          <div className="px-4 sm:px-6 lg:px-8 py-10 space-y-12 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
              {/* Texto */}
              <div className="w-full lg:w-2/5 space-y-4 flex flex-col justify-center h-full">
                <h2 className="text-3xl font-extrabold text-[#F45525] tracking-tight">
                  ¡Bienvenido a Communities!
                </h2>
                <p className="text-[#141C24] text-lg leading-relaxed">
                  Conectá con lo mejor de tu cultura en EE.UU. <br />
                  Descubrí <span className="font-bold">negocios latinos</span>,
                  participá en{" "}
                  <span className="font-bold">eventos locales</span>, y encontrá
                  tu <span className="font-bold">comunidad</span> donde quiera
                  que estés.
                </p>
              </div>

              {/* Imagen ilustrativa */}
              <div className="w-full lg:w-3/5">
                <HeroBannerLatino />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
