// src/pages/dashboard/CrearCategoriaView.jsx
import { Helmet } from "react-helmet-async";
import CrearCategoria from "./CrearCategoria";
import authBg from "../../assets/authbg.png";

export default function CrearCategoriaView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 gap-8">
      <Helmet>
        <title>Crear Categoría | Communities</title>
      </Helmet>

      <section
        className="w-full max-w-3xl shadow rounded-2xl p-6 sm:p-16 space-y-6"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#141C24]">Crear Categoría</h1>
          <p className="text-gray-100 text-sm sm:text-base">
            Crea nuevas categorías para organizar mejor los negocios, eventos y
            promociones de tu comunidad latina ✨
          </p>
        </div>

        <CrearCategoria />
      </section>

      <div className="pt-6 text-center">
        <p className="text-[#141C24] text-base font-medium">
          🗂️ Las categorías ayudan a que los usuarios encuentren fácilmente lo
          que buscan.
        </p>
        <p className="text-sm text-gray-600">
          Cada categoría es una oportunidad de dar visibilidad a la cultura y
          los servicios de tu comunidad.
        </p>
      </div>
    </div>
  );
}
