import { useEffect, useRef, useState } from "react";
import bn1 from "../../src/assets/bn1.svg";
import bn2 from "../../src/assets/bn2.svg";

export default function HeroBanner({ onBuscar }) {
  const images = [bn1, bn2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const imgRef = useRef();
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Comienza fade out
      setOpacity(0);

      // Espera el fade out antes de cambiar imagen
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        // Fade in
        setOpacity(1);
      }, 500); // 500ms fade out
    }, 7000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div className="@container">
      <div className="@[480px] relative overflow-hidden rounded-xl min-h-[500px]">
        {/* Imagen única con transición */}
        <img
          ref={imgRef}
          src={images[currentIndex]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{
            opacity,
          }}
        />

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />

        {/* Contenido */}
        <div className="relative z-10 flex flex-col gap-6 @[480px]:gap-8 items-center justify-center p-4 h-full">
          <h1 className="text-white text-4xl font-black text-center tracking-[-0.033em] @[480px]:text-5xl">
            Descubre los mejores negocios, eventos y novedades de tu comunidad
          </h1>
          <div className="w-full max-w-[480px]">{onBuscar && onBuscar()}</div>
        </div>
      </div>
    </div>
  );
}
