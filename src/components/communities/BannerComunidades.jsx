import bannerCMM from "../../assets/bannerCMM.mp4"; // ✅ Ajustar ruta según tu estructura

export default function BannerComunidades({ scrollToRef }) {
  const handleScroll = () => {
    if (scrollToRef?.current) {
      scrollToRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10 flex justify-center">
      <div className="w-full max-w-5xl rounded-xl overflow-hidden relative">
        {/* 🎥 Fondo de video */}
        <video
          src={bannerCMM}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 🔲 Capa oscura para contraste */}
        <div className="absolute inset-0 " />

        {/* 🧾 Contenido */}
        <div className="relative z-10 p-6 flex flex-col justify-end min-h-[420px]">
          <p className="text-white text-2xl sm:text-2xl font-bold leading-tight tracking-tight max-w-xl">
            Más que un lugar, somos quienes lo llenan de vida.
          </p>

          <button
            onClick={handleScroll}
            className="w-fit mt-6 bg-[#f45525] hover:bg-[#e64a1d] text-white text-sm sm:text-base font-bold px-6 py-3 rounded-full shadow-lg"
          >
            Ver comunidades
          </button>
        </div>
      </div>
    </div>
  );
}
