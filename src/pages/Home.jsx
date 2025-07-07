import { useState } from "react";
import { Helmet } from "react-helmet-async";
import NegociosSugeridos from "../components/home/NegociosSugeridos";
import EventosProximos from "../components/home/EventosProximos";
import ComunidadesDestacadas from "../components/home/ComunidadesDestacadas";
import BusquedaList from "../components/home/BusquedaList";
import VistaComunidad from "../components/VistaComunidad";
import PromocionesDestacadas from "../components/home/PromocionesDestacadas";
import bannerBTN from "../assets/bannerBTN.mp4";

export default function Home() {
  const [activePanel, setActivePanel] = useState("map"); // 'map' o 'search'

  return (
    <>
      <Helmet>
        <title>Communities | Inicio</title>
        <meta
          name="description"
          content="Explora negocios, eventos y servicios útiles para comunidades migrantes en tu ciudad."
        />
      </Helmet>

      {/* Distribución en grid */}
      <div className="relative flex flex-col lg:flex-row gap-4 min-h-[500px]">
        {/* Mapa */}
        <div
          onFocus={() => setActivePanel("map")}
          className={`transition-all duration-500 ease-in-out w-full ${
            activePanel === "map" ? "lg:w-[75%]" : "lg:w-[25%]"
          }`}
        >
          <VistaComunidad />
        </div>

        {/* Buscador */}
        <div
          onFocus={() => setActivePanel("search")}
          className={`transition-all duration-500 ease-in-out w-full ${
            activePanel === "search" ? "lg:w-[75%]" : "lg:w-[25%]"
          }`}
        >
          <BusquedaList />
        </div>
      </div>

      {/* Secciones principales */}
      <div className="flex flex-col gap-24 mt-12">
        <PromocionesDestacadas />
        <NegociosSugeridos />
        <EventosProximos />
        <ComunidadesDestacadas />

        <div className="w-full hidden sm:flex justify-center px-4 py-10">
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
