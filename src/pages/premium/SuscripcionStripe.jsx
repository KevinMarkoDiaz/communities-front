import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SuscripcionStripe() {
  const navigate = useNavigate();

  useEffect(() => {
    // Placeholder: reemplazar por lógica real más adelante
    const timeout = setTimeout(() => {
      // Por ahora solo volve al info Premium
      navigate("/premium");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-2xl font-semibold">Procesando suscripción...</h1>
      <p className="text-gray-600 mt-2">
        Aquí iría la lógica para conectar con Stripe.
      </p>
    </section>
  );
}
