import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaAngleRight } from "react-icons/fa6";
import logo3 from "../assets/logo3.svg";
import icono_logo2 from "../assets/icono_logo2.svg";
import { FaTiktok } from "react-icons/fa";
import FadeInOnScroll from "./FadeInOnScroll";

export default function Footer() {
  return (
    <footer className="bg-[#FB8500] text-white mt-auto">
      <div
        className="
          max-w-7xl mx-auto px-6 py-12 
          grid 
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-2
          lg:grid-cols-4
          gap-8 sm:gap-12
        "
      >
        {/* Institucional */}
        <div className="space-y-3 border-white/20 pt-4 lg:border-t-0 lg:border-r lg:border-white/20 lg:pl-6 lg:pr-6">
          <h3 className="text-base font-bold uppercase tracking-wide">
            Institucional
          </h3>
          <ul className="flex flex-col gap-2  text-xs">
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
        <div className="space-y-3  border-white/20 pt-4 lg:border-t-0 lg:border-r lg:border-white/20 lg:pl-6 lg:pr-6">
          <h3 className="text-base font-bold uppercase tracking-wide">Legal</h3>
          <ul className="flex flex-col gap-2  text-xs">
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

        {/* Navegación */}
        <div className="space-y-3 pt-4  border-t lg:border-t-0 border-white/20 lg:border-r lg:pr-6">
          <h3 className="text-base font-bold uppercase tracking-wide">
            Navegación
          </h3>
          <ul className="flex flex-col gap-2  text-xs">
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

        {/* Redes */}
        <div className="space-y-3 border-t border-white/20 pt-4 lg:border-t-0  lg:pl-6">
          <h3 className="text-base font-bold uppercase tracking-wide">
            Síguenos
          </h3>
          <p className="  text-xs leading-snug max-w-xs">
            Conectá con nosotros en redes.
          </p>
          <div className="flex gap-3 flex-wrap pt-1">
            <a
              href="https://www.facebook.com/profile.php?id=61576800572394"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:opacity-80"
            >
              <FaFacebookF className="text-white  text-lg" />
            </a>
            <a
              href="https://www.tiktok.com/@comunnidades_latino?lang=en"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="hover:opacity-80"
            >
              <FaTiktok className="text-white  text-lg" />
            </a>
            <a
              href="https://www.instagram.com/communidades_/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:opacity-80"
            >
              <FaInstagram className="text-white  text-lg" />
            </a>
          </div>
          <p className="text-xs text-white/80 italic hidden md:block">
            "Unidos creamos comunidad y compartimos cultura."
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 my-4 mx-6"></div>

      {/* Logo + Copyright */}
      <div className="flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 py-4 gap-3">
        <FadeInOnScroll direction="up" duration={600} delay={150}>
          <div className="bg-[#141414] hidden md:flex rounded-md p-1.5 items-center shadow-md">
            <img src={logo3} alt="Communities logo" className="h-4 md:h-5" />
          </div>
        </FadeInOnScroll>
        <FadeInOnScroll direction="down" duration={600} delay={200}>
          <div className="bg-black md:hidden flex rounded-md p-1.5 items-center shadow-md transition-transform duration-300 hover:scale-105">
            <img src={icono_logo2} alt="Communities logo" className="h-15" />
          </div>
        </FadeInOnScroll>
        <div className="text-center text-xs font-light text-white/70 md:text-right">
          © {new Date().getFullYear()} communidades. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
