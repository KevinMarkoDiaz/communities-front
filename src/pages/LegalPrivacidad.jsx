import { Helmet } from "react-helmet-async";
import iluste from "../assets/iluste.svg";
import ilustf from "../assets/ilustf.svg";
import FadeInOnScroll from "../components/FadeInOnScroll";

export default function LegalPrivacidad() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-16 grid md:gap-22">
      <Helmet>
        <title>Legal y Privacidad | communidades</title>
        <meta
          name="description"
          content="Lee nuestras políticas de privacidad, uso y condiciones de communidades. Tu confianza es importante para nosotros."
        />
      </Helmet>

      {/* Hero */}
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Legal y Privacidad</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          En <span className="font-semibold text-[#F45525]">communidades</span>{" "}
          nos importa tu tranquilidad y confianza. Aquí te contamos de forma
          clara cómo usamos tu información y cuáles son tus derechos al usar
          nuestra plataforma.
        </p>
      </section>

      {/* Política de Privacidad + Ilustración */}
      <section className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2 space-y-3">
          <h2 className="text-2xl font-semibold text-gray-900">
            Política de Privacidad
          </h2>
          <p className="text-gray-700">
            Solo recopilamos la información estrictamente necesaria para que
            puedas crear tu cuenta, interactuar con otros usuarios y publicar
            tus negocios, eventos o iniciativas.
          </p>
          <p className="text-gray-700">
            Tus datos personales no se venderán ni compartirán con terceros sin
            tu consentimiento, salvo obligación legal.
          </p>
          <p className="text-gray-700">
            Puedes solicitar en cualquier momento la eliminación de tu
            información enviando un correo a{" "}
            <a
              href="mailto:info@communidades.com"
              className="text-[#F45525] font-medium"
            >
              info@communidades.com
            </a>
            .
          </p>
          <p className="text-gray-700">
            Utilizamos cookies y tecnologías similares para mejorar tu
            experiencia. Si preferís, podés desactivarlas desde tu navegador o
            configurar tus preferencias desde el modal de cookies.
          </p>
        </div>
        <div className="md:w-1/2 w-full flex justify-center">
          <FadeInOnScroll direction="right" duration={600} delay={100}>
            <img
              src={iluste}
              alt="Protección de datos"
              className="max-w-xs w-full h-auto rounded-xl"
            />
          </FadeInOnScroll>
        </div>
      </section>

      {/* Tabla de Cookies */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          ¿Qué cookies usamos?
        </h2>
        <p className="text-gray-700">
          A continuación te mostramos un resumen de las cookies que podemos usar
          en nuestra plataforma:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left  text-xs border border-gray-200">
            <thead className="bg-gray-100 text-gray-900">
              <tr>
                <th className="px-4 py-2 border">Tipo</th>
                <th className="px-4 py-2 border">Descripción</th>
                <th className="px-4 py-2 border">Ejemplos</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr>
                <td className="px-4 py-2 border">Esenciales</td>
                <td className="px-4 py-2 border">
                  Necesarias para el funcionamiento básico del sitio.
                </td>
                <td className="px-4 py-2 border">sessionId, authToken</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Analíticas</td>
                <td className="px-4 py-2 border">
                  Nos ayudan a entender cómo se usa la plataforma.
                </td>
                <td className="px-4 py-2 border">Google Analytics</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Publicidad</td>
                <td className="px-4 py-2 border">
                  Utilizadas para mostrar anuncios relevantes.
                </td>
                <td className="px-4 py-2 border">Google Ads</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Terceros</td>
                <td className="px-4 py-2 border">
                  Cookies usadas por servicios externos integrados.
                </td>
                <td className="px-4 py-2 border">Mapbox (mapas)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Términos de Uso */}
      <section className="flex flex-col md:flex-row-reverse gap-8 items-center">
        <div className="md:w-1/2 space-y-3">
          <h2 className="text-2xl font-semibold text-gray-900">
            Términos de Uso
          </h2>
          <p className="text-gray-700">
            Al usar{" "}
            <span className="font-semibold text-[#F45525]">communidades</span>,
            aceptás hacerlo de forma respetuosa y conforme a las leyes vigentes.
          </p>
          <p className="text-gray-700">
            Nos reservamos el derecho de moderar, editar o eliminar contenido
            que consideremos ofensivo, falso, discriminatorio o que infrinja
            derechos de terceros.
          </p>
          <p className="text-gray-700">
            Las publicaciones y opiniones expresadas por los usuarios son de su
            exclusiva responsabilidad.
          </p>
        </div>
        <div className="md:w-1/2 w-full flex justify-center">
          <FadeInOnScroll direction="left" duration={2000} delay={900}>
            <img
              src={ilustf}
              alt="Términos y condiciones"
              className="max-w-xs w-full h-auto rounded-xl"
            />
          </FadeInOnScroll>
        </div>
      </section>

      {/* Cambios en la Política */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">
          Cambios y Actualizaciones
        </h2>
        <p className="text-gray-700">
          Estas políticas pueden actualizarse en cualquier momento para reflejar
          cambios en la ley, mejoras del servicio o nuevas funciones.
        </p>
        <p className="text-gray-700">
          Te informaremos si realizamos modificaciones relevantes a través de un
          aviso en la plataforma o por correo electrónico.
        </p>
      </section>

      {/* Limitación de Responsabilidad */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">
          Limitación de Responsabilidad
        </h2>
        <p className="text-gray-700">
          Aunque hacemos todo lo posible por mantener actualizada y precisa la
          información publicada en{" "}
          <span className="font-semibold text-[#F45525]">communidades</span>, no
          garantizamos su exactitud completa. El uso de la plataforma es bajo tu
          propia responsabilidad.
        </p>
        <p className="text-gray-700">
          No nos hacemos responsables de daños directos o indirectos derivados
          del uso o imposibilidad de uso de la plataforma.
        </p>
      </section>

      {/* Contacto */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">Contacto Legal</h2>
        <p className="text-gray-700">
          Si tenés preguntas sobre tu privacidad, nuestras políticas o el uso de
          tu información, podés escribirnos a{" "}
          <a
            href="mailto:info@communidades.com"
            className="text-[#F45525] font-medium"
          >
            info@communidades.com
          </a>
          . Estamos acá para ayudarte con transparencia y respeto.
        </p>
      </section>
    </div>
  );
}
