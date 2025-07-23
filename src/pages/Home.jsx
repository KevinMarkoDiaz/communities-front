import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

import NegociosSugeridos from "../components/home/NegociosSugeridos";
import EventosProximos from "../components/home/EventosProximos";
import ComunidadesDestacadas from "../components/home/ComunidadesDestacadas";
import BusquedaList from "../components/home/BusquedaList";
import VistaComunidad from "../components/VistaComunidad";
import PromocionesDestacadas from "../components/home/PromocionesDestacadas";
import bannerBTN from "../assets/bannerBTN.mp4";

export default function Home() {
  const [activePanel, setActivePanel] = useState("map");
  const negocios = useSelector((state) => state.negocios.lista);
  const negociosLoading = useSelector((state) => state.negocios.loading);

  const eventos = useSelector((state) => state.eventos.lista);
  const eventosLoading = useSelector((state) => state.eventos.loading);

  const comunidades = useSelector((state) => state.comunidades.lista);
  const comunidadesLoading = useSelector((state) => state.comunidades.loading);
  const comunidad = useSelector(
    (state) => state.comunidadSeleccionada.comunidad
  );

  return (
    <div className="flex flex-col gap-12 md:gap-16 xl:gap-24 md:mt-12">
      <Helmet>
        <title>Communities | Inicio</title>
        <meta
          name="description"
          content="Explora negocios, eventos y servicios útiles para comunidades migrantes en tu ciudad."
        />
      </Helmet>

      {/* Mapa + Buscador */}
      <div className="relative flex flex-col lg:flex-row gap-4 min-h-[500px]">
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
      {!comunidad ? (
        <div className="w-full max-w-5xl mx-auto px-4 mt-6 text-center">
          <div className="bg-gradient-to-r from-yellow-50 to-purple-50 p-4 rounded-xl shadow text-sm text-gray-700 font-medium">
            🌍 Aún no seleccionaste una comunidad. Elegí la que más te
            represente para ver contenido relevante.
          </div>
        </div>
      ) : (
        <div className="w-full max-w-5xl mx-auto px-4 mt-6 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-yellow-50 p-4 rounded-xl shadow text-sm text-gray-800 font-semibold">
            👋 Estás explorando la comunidad{" "}
            <span className="text-sky-600">{comunidad.name}</span>. ¡Todo lo que
            ves ahora está pensado para vos!
          </div>
        </div>
      )}
      {/* Botones mobile para alternar */}
      <div className="sm:hidden mb-4 px-2 w-full">
        <div className="relative flex bg-orange-50 rounded-lg p-1">
          <span
            className={`absolute inset-y-0 left-0 w-1/2 bg-orange-500 rounded-md transition-transform duration-300 ease-in-out ${
              activePanel === "search" ? "translate-x-full" : "translate-x-0"
            }`}
          />
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
        <NegociosSugeridos negocios={negocios} loading={negociosLoading} />
        <EventosProximos eventos={eventos} loading={eventosLoading} />
        <ComunidadesDestacadas
          comunidades={comunidades}
          loading={comunidadesLoading}
        />

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
