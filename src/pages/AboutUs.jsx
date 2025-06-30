import { Helmet } from "react-helmet-async";
import ilustrA from "../assets/ilusta.svg";
import ilustrB from "../assets/ilustb.svg";
import ilustrC from "../assets/ilustc.svg";

export default function AboutUs() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-24">
      <Helmet>
        <title>Sobre Nosotros | communidades</title>
        <meta
          name="description"
          content="Conoce la historia, valores y misión de communidades. Un puente digital para las comunidades migrantes."
        />
        <meta property="og:title" content="Sobre Nosotros | communidades" />
        <meta
          property="og:description"
          content="Conoce la historia, valores y misión de communidades. Un puente digital para las comunidades migrantes."
        />
        {/* Reemplaza con tu imagen */}
        {/* <meta property="og:image" content="/ruta-de-tu-imagen-og.jpg" /> */}
      </Helmet>

      {/* Hero */}
      <section className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Nuestra Historia</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          <span className="font-semibold text-[#F45525]">communidades</span>{" "}
          nació con una idea sencilla pero poderosa: hacer visible lo invisible.
          Queremos que cada migrante encuentre un espacio donde conectarse con
          su cultura, su gente y los servicios que hacen que un nuevo lugar se
          sienta como <strong>hogar</strong>.
        </p>
      </section>

      {/* Inspiración */}
      <section className="flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2 w-full">
          <img
            src={ilustrA}
            alt="Inspiración"
            className="w-full h-auto rounded-xl"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Inspirados en nuestra propia experiencia
          </h2>
          <p className="text-gray-700">
            Como migrantes, sabemos lo que significa llegar a un país diferente.
            La incertidumbre, la nostalgia, las ganas de pertenecer. Durante
            años vimos cómo negocios y eventos culturales pasaban desapercibidos
            porque no existía un espacio que los reuniera.
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-[#F45525]">communidades</span>{" "}
            surge para cambiar eso. Creemos en la fuerza de la{" "}
            <strong>comunidad</strong>, en la solidaridad que nos une y en el
            poder de la información compartida.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Nuestros Valores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Cercanía",
              text: "Queremos que cada usuario sienta que aquí encuentra un aliado y un lugar seguro.",
            },
            {
              title: "Visibilidad",
              text: "Damos espacio a negocios, servicios y organizaciones que merecen ser descubiertos.",
            },
            {
              title: "Inclusión",
              text: "Celebramos la diversidad cultural que hace únicas a nuestras comunidades.",
            },
            {
              title: "Confianza",
              text: "Somos un puente digital confiable, con información actualizada y relevante.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="bg-gray-50 p-5 rounded-xl shadow-sm space-y-2"
            >
              <h3 className="font-semibold text-gray-800 mb-1">
                <strong>{v.title}</strong>
              </h3>
              <p className="text-gray-700">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="flex flex-col md:flex-row-reverse gap-12 items-center">
        <div className="md:w-1/2 w-full">
          <img
            src={ilustrB}
            alt="Misión y Visión"
            className="w-full h-auto rounded-xl"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Misión y Visión
          </h2>
          <p className="text-gray-700">
            Nuestra misión es{" "}
            <strong>conectar a las comunidades migrantes</strong> con su
            cultura, sus servicios y entre sí, fortaleciendo su identidad y
            bienestar.
          </p>
          <p className="text-gray-700">
            Nuestra visión es consolidarnos como la plataforma digital de
            referencia para migrantes en Estados Unidos y Europa, siendo un
            espacio de <strong>integración, confianza y apoyo cultural</strong>.
          </p>
        </div>
      </section>

      {/* Cifras */}
      <section className="text-center space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Nuestro impacto
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { number: "+100", label: "Negocios registrados" },
            { number: "+500", label: "Usuarios activos" },
            { number: "+10", label: "Alianzas comunitarias" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-[#F45525]">{stat.number}</p>
              <p className="text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compromiso Social */}
      <section className="flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2 w-full">
          <img
            src={ilustrC}
            alt="Compromiso Social"
            className="w-full h-auto rounded-xl"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Nuestro Compromiso Social
          </h2>
          <p className="text-gray-700">
            <span className="font-semibold text-[#F45525]">communidades</span>{" "}
            no es solo un directorio. Es un proyecto con alma social que busca
            reforzar los lazos de pertenencia, promover la participación
            ciudadana y difundir la cultura de quienes llegaron con sueños
            nuevos.
          </p>
          <p className="text-gray-700">
            Colaboramos con organizaciones, consulados, medios comunitarios y
            asociaciones culturales para que la información llegue a quienes más
            la necesitan.
          </p>
        </div>
      </section>

      {/* Testimonios */}
      <section className="text-center space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Lo que dicen nuestros usuarios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              quote:
                "Gracias a communidades descubrí negocios colombianos en Dallas que ahora visito cada semana.",
              author: "María G.",
            },
            {
              quote:
                "Una plataforma confiable que me ayudó a sentirme en casa desde el primer día.",
              author: "Juan P.",
            },
          ].map((t, i) => (
            <blockquote
              key={i}
              className="bg-gray-50 p-5 rounded-xl shadow-sm text-gray-700 italic"
            >
              “{t.quote}”
              <footer className="mt-2 font-semibold text-gray-800 not-italic">
                – {t.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Equipo */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Quién está detrás
        </h2>
        <div className="max-w-md mx-auto space-y-2">
          <p className="text-gray-700">
            Somos un <strong>equipo de migrantes</strong> que compartimos la
            misma visión: crear un espacio donde todas las personas puedan
            sentirse más cerca de casa, sin importar de dónde vengan.
          </p>
          <p className="text-gray-700">
            <span className="font-semibold text-[#F45525]">communidades</span>{" "}
            nace del deseo de tender puentes, compartir lo que nos une y
            visibilizar todo aquello que hace valiosa nuestra diversidad
            cultural.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          ¿Quieres impulsar este proyecto?
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Buscamos <strong>auspiciantes</strong>, empresas con propósito social
          y ONG que deseen aportar valor real a las comunidades migrantes. Si
          crees en nuestra visión, súmate y ayúdanos a dar vida a{" "}
          <span className="font-semibold text-[#F45525]">communidades</span>.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <a
            href="/contact"
            className="bg-[#F45525] text-white px-5 py-2 rounded-full font-medium hover:bg-[#d9451f] transition"
          >
            Contáctanos
          </a>
          <a
            href="/negocios"
            className="border border-[#F45525] text-[#F45525] px-5 py-2 rounded-full font-medium hover:bg-[#f4552511] transition"
          >
            Explora negocios
          </a>
        </div>
      </section>
    </div>
  );
}
