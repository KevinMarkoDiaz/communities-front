import { Helmet } from "react-helmet-async";
import NegocioForm from "./NegocioForm";
import authBg from "../../../src/assets/authbg.png";

export default function CrearNegocio() {
  return (
    <div className="flex-col flex items-center justify-center min-h-screen px-4 gap-8">
      <Helmet>
        <title>Crear Negocio | Communities</title>
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
          <h1 className="text-2xl font-bold text-[#141C24]">Crear Negocio</h1>
          <p className="text-gray-100 text-sm sm:text-base">
            Comparte tu emprendimiento con la comunidad, atrae clientes y haz
            crecer tu negocio en EE. UU. 🚀
          </p>
        </div>

        <NegocioForm />
      </section>

      <div className="pt-6 text-center">
        <p className="text-[#141C24] text-base font-medium">
          🌟 Da visibilidad a tu proyecto y conecta con latinos que apoyan tu
          pasión.
        </p>
        <p className="text-sm text-gray-600">
          Tu negocio puede marcar la diferencia en la vida de otros migrantes.
        </p>
      </div>
    </div>
  );
}
