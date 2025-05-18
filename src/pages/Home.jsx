import { Helmet } from "react-helmet-async";
import NegociosSugeridos from "../components/home/NegociosSugeridos";
import EventosProximos from "../components/home/EventosProximos";
import ComunidadesDestacadas from "../components/home/ComunidadesDestacadas";

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

      <div className="p-4">
        <h2 className="text-2xl font-bold">Inicio</h2>
        <p>Bienvenido a Communities</p>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 py-10 space-y-12 max-w-6xl mx-auto">
        <NegociosSugeridos />
        <EventosProximos />
        <ComunidadesDestacadas />
      </div>
    </>
  );
}
