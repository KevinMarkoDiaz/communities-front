import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SuscripcionCancelada() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige de nuevo a la info premium después de unos segundos
    const timeout = setTimeout(() => {
      navigate("/premium");
    }, 4000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold text-red-600">Pago cancelado</h1>
      <p className="text-gray-700 mt-3">
        No se completó la suscripción. Puedes intentarlo nuevamente cuando
        quieras.
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Redirigiendo a la página de suscripción...
      </p>
    </section>
  );
}
