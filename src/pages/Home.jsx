import { Helmet } from "react-helmet-async";
import NegociosSugeridos from "../components/home/NegociosSugeridos";
import EventosProximos from "../components/home/EventosProximos";
import ComunidadesDestacadas from "../components/home/ComunidadesDestacadas";
import BusquedaList from "../components/home/BusquedaList ";

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
      <BusquedaList />

      {/* Contenido adicional sugerido */}
      <div className="px-4 sm:px-6 lg:px-8 py-10 space-y-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-[#141C24]">
          Bienvenido a Communities
        </h2>
        <p className="text-[#3F5374] text-base leading-relaxed">
          Descubre negocios, eventos y comunidades de tu país en tu nueva
          ciudad. Apoyá lo local, conectá con tu cultura y encontrá servicios
          pensados para vos.
        </p>

        <NegociosSugeridos />
        <EventosProximos />
        <ComunidadesDestacadas />
      </div>
    </>
  );
}
