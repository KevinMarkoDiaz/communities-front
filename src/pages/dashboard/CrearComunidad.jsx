import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import CrearEditarComunidadForm from "../../components/dashboard/formularios/comunidad/CrearEditarComunidadForm";
import authBg from "../../../src/assets/authbg.png";
import ilust2 from "../../assets/ilust2.svg";
import icono from "../../../src/assets/icono.svg";
import SkeletonNegocioForm from "../../components/Skeleton/SkeletonNegocioForm";

export default function CrearComunidad() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 100); // fluidez suave
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 gap-8">
      <Helmet>
        <title>Crear Comunidad | Communities</title>
      </Helmet>

      <section
        className="relative w-full max-w-5xl shadow-xl rounded-2xl p-6 sm:p-16 space-y-6 overflow-hidden"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl h-full" />

        <div className="relative z-10 space-y-6 grid gap-8">
          <div className="flex items-center justify-between gap-2">
            <div className="grid gap-8">
              <h1 className="text-2xl font-bold text-black flex items-center gap-2">
                Crea tu espacio cultural
              </h1>
              <p className="text-gray-700 text-sm sm:text-base">
                Une a las personas, celebra tu cultura y comparte tu historia
                con el mundo 🌎
              </p>
            </div>
            <img
              src={ilust2}
              alt="Ilustración comunidad"
              className="w-40 xl:w-60 opacity-90"
            />
          </div>

          {loading ? <SkeletonNegocioForm /> : <CrearEditarComunidadForm />}
        </div>
      </section>

      <div className="pt-6 text-center space-y-2">
        <p className="text-[#141C24] text-base font-medium flex justify-center items-center gap-2">
          <img src={icono} alt="Icono" className="h-8 md:h-12" />
          Dale vida a tu comunidad y conecta a los latinos en EE. UU.
        </p>
        <p className="text-sm text-gray-600">
          Crea un espacio donde todos se sientan como en casa.
        </p>
      </div>
    </div>
  );
}
