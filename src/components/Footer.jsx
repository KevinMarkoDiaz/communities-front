import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-6 px-5 py-10 text-center text-[#8a7560] bg-[#F8F9FB] mt-auto">
      {/* Enlaces */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:flex-row md:justify-around">
        <Link to="/about" className="text-base font-normal min-w-40">
          Sobre nosotros
        </Link>
        <Link to="/contact" className="text-base font-normal min-w-40">
          Contacto
        </Link>
        <Link to="/privacidad" className="text-base font-normal min-w-40">
          Política de privacidad
        </Link>
        <Link to="/terminos" className="text-base font-normal min-w-40">
          Términos de servicio
        </Link>
      </div>

      {/* Redes sociales */}
      <div className="flex flex-wrap justify-center gap-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
        >
          <FaFacebookF className="text-[#8a7560] text-xl hover:text-blue-600 transition" />
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
        >
          <FaXTwitter className="text-[#8a7560] text-xl hover:text-black transition" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram className="text-[#8a7560] text-xl hover:text-pink-500 transition" />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-base font-normal">
        © {new Date().getFullYear()} Communities. Todos los derechos reservados.
      </p>
    </footer>
  );
}
