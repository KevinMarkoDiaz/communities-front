import { useState } from "react";
import {
  FaFacebookF,
  FaWhatsapp,
  FaTwitter,
  FaLink,
  FaShareAlt,
} from "react-icons/fa";

export default function Compartir({
  url,
  title = "Mirá esto en Communities",
  text = "",
}) {
  const [copiado, setCopiado] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error("No se pudo copiar el enlace", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: text || title,
          url,
        });
      } catch (err) {
        console.error("Error usando Web Share API:", err);
      }
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const showNativeShare = typeof window !== "undefined" && navigator.share;

  return (
    <div className="w-full bg-white ">
      <h2 className="text-gray-900 text-base sm:text-lg font-semibold mb-4">
        Compartilo con alguien — juntos creamos comunidad{" "}
      </h2>

      <div className="flex flex-wrap items-center gap-3 text-xl sm:text-2xl">
        {showNativeShare ? (
          <button
            onClick={handleNativeShare}
            className="rounded-full p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black transition"
            title="Compartir desde tu dispositivo"
          >
            <FaShareAlt />
          </button>
        ) : (
          <>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-3 bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800 transition"
              title="Compartir en Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-3 bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-800 transition"
              title="Compartir en WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-3 bg-sky-100 hover:bg-sky-200 text-sky-600 hover:text-sky-800 transition"
              title="Compartir en X"
            >
              <FaTwitter />
            </a>
          </>
        )}

        <button
          onClick={handleCopy}
          className="rounded-full p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black transition"
          title="Copiar enlace"
        >
          <FaLink />
        </button>

        {copiado && (
          <span className="text-sm text-green-600 font-medium ml-1 animate-fade-in">
            ¡Enlace copiado!
          </span>
        )}
      </div>
    </div>
  );
}
