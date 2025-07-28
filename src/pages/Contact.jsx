import { Helmet } from "react-helmet-async";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaEnvelope,
  FaShareAlt,
} from "react-icons/fa";
import { useCallback, useEffect, useState } from "react";
import ilustrD from "../assets/ilustd.svg";
import FadeInOnScroll from "../components/FadeInOnScroll";
import { mostrarFeedback } from "../store/feedbackSlice";
import { useDispatch } from "react-redux";

export default function Contacto() {
  const [esMovil, setEsMovil] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Detectar si es móvil
    const checkMobile = () => {
      if (
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
          navigator.userAgent
        )
      ) {
        setEsMovil(true);
      }
    };
    checkMobile();
  }, []);

  const handleShare = useCallback(() => {
    const shareData = {
      title: "communidades",
      text: "Conectá con tu comunidad en communidades.",
      url: window.location.origin,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => {
          dispatch(
            mostrarFeedback({
              message: "✅ Contenido compartido",
              type: "success",
            })
          );
        })
        .catch((err) => {
          console.error("Error al compartir:", err);
          dispatch(
            mostrarFeedback({
              message: "❌ No se pudo compartir",
              type: "error",
            })
          );
        });
    } else {
      navigator.clipboard
        .writeText(shareData.url)
        .then(() => {
          dispatch(
            mostrarFeedback({
              message: "🔗 Enlace copiado al portapapeles",
              type: "success",
            })
          );
        })
        .catch(() => {
          dispatch(
            mostrarFeedback({
              message: "❌ No se pudo copiar el enlace",
              type: "error",
            })
          );
        });
    }
  }, [dispatch]);

  const grupos = [
    {
      categoria: "Contacto General",
      correos: [
        "info@communidades.com",
        "contacto@communidades.com",
        "infoadmin@communidades.com",
        "contactoadmin@communidades.com",
      ],
    },
    {
      categoria: "Área Comercial y Auspicios",
      correos: [
        "comercial@communidades.com",
        "comercialadmin@communidades.com",
      ],
    },
    {
      categoria: "Eventos y Actividades",
      correos: ["eventos@communidades.com", "eventosadmin@communidades.com"],
    },
  ];

  const redes = [
    {
      nombre: "Instagram",
      icono: <FaInstagram />,
      url: "https://www.instagram.com/communidades_/",
    },
    {
      nombre: "Facebook",
      icono: <FaFacebook />,
      url: "https://www.facebook.com/profile.php?id=61576800572394",
    },
    {
      nombre: "TikTok",
      icono: <FaTiktok />,
      url: "https://www.tiktok.com/@comunnidades_latino?lang=en",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-16 grid gap-12">
      <Helmet>
        <title>Contacto | communidades</title>
        <meta
          name="description"
          content="Ponte en contacto con communidades. Encuentra nuestros correos y redes sociales."
        />
      </Helmet>

      {/* Hero */}
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Contacto</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Estamos aquí para escucharte y echarte una mano en lo que necesites.
          Escríbenos con confianza o síguenos en nuestras redes para mantenernos
          cerca y compartir juntos.
        </p>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Si quieres auspiciar tu negocio o un evento, o si tienes alguna duda
          sobre cómo usar la plataforma, no dudes en contactarnos. Nuestro
          equipo te responderá con gusto.
        </p>
      </section>

      {/* Redes */}
      <section className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Nuestras redes sociales
        </h2>
        <div className="flex justify-center gap-6 text-3xl text-gray-600">
          {redes.map((r) => (
            <a
              key={r.nombre}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={r.nombre}
              className="hover:text-[#F45525] transition"
            >
              {r.icono}
            </a>
          ))}
        </div>
      </section>

      <section className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Auspiciar o Promocionar
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Si tienes un negocio, servicio o evento y te gustaría darle
          visibilidad dentro de{" "}
          <span className="font-semibold text-[#F45525]">communidades</span>,
          contáctanos. Nos encanta sumar proyectos que aporten valor real a la
          comunidad. Juntos podemos crear alianzas que hagan crecer tu marca y
          fortalezcan el tejido cultural que nos une.
        </p>
      </section>
      {/* Imagen ilustración */}
      <section className="flex justify-center">
        <FadeInOnScroll direction="up" duration={1800} delay={2950}>
          <img
            src={ilustrD}
            alt="Conexión y comunidad"
            className="w-full max-w-lg h-auto rounded-xl"
          />
        </FadeInOnScroll>
      </section>
      {/* Soporte */}
      <section className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Soporte</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          ¿Algo no funciona como esperabas? Estamos aquí para ayudarte.
          Escríbenos contándonos tu situación y nuestro equipo de soporte
          revisará tu caso con atención y compromiso. Queremos que tu
          experiencia en{" "}
          <span className="font-semibold text-[#F45525]">communidades</span> sea
          siempre sencilla y positiva.
        </p>
      </section>

      {/* Dudas y consultas */}
      <section className="space-y-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Dudas y Consultas
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Si tienes preguntas sobre cómo usar la plataforma, cómo publicar tu
          negocio o cómo participar en eventos, no dudes en escribirnos. Cada
          consulta es importante y será respondida con calidez. En{" "}
          <span className="font-semibold text-[#F45525]">communidades</span>{" "}
          queremos que te sientas acompañado desde el primer momento.
        </p>
      </section>

      {/* Preguntas Frecuentes */}
      {/* Preguntas Frecuentes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Preguntas Frecuentes
        </h2>
        <div className="max-w-2xl mx-auto space-y-2">
          {[
            {
              pregunta: "¿Es gratis usar communidades?",
              respuesta:
                "Sí, es totalmente gratis para cualquier migrante que quiera descubrir negocios, eventos y servicios en su comunidad.",
            },
            {
              pregunta: "¿Cuánto cuesta registrar mi negocio?",
              respuesta:
                "Tenemos un plan gratuito para que cualquier emprendimiento pueda estar presente. Además, contamos con planes premium con suscripciones muy accesibles que incluyen más opciones de visibilidad.",
            },
            {
              pregunta: "¿Puedo publicar eventos o actividades?",
              respuesta:
                "Claro que sí. Puedes compartir tus eventos culturales, talleres o actividades comunitarias. Escríbenos y te ayudamos a publicarlos.",
            },

            {
              pregunta: "¿Quién puede aparecer en la plataforma?",
              respuesta:
                "Emprendedores, negocios, profesionales, organizaciones y cualquier persona que ofrezca servicios de interés para la comunidad migrante.",
            },
            {
              pregunta:
                "¿Cómo puedo contactar al soporte si tengo un problema?",
              respuesta:
                "Puedes escribirnos a cualquiera de los correos de contacto, especialmente a info@communidades.com, y nuestro equipo responderá a la brevedad.",
            },
          ].map(({ pregunta, respuesta }) => (
            <details
              key={pregunta}
              className="bg-gray-50 rounded-lg p-4 shadow-sm group overflow-hidden transition-all duration-300"
            >
              <summary className="cursor-pointer font-medium text-gray-800 relative list-none">
                <span className="inline-block">{pregunta}</span>
                <span className="absolute right-0 transform transition-transform duration-300 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="mt-2 text-gray-700">
                <p>{respuesta}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Correos agrupados */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Correos de contacto
        </h2>
        {grupos.map((grupo) => (
          <div key={grupo.categoria} className="space-y-3">
            <h3 className="text-lg font-medium text-gray-800">
              {grupo.categoria}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {grupo.correos.map((correo) => (
                <li
                  key={correo}
                  className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg shadow-sm"
                >
                  <FaEnvelope className="text-[#F45525]" />
                  {esMovil ? (
                    <a
                      href={`mailto:${correo}`}
                      className="text-gray-800 truncate"
                    >
                      {correo}
                    </a>
                  ) : (
                    <span className="text-gray-800 truncate">{correo}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      {/* Compartir */}
      <section className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">
          Comparte communidades con tus conocidos
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Ayúdanos a llegar a más personas que puedan necesitar este espacio.
        </p>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 mt-2 bg-[#F45525] text-white px-5 py-2 rounded-full font-medium hover:bg-[#d9451f] transition"
        >
          <FaShareAlt />
          Compartir
        </button>
      </section>
    </div>
  );
}
