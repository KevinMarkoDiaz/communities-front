import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaAngleRight,
} from "react-icons/fa6";
import logo3 from "../assets/logo3.svg";

export default function Footer() {
  return (
    <footer className="bg-[#FB8500] text-white mt-auto">
      <div
        className="max-w-7xl mx-auto px-6 py-12 grid gap-8 sm:gap-12"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        {/* Navegación */}
        <div className="space-y-3 lg:border-r lg:border-white/20 lg:pr-6">
          <h3 className="text-base font-bold uppercase tracking-wide">
            Navegación
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            {[
              { to: "/", label: "Inicio" },
              { to: "/negocios", label: "Negocios" },
              { to: "/eventos", label: "Eventos" },
              { to: "/comunidades", label: "Comunidades" },
              { to: "/promociones", label: "Promos" },
            ].map((item) => (
              <li key={item.to} className="flex items-center gap-2">
                <FaAngleRight className="text-xs" />
                <Link to={item.to} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Institucional */}
        <div className="space-y-3 border-t border-white/20 pt-4 lg:border-t-0 lg:border-r lg:border-white/20 lg:pl-6 lg:pr-6">
          <h3 className="text-base font-bold uppercase tracking-wide">
            Institucional
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/about" className="hover:underline">
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-3 border-t border-white/20 pt-4 lg:border-t-0 lg:border-r lg:border-white/20 lg:pl-6 lg:pr-6">
          <h3 className="text-base font-bold uppercase tracking-wide">Legal</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link to="/legal-privacy" className="hover:underline">
                Privacidad
              </Link>
            </li>
            <li>
              <Link to="/legal-terms" className="hover:underline">
                Términos
              </Link>
            </li>
          </ul>
        </div>

        {/* Redes */}
        <div className="space-y-3 border-t border-white/20 pt-4 lg:border-t-0 lg:pl-6">
          <h3 className="text-base font-bold uppercase tracking-wide">
            Síguenos
          </h3>
          <p className="text-sm leading-snug">
            Conectá con nosotros en nuestras redes
          </p>
          <div className="flex gap-4 pt-1">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:opacity-80"
            >
              <FaFacebookF className="text-white text-xl" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="hover:opacity-80"
            >
              <FaXTwitter className="text-white text-xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:opacity-80"
            >
              <FaInstagram className="text-white text-xl" />
            </a>
          </div>
          <p className="text-xs text-white/80 mt-4 italic">
            "Unidos creamos comunidad, compartimos cultura y crecemos juntos."
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 my-4 mx-6"></div>

      {/* Logo + Copyright */}
      <div className="flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 py-4 gap-3">
        <div className="bg-[#141414] rounded-md p-1.5 flex items-center">
          <img src={logo3} alt="Communities logo" className="h-4 md:h-5" />
        </div>
        <div className="text-center text-xs font-light text-white/70 md:text-right">
          © {new Date().getFullYear()} communidades. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
