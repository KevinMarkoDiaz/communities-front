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
    <div className="w-full bg-white px-4 py-5">
      <h2 className="text-gray-900 text-lg font-semibold mb-3">Compartir</h2>
      <div className="flex flex-wrap items-center gap-4 text-xl">
        {showNativeShare ? (
          <button
            onClick={handleNativeShare}
            className="text-gray-600 hover:text-black"
            title="Compartir"
          >
            <FaShareAlt />
          </button>
        ) : (
          <>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
              title="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-700"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 hover:text-sky-700"
              title="X"
            >
              <FaTwitter />
            </a>
          </>
        )}

        <button
          onClick={handleCopy}
          className="text-gray-600 hover:text-black"
          title="Copiar enlace"
        >
          <FaLink />
        </button>

        {copiado && (
          <span className="text-sm text-green-600 ml-2">¡Enlace copiado!</span>
        )}
      </div>
    </div>
  );
}
