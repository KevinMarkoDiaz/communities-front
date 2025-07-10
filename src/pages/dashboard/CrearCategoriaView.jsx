// src/pages/dashboard/CrearCategoriaView.jsx
import { Helmet } from "react-helmet-async";
import CrearCategoria from "./CrearCategoria";
import authBg from "../../assets/authbg.png";
import logo2 from "../../assets/communidades_text.svg";
import icono from "../../assets/icono.svg";

export default function CrearCategoriaView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 gap-8">
      <Helmet>
        <title>Crear Categoría | Communities</title>
      </Helmet>

      <section
        className="relative w-full max-w-3xl shadow-xl rounded-2xl p-6 sm:p-16 space-y-6 overflow-hidden"
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
          {/* Título y Logo */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h1 className="text-2xl font-bold text-black flex items-center gap-2">
              Crear Categoría
            </h1>
            <img src={logo2} alt="Communities Logo" className="h-6 w-auto" />
          </div>

          {/* Descripción */}
          <p className="text-gray-700 text-sm sm:text-base">
            Crea nuevas categorías para organizar mejor los negocios, eventos y
            promociones de tu comunidad latina ✨
          </p>

          {/* Formulario */}
          <CrearCategoria />
        </div>
      </section>

      {/* Mensaje inferior */}
      <div className="pt-6 text-center space-y-2">
        <p className="text-[#141C24] text-base font-medium flex justify-center items-center gap-2">
          <img src={icono} alt="Icono" className="h-8 md:h-12" />
          Las categorías ayudan a que los usuarios encuentren fácilmente lo que
          buscan.
        </p>
        <p className="text-sm text-gray-600">
          Cada categoría es una oportunidad de dar visibilidad a la cultura y
          los servicios de tu comunidad.
        </p>
      </div>
    </div>
  );
}
