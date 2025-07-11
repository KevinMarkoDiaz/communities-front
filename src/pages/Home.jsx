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
    <div className="flex flex-col gap-12 md:gap-16 xl:gap-24 md:mt-12">
      <Helmet>
        <title>Communities | Inicio</title>
        <meta
          name="description"
          content="Explora negocios, eventos y servicios útiles para comunidades migrantes en tu ciudad."
        />
      </Helmet>

      {/* Distribución */}
      <div className="relative flex flex-col lg:flex-row gap-4 min-h-[500px]">
        {/* Mapa */}
        <div
          onFocus={() => setActivePanel("map")}
          className={`
            transition-all duration-500 ease-in-out w-full
            ${activePanel === "map" ? "block" : "hidden"}
            sm:block
            ${activePanel === "map" ? "lg:w-[75%]" : "lg:w-[25%]"}
          `}
        >
          <VistaComunidad />
        </div>

        {/* Buscador */}
        <div
          onFocus={() => setActivePanel("search")}
          className={`
            transition-all duration-500 ease-in-out w-full
            ${activePanel === "search" ? "block" : "hidden"}
            sm:block
            ${activePanel === "search" ? "lg:w-[75%]" : "lg:w-[25%]"}
          `}
        >
          <BusquedaList />
        </div>
      </div>
      {/* Para mobile: botones de alternar */}
      <div className="sm:hidden mb-4 px-2 w-full">
        <div className="relative flex bg-orange-50 rounded-lg p-1">
          {/* Fondo animado */}
          <span
            className={`absolute inset-y-0 left-0 w-1/2 bg-orange-500 rounded-md transition-transform duration-300 ease-in-out ${
              activePanel === "search" ? "translate-x-full" : "translate-x-0"
            }`}
          />
          {/* Botones */}
          <button
            onClick={() => setActivePanel("map")}
            className={`flex-1 z-10 text-center py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
              activePanel === "map" ? "text-white" : "text-orange-600"
            }`}
          >
            Mapa
          </button>
          <button
            onClick={() => setActivePanel("search")}
            className={`flex-1 z-10 text-center py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
              activePanel === "search" ? "text-white" : "text-orange-600"
            }`}
          >
            Buscador
          </button>
        </div>
      </div>
      {/* Secciones principales */}
      <div className="flex flex-col gap-12 md:gap-16 xl:gap-24 mt-12">
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
    </div>
  );
}
