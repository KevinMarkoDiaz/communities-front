import { Helmet } from "react-helmet-async";
import NegocioForm from "./NegocioForm";
import authBg from "../../../src/assets/authbg.png";
import logo2 from "../../../src/assets/communidades_text.svg";
import icono from "../../../src/assets/icono.svg";

export default function CrearNegocio() {
  return (
    <div className="flex-col flex items-center justify-center min-h-screen px-4 gap-8">
      <Helmet>
        <title>Crear Negocio | Communities</title>
      </Helmet>

      <section
        className="relative w-full max-w-5xl shadow-xl rounded-2xl p-6 sm:p-16 space-y-6 overflow-hidden"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Capa semitransparente */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl h-full"></div>

        {/* Contenido */}
        <div className="relative space-y-6 grid gap-8">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h1 className="text-2xl font-bold text-black flex items-center gap-2">
              Crear Negocio
            </h1>
            <img src={logo2} alt="Communities Logo" className="h-6 w-auto" />
          </div>

          <p className="text-gray-700 text-sm sm:text-base">
            Comparte tu emprendimiento con la comunidad, atrae clientes y haz
            crecer tu negocio en EE. UU. 🚀
          </p>

          <NegocioForm />
        </div>
      </section>

      <div className="pt-6 text-center space-y-2">
        <p className="text-[#141C24] text-base font-medium flex justify-center items-center gap-2">
          <img src={icono} alt="Icono" className="h-8 md:h-12" />
          Da visibilidad a tu proyecto y conecta con latinos que apoyan tu
          pasión.
        </p>
        <p className="text-sm text-gray-600">
          Tu negocio puede marcar la diferencia en la vida de otros migrantes.
        </p>
      </div>
    </div>
  );
}
