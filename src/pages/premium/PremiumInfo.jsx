import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { crearSesionStripe } from "../../api/stripeApi";
import {
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaShieldAlt,
  FaUndo,
  FaHeadset,
} from "react-icons/fa";
import { mostrarFeedback } from "../../store/feedbackSlice";
import { useDispatch } from "react-redux";

export default function PremiumInfo() {
  const [loading, setLoading] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(null);
  const dispatch = useDispatch();

  const manejarSuscripcion = async () => {
    try {
      setLoading(true);
      const url = await crearSesionStripe();
      window.location.href = url;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: "Error al iniciar suscripción.",
          type: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Puedo cancelar en cualquier momento?",
      answer:
        "Sí. Puedes cancelar tu suscripción desde tu perfil y tu plan volverá a gratuito al finalizar el ciclo actual.",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer:
        "Aceptamos todas las tarjetas de crédito y débito principales a través de Stripe.",
    },
    {
      question: "¿Puedo cambiar de plan después?",
      answer: "Sí. Puedes actualizar o cancelar tu plan en cualquier momento.",
    },
    {
      question: "¿Qué beneficios obtengo?",
      answer:
        "Tu negocio o comunidad aparecerá en posiciones destacadas, con mayor visibilidad y acceso a promociones exclusivas.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Suscripción Premium – Communities</title>
      </Helmet>

      <section className="max-w-5xl mx-auto p-6 space-y-12 grid md:gap-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-orange-600">
            Hazte Premium y Brilla en Grande
          </h1>
          <p className="text-lg text-gray-600">
            Llega a más personas, muestra tu esencia y convierte tu negocio o
            comunidad en protagonista. Con beneficios únicos y visibilidad que
            te hará destacar de verdad.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Plan Gratuito */}
          <div className="border rounded-2xl p-6 bg-gray-50 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Plan Gratuito
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-5 flex-shrink-0 flex justify-center">
                  <FaCheckCircle size={18} className="text-green-600" />
                </div>
                <span className="flex-1">
                  Publicación básica visible en la plataforma
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 flex-shrink-0 flex justify-center">
                  <FaCheckCircle size={18} className="text-green-600" />
                </div>
                <span className="flex-1">
                  Aparece en resultados de búsqueda generales
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 flex-shrink-0 flex justify-center">
                  <FaCheckCircle size={18} className="text-green-600" />
                </div>
                <span className="flex-1">
                  Ubicación mostrada en el mapa con icono estándar
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 flex-shrink-0 flex justify-center">
                  <FaCheckCircle size={18} className="text-green-600" />
                </div>
                <span className="flex-1">
                  Hasta 5 imágenes en la galería de tu negocio
                </span>
              </li>
            </ul>

            <div className="mt-4  text-xs text-gray-500">
              Ideal para comenzar a dar visibilidad a tu proyecto y explorar
              todas las posibilidades de Communities.
            </div>
          </div>

          {/* Plan Premium */}
          <div className="border rounded-2xl p-6 bg-green-50 shadow-lg ring-2 ring-green-500">
            <h2 className="text-2xl font-semibold mb-4">Plan Premium</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <div className="w-5 flex-shrink-0 flex justify-center">
                  <FaCheckCircle size={18} className="text-green-700" />
                </div>
                <span className="flex-1">
                  Más visibilidad en búsquedas y listados
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 flex-shrink-0 flex justify-center">
                  <FaCheckCircle size={18} className="text-green-700" />
                </div>
                <span className="flex-1">
                  Icono destacado en el mapa de tu comunidad
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 flex-shrink-0 flex justify-center">
                  <FaCheckCircle size={18} className="text-green-700" />
                </div>
                <span className="flex-1">
                  Mejor indexación en categorías de tu comunidad
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 flex-shrink-0 flex justify-center">
                  <FaCheckCircle size={18} className="text-green-700" />
                </div>
                <span className="flex-1">
                  Notificaciones por correo de nuevos mensajes a tu negocio
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 flex-shrink-0 flex justify-center">
                  <FaCheckCircle size={18} className="text-green-700" />
                </div>
                <span className="flex-1">
                  Perfil de negocio destacado dentro del detalle de tu comunidad
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 flex-shrink-0 flex justify-center">
                  <FaCheckCircle size={18} className="text-green-700" />
                </div>
                <span className="flex-1">
                  Acceso prioritario a promociones y campañas
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 flex-shrink-0 flex justify-center">
                  <FaCheckCircle size={18} className="text-green-700" />
                </div>
                <span className="flex-1">Soporte preferencial</span>
              </li>
            </ul>

            <div className="mt-6">
              <p className=" text-lg font-bold text-green-700 mb-4">
                $12.99 / mes
              </p>
              <button
                onClick={manejarSuscripcion}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full transition"
              >
                {loading ? "Redirigiendo..." : "Suscribirse ahora"}
              </button>
            </div>
          </div>
        </div>

        {/* Confianza y Seguridad */}
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow">
            <FaShieldAlt size={28} className="text-orange-500 mb-2" />
            <h3 className="font-semibold">Pago Seguro</h3>
            <p className="text-gray-500  text-xs">
              Transacciones procesadas mediante Stripe con cifrado SSL.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow">
            <FaUndo size={28} className="text-orange-500 mb-2" />
            <h3 className="font-semibold">Cancelación Flexible</h3>
            <p className="text-gray-500  text-xs">
              Cancela cuando quieras desde tu perfil sin penalizaciones.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow">
            <FaHeadset size={28} className="text-orange-500 mb-2" />
            <h3 className="font-semibold">Soporte Prioritario</h3>
            <p className="text-gray-500  text-xs">
              Atención rápida y preferencial para usuarios Premium.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-md mx-auto mt-10">
          <h3 className="text-2xl font-semibold mb-6 text-orange-600 text-center">
            Preguntas Frecuentes
          </h3>
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="flex items-center justify-between w-full p-4 text-left bg-white hover:bg-gray-50 focus:outline-none"
                >
                  <span className="font-medium">{faq.question}</span>
                  {openQuestion === index ? (
                    <FaChevronUp size={18} className="text-orange-500" />
                  ) : (
                    <FaChevronDown size={18} className="text-gray-500" />
                  )}
                </button>
                {openQuestion === index && (
                  <div className="p-4 bg-gray-50 text-gray-700">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
