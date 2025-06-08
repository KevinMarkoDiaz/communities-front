import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SuscripcionExitosa() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige al dashboard después de unos segundos
    const timeout = setTimeout(() => {
      navigate("/dashboard/perfil");
    }, 4000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold text-green-600">
        ¡Gracias por suscribirte!
      </h1>
      <p className="text-gray-700 mt-3">
        Tu suscripción Premium ha sido procesada con éxito.
      </p>
      <p className="text-sm text-gray-500 mt-1">Redirigiendo a tu perfil...</p>
    </section>
  );
}
