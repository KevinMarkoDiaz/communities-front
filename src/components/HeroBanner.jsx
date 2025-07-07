import bn1 from "../../src/assets/bn1.svg";
import bn2 from "../../src/assets/bn2.svg";
import { useEffect, useState } from "react";

export default function HeroBanner({ onBuscar }) {
  const images = [bn1, bn2];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="@container">
      <div className="@[480px]">
        <div
          className="flex min-h-[500px] flex-col gap-6 @[480px]:gap-8 rounded-xl items-center justify-center p-4 bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{
            backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.1),
              rgba(0, 0, 0, 0.4)
            ), url("${images[currentIndex]}")`,
          }}
        >
          <h1 className="text-white text-4xl font-black text-center tracking-[-0.033em] @[480px]:text-5xl">
            Find the best local businesses, events, and news
          </h1>

          <div className="w-full max-w-[480px]">{onBuscar && onBuscar()}</div>
        </div>
      </div>
    </div>
  );
}
