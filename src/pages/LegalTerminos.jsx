import { Helmet } from "react-helmet-async";
import ilustg from "../assets/ilustg.svg";
import FadeInOnScroll from "../components/FadeInOnScroll";

export default function LegalTerminos() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16 grid md:gap-18">
      <Helmet>
        <title>Términos y Condiciones | communidades</title>
        <meta
          name="description"
          content="Lee nuestros términos y condiciones de uso de la plataforma communidades. Tu confianza es importante para nosotros."
        />
      </Helmet>

      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Términos y Condiciones
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Al utilizar{" "}
          <span className="font-semibold text-[#F45525]">communidades</span>,
          aceptas estos términos de uso. Te invitamos a leerlos detenidamente
          para que sepas cómo funciona nuestra plataforma.
        </p>
      </section>

      {/* Imagen y texto combinados */}
      <section className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2 w-full">
          <FadeInOnScroll direction="left" duration={900} delay={300}>
            <img
              src={ilustg}
              alt="Términos y condiciones"
              className="w-full h-auto rounded-xl "
            />
          </FadeInOnScroll>
        </div>
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Uso de la Plataforma
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>
              El contenido publicado (textos, imágenes, datos) es
              responsabilidad exclusiva de cada usuario o negocio que lo
              comparta.
            </li>
            <li>
              No se permite el uso de{" "}
              <span className="font-semibold text-[#F45525]">communidades</span>{" "}
              con fines ilegales, fraudulentos, difamatorios o que infrinjan
              derechos de terceros.
            </li>
            <li>
              Nos reservamos el derecho de editar, moderar o eliminar cualquier
              contenido que consideremos inadecuado u ofensivo.
            </li>
            <li>
              Podemos suspender cuentas que incumplan reiteradamente estas
              normas.
            </li>
          </ul>
        </div>
      </section>

      {/* Derechos de Propiedad Intelectual */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Derechos de Propiedad Intelectual
        </h2>
        <p className="text-gray-700">
          Todos los contenidos, logotipos, marcas, nombres comerciales,
          ilustraciones, textos, imágenes y diseños que aparecen en{" "}
          <span className="font-semibold text-[#F45525]">communidades</span>{" "}
          están protegidos por derechos de propiedad intelectual e industrial, y
          pertenecen a sus respectivos titulares o a la plataforma, salvo que se
          indique expresamente lo contrario.
        </p>
        <p className="text-gray-700">
          El uso de los contenidos de la plataforma con fines distintos a la
          consulta, promoción legítima o difusión de los servicios ofrecidos por{" "}
          <span className="font-semibold text-[#F45525]">communidades</span>{" "}
          requiere la autorización previa y por escrito de sus propietarios. En
          ningún caso se entenderá que el acceso a la plataforma otorga licencia
          o cesión de dichos derechos.
        </p>
        <p className="text-gray-700">
          Queda expresamente prohibido reproducir, copiar, distribuir,
          transformar, comunicar públicamente, extraer o reutilizar cualquier
          contenido protegido sin consentimiento expreso, total o parcial, por
          cualquier medio o procedimiento.
        </p>
        <p className="text-gray-700">
          Los usuarios que suban contenidos (por ejemplo: textos, imágenes,
          logotipos o cualquier material) garantizan que son titulares de los
          derechos de explotación sobre dichos contenidos o que cuentan con las
          autorizaciones necesarias para su uso en la plataforma.{" "}
          <span className="font-semibold text-[#F45525]">communidades</span> no
          se hace responsable de los posibles conflictos que puedan derivarse
          por un uso indebido de derechos de terceros.
        </p>
        <p className="text-gray-700">
          Si consideras que algún contenido vulnera tus derechos de autor, de
          imagen o de propiedad industrial, puedes escribirnos a{" "}
          <a
            href="mailto:info@communidades.com"
            className="text-[#F45525] font-medium"
          >
            info@communidades.com
          </a>{" "}
          indicando la información necesaria para analizar la situación. Nos
          comprometemos a revisar y atender cualquier reclamación con la mayor
          diligencia posible.
        </p>
      </section>

      {/* Modificaciones */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Modificaciones de los Términos
        </h2>
        <p className="text-gray-700">
          Nos reservamos el derecho de actualizar estos términos y condiciones
          en cualquier momento. Si realizamos cambios relevantes, se notificará
          en la plataforma o por correo electrónico.
        </p>
        <p className="text-gray-700">
          El uso continuado de la plataforma implica la aceptación de los nuevos
          términos.
        </p>
      </section>

      {/* Suspensión */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Suspensión y Terminación
        </h2>
        <p className="text-gray-700">
          Podemos suspender o cerrar tu cuenta si detectamos un uso que vaya en
          contra de estos términos, si es fraudulento o si afecta negativamente
          a la comunidad.
        </p>
      </section>

      {/* Contacto */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Contacto Legal</h2>
        <p className="text-gray-700">
          Si tienes dudas sobre estos términos, tu cuenta o cualquier aspecto
          legal, puedes escribirnos a{" "}
          <a
            href="mailto:info@communidades.com"
            className="text-[#F45525] font-medium"
          >
            info@communidades.com
          </a>
          . Estamos aquí para ayudarte con transparencia y respeto.
        </p>
      </section>
    </div>
  );
}
