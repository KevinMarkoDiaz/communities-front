import { Helmet } from "react-helmet-async";
import CrearEditarComunidadForm from "../../components/dashboard/formularios/comunidad/CrearEditarComunidadForm";
import authBg from "../../../src/assets/authbg.png";

export default function CrearComunidad() {
  return (
    <div className="flex-col flex items-center justify-center min-h-screen px-4 gap-8">
      <Helmet>
        <title>Crear Comunidad | Communities</title>
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
          <h1 className="text-2xl font-bold text-[#141C24]">Crear Comunidad</h1>
          <p className="text-gray-100 text-sm sm:text-base">
            Une a las personas, celebra tu cultura y comparte tu historia con el
            mundo 🌎
          </p>
        </div>

        <CrearEditarComunidadForm />
      </section>
      <div className="pt-6 text-center">
        <p className="text-[#141C24] text-base font-medium">
          ✨ Dale vida a tu comunidad y conecta a los latinos en EE. UU.
        </p>
        <p className="text-sm text-gray-600">
          Crea un espacio donde todos se sientan como en casa.
        </p>
      </div>
    </div>
  );
}
