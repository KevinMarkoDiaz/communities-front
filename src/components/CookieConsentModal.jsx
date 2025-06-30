import { useEffect, useState } from "react";

export default function CookieConsentModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (accepted) {
      setVisible(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Fondo oscuro con transparencia
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-4 text-center border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Uso de Cookies</h2>
        <p className="text-gray-700 text-sm">
          Utilizamos cookies propias y de terceros para recordar tus
          preferencias, analizar el tráfico y mejorar tu experiencia de
          navegación. Al continuar navegando, aceptas nuestra{" "}
          <a href="/legal-privacy" className="underline text-[#F45525]">
            política de privacidad
          </a>{" "}
          y uso de cookies.
        </p>
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={handleDecline}
            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
          >
            Rechazar
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded bg-[#F45525] text-white hover:bg-[#d9451f] text-sm"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
