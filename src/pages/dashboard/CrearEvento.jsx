// src/pages/dashboard/CrearEvento.jsx
import { Helmet } from "react-helmet-async";
import CrearEditarEventoForm from "../../components/dashboard/formularios/evento/CrearEditarEventoForm";
import authBg from "../../../src/assets/authbg.png";

export default function CrearEvento() {
  return (
    <div className="flex-col flex items-center justify-center min-h-screen px-4 gap-8">
      <Helmet>
        <title>Crear Evento | Communities</title>
      </Helmet>

      <section
        className="w-full max-w-5xl shadow rounded-2xl p-6 sm:p-16 space-y-6"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#141C24]">Crear Evento</h1>
          <p className="text-gray-100 text-sm sm:text-base">
            Organiza actividades que unan a tu comunidad, celebren la cultura y
            generen recuerdos inolvidables ✨
          </p>
        </div>

        <CrearEditarEventoForm />
      </section>

      <div className="pt-6 text-center">
        <p className="text-[#141C24] text-base font-medium">
          🎉 Comparte experiencias únicas y haz crecer tu comunidad latina en
          EE. UU.
        </p>
        <p className="text-sm text-gray-600">
          Cada evento es una oportunidad de conexión y celebración.
        </p>
      </div>
    </div>
  );
}
