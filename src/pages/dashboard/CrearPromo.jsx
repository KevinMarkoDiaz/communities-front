// src/pages/dashboard/CrearPromo.jsx
import { Helmet } from "react-helmet-async";
import authBg from "../../assets/authbg.png";
import PromoForm from "./PromoForm";

export default function CrearPromo() {
  return (
    <div className="flex-col flex items-center justify-center min-h-screen px-4 gap-8">
      <Helmet>
        <title>Crear Promoción | Communities</title>
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
          <h1 className="text-2xl font-bold text-[#141C24]">Crear Promoción</h1>
          <p className="text-gray-100 text-sm sm:text-base">
            Comparte ofertas especiales y promociones exclusivas que ayuden a tu
            negocio a conectar con la comunidad latina 💫
          </p>
        </div>

        <PromoForm />
      </section>

      <div className="pt-6 text-center">
        <p className="text-[#141C24] text-base font-medium">
          🎁 Destaca tus productos y fortalece la identidad de tu comunidad.
        </p>
        <p className="text-sm text-gray-600">
          Cada promoción es una oportunidad de crecer juntos.
        </p>
      </div>
    </div>
  );
}
