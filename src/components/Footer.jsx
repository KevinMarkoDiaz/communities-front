import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#FB8500] text-white px-6 py-12 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 border-b border-white/20 pb-10">
        {/* Navegación */}
        <div className="space-y-3">
          <h3 className="text-base font-bold uppercase tracking-wide">
            Navegación
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link to="/" className="hover:underline">
              Inicio
            </Link>
            <Link to="/negocios" className="hover:underline">
              Negocios
            </Link>
            <Link to="/eventos" className="hover:underline">
              Eventos
            </Link>
            <Link to="/comunidades" className="hover:underline">
              Comunidades
            </Link>
            <Link to="/promociones" className="hover:underline">
              Promos
            </Link>
          </div>
        </div>

        {/* Institucional */}
        <div className="space-y-3">
          <h3 className="text-base font-bold uppercase tracking-wide">
            Institucional
          </h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/about" className="hover:underline">
              Sobre nosotros
            </Link>
            <Link to="/contact" className="hover:underline">
              Contacto
            </Link>
          </div>
        </div>

        {/* Legal */}
        <div className="space-y-3">
          <h3 className="text-base font-bold uppercase tracking-wide">Legal</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/legal-privacy" className="hover:underline">
              Privacidad
            </Link>
            <Link to="/legal-terms" className="hover:underline">
              Términos
            </Link>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="space-y-3">
          <h3 className="text-base font-bold uppercase tracking-wide">
            Síguenos
          </h3>
          <p className="text-sm leading-snug">
            Conectá con nosotros en nuestras redes
          </p>
          <div className="flex gap-5 pt-1">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:opacity-80"
            >
              <FaFacebookF className="text-white text-2xl" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="hover:opacity-80"
            >
              <FaXTwitter className="text-white text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:opacity-80"
            >
              <FaInstagram className="text-white text-2xl" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm font-light">
        © {new Date().getFullYear()} Communities. Todos los derechos reservados.
      </div>
    </footer>
  );
}
