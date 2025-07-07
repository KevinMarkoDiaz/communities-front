// src/pages/premium/SuscripcionExitosa.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

export default function SuscripcionExitosa() {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Escuchar cambios de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      {/* Confeti */}
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={250}
        recycle={false}
      />

      {/* Mensaje principal */}
      <h1 className="text-4xl font-extrabold text-green-600 mb-4">
        ¡Gracias por subirte a lo Premium!
      </h1>
      <p className="text-gray-700 text-lg mb-2 max-w-xl">
        Tu suscripción ha sido activada con éxito. Ahora tu negocio brillará con
        más visibilidad, mejores posiciones y beneficios exclusivos que harán
        crecer tu comunidad.
      </p>
      <p className="text-gray-500 mb-6">
        Estamos felices de acompañarte en este camino. 🚀
      </p>

      {/* Botón para volver al dashboard */}
      <button
        onClick={() => navigate("/dashboard/perfil")}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-base font-medium transition"
      >
        Ir a mi perfil
      </button>
    </section>
  );
}
