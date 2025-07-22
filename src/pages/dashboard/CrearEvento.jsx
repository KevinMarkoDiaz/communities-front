// src/pages/dashboard/CrearEvento.jsx
import { Helmet } from "react-helmet-async";
import CrearEditarEventoForm from "../../components/dashboard/formularios/evento/CrearEditarEventoForm";
import authBg from "../../../src/assets/authbg.png";
import ilust2 from "../../assets/ilust2.svg";
import icono from "../../../src/assets/icono.svg";

export default function CrearEvento() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 gap-8">
      <Helmet>
        <title>Crear Evento | Communities</title>
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
        <div className="relative z-10 space-y-6 grid gap-8">
          <div className="flex items-center justify-between gap-2">
            <div className="grid gap-8">
              <h1 className="text-2xl font-bold text-black flex items-center gap-2">
                Crea un nuevo evento
              </h1>
              <p className="text-gray-700 text-sm sm:text-base">
                Organizá una experiencia única para tu comunidad, celebrá tus
                raíces y creá momentos que queden en la memoria de todos ✨
              </p>
            </div>
            <img
              src={ilust2}
              alt="Ilustración evento"
              className="w-40 xl:w-60 opacity-90"
            />
          </div>

          <CrearEditarEventoForm />
        </div>
      </section>

      <div className="pt-6 text-center space-y-2">
        <p className="text-[#141C24] text-base font-medium flex justify-center items-center gap-2">
          <img src={icono} alt="Icono" className="h-8 md:h-12" />
          Comparte experiencias únicas y hacé crecer tu comunidad latina en
          EE. UU.
        </p>
        <p className="text-sm text-gray-600">
          Cada evento es una oportunidad para conectar y celebrar juntos.
        </p>
      </div>
    </div>
  );
}
