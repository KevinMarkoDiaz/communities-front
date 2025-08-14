// src/components/ads/AdBanner.jsx
import React from "react";

/**
 * AdBanner con soporte responsive:
 * - desktopImage: se usa para >= 1024px
 * - tabletImage:  se usa para >= 640px y < 1024px
 * - mobileImage:  se usa para < 640px
 * - image: fallback (y también para navegadores sin <picture>)
 *
 * Tip: pasá `sizes` si tu contenedor no ocupa 100vw (ej: "728px" o "(min-width:1024px) 728px, 100vw")
 */
export default function AdBanner({
  image, // fallback / default
  desktopImage, // >= 1024px
  tabletImage, // >= 640px
  mobileImage, // < 640px
  link,
  className = "",
  imgClassName = "",
  target = "_blank",
  rel = "noopener noreferrer",
  ariaLabel = "Publicidad",
  onClick,
  sizes = "100vw",
  loading = "lazy",
  decoding = "async",
  debug = false,
}) {
  // Fallback final por si falta alguna variante
  const fallbackSrc = image || desktopImage || tabletImage || mobileImage || "";

  // Loguea qué URL termina cargando el browser
  const handleImgLoad = (e) => {
    if (debug) {
      // currentSrc = la URL realmente usada por el navegador
      console.log("[AdBanner] loaded src:", e.currentTarget.currentSrc);
    }
  };

  const Picture = (
    <picture className="block w-full h-full">
      {/* Orden: de mayor a menor breakpoint (primero las más exigentes) */}
      {desktopImage && (
        <source
          media="(min-width: 1024px)"
          srcSet={desktopImage}
          sizes={sizes}
        />
      )}
      {tabletImage && (
        <source media="(min-width: 640px)" srcSet={tabletImage} sizes={sizes} />
      )}
      {mobileImage && (
        <source media="(max-width: 639px)" srcSet={mobileImage} sizes={sizes} />
      )}

      <img
        src={fallbackSrc}
        alt={ariaLabel}
        className={`max-h-full max-w-full object-contain w-full h-full ${imgClassName}`}
        loading={loading}
        decoding={decoding}
        onLoad={handleImgLoad}
      />
    </picture>
  );

  // Si hay link, envolvemos el <picture> en <a>
  return link ? (
    <a
      href={link}
      target={target}
      rel={rel}
      className={`ads-banner block  transition p-0 ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {Picture}
    </a>
  ) : (
    <div
      className={`ads-banner block  transition p-0 ${className}`}
      aria-label={ariaLabel}
    >
      {Picture}
    </div>
  );
}
