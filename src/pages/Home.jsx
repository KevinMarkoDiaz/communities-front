import { Helmet } from "react-helmet-async";
import NegociosSugeridos from "../components/home/NegociosSugeridos";
import EventosProximos from "../components/home/EventosProximos";
import ComunidadesDestacadas from "../components/home/ComunidadesDestacadas";
import BusquedaList from "../components/home/BusquedaList ";
import HeroBannerLatino from "../components/home/HeroBannerLatino";
import VistaComunidad from "../components/VistaComunidad";

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

      {/* Hero con buscador y resultados */}
      <VistaComunidad />
      {/* Contenido adicional sugerido */}
      <div className="px-4 sm:px-6 lg:px-8 py-10 space-y-12 max-w-6xl mx-auto">
        <BusquedaList />
        <div className=" flex flex-col gap-24">
          <div className="px-4 sm:px-6 lg:px-8 py-10 space-y-12 max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
              {/* Texto (40%) */}
              <div className="w-full lg:w-2/5 space-y-4 flex flex-col justify-center h-full">
                <h2 className="text-3xl font-extrabold text-[#F45525] tracking-tight">
                  ¡Bienvenido a Communities!
                </h2>
                <p className="text-[#141C24] text-lg leading-relaxed">
                  Conectá con lo mejor de tu cultura en EE.UU. <br />
                  Descubrí <span className=" font-bold">negocios latinos</span>,
                  participá en{" "}
                  <span className="font-bold">eventos locales</span>, y encontrá
                  tu
                  <span className="font-bold"> comunidad</span> donde quiera que
                  estés.
                </p>
              </div>

              {/* HeroBannerLatino (60%) */}
              <div className="w-full lg:w-3/5">
                <HeroBannerLatino />
              </div>
            </div>
          </div>

          <NegociosSugeridos />
          <EventosProximos />
          <ComunidadesDestacadas />
        </div>
      </div>
    </>
  );
}
