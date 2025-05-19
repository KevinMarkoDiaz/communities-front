import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#FB8500] text-white px-6 py-16 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/20 pb-12">
        {/* Columna: Navegación principal */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Navegación</h3>
          <Link to="/" className="block text-sm hover:underline">
            Inicio
          </Link>
          <Link to="/negocios" className="block text-sm hover:underline">
            Negocios
          </Link>
          <Link to="/eventos" className="block text-sm hover:underline">
            Eventos
          </Link>
          <Link to="/comunidades" className="block text-sm hover:underline">
            Comunidades
          </Link>
        </div>

        {/* Columna: Acerca de */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Institucional</h3>
          <Link to="/about" className="block text-sm hover:underline">
            Sobre nosotros
          </Link>
          <Link to="/contact" className="block text-sm hover:underline">
            Contacto
          </Link>
        </div>

        {/* Columna: Legal */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Legal</h3>
          <Link to="/privacidad" className="block text-sm hover:underline">
            Privacidad
          </Link>
          <Link to="/terminos" className="block text-sm hover:underline">
            Términos
          </Link>
        </div>

        {/* Columna: Redes sociales */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Síguenos</h3>
          <p className="text-sm">
            Conectá con nosotros en nuestras redes sociales
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

      <div className="mt-8 text-center text-sm font-light">
        © {new Date().getFullYear()} Communities. Todos los derechos reservados.
      </div>
    </footer>
  );
}
