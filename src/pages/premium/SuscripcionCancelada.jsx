import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaRegSadTear } from "react-icons/fa";

export default function SuscripcionCancelada() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Suscripción Cancelada – Communities</title>
      </Helmet>

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-12 bg-white">
        <div className="flex flex-col items-center space-y-4 max-w-xl">
          <FaRegSadTear className="text-orange-400 text-6xl" />

          <h1 className="text-3xl md:text-4xl font-bold text-orange-600">
            ¡Uups! No pudimos completar tu suscripción
          </h1>

          <p className="text-gray-700 text-lg">
            Parece que cancelaste el proceso o hubo un pequeño inconveniente.
          </p>

          <p className="text-gray-500 text-sm">
            No pasa nada, puedes volver a intentarlo cuando prefieras. Mientras
            tanto, tu cuenta sigue activa en el plan gratuito.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/premium")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition"
            >
              Intentar de nuevo
            </button>

            <button
              onClick={() => navigate("/dashboard/perfil")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-full text-sm font-semibold transition"
            >
              Ir a mi perfil
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
