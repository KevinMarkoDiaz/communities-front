import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export default function PremiumInfo() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Suscripción Premium – Communities</title>
      </Helmet>

      <section className="max-w-5xl mx-auto p-6 space-y-10">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold">
            Mejora tu visibilidad con Premium
          </h1>
          <p className="text-lg text-gray-600">
            Destaca tu negocio o comunidad con tarjetas exclusivas, más
            presencia y beneficios especiales.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Plan gratuito */}
          <div className="border rounded-2xl p-6 bg-white shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Plan Gratuito</h2>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Publicación básica</li>
              <li>✅ Aparece en resultados de búsqueda</li>
              <li>❌ No tiene tarjeta destacada</li>
              <li>❌ No aparece en promociones especiales</li>
            </ul>
          </div>

          {/* Plan Premium */}
          <div className="border rounded-2xl p-6 bg-gray-50 shadow-lg ring-2 ring-indigo-500">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
              Plan Premium
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>✅ Tarjeta premium en portada</li>
              <li>✅ Doble visibilidad en secciones clave</li>
              <li>✅ Acceso a campañas promocionales</li>
              <li>✅ Soporte prioritario</li>
            </ul>
            <div className="mt-6">
              <p className="text-xl font-bold text-indigo-600 mb-4">
                $9.99 / mes
              </p>
              <button
                onClick={() => navigate("/suscribirse")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full transition"
              >
                Suscribirse ahora
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
