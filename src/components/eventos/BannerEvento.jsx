import bannerEVV from "../../assets/bannerEVV.mp4"; // ✅ Ajustá la ruta si es necesario

export default function BannerEvento({ scrollToRef }) {
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
        {/* 🎥 Video de fondo */}
        <video
          src={bannerEVV}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 🔲 Capa oscura para contraste */}
        <div className="absolute inset-0 " />

        {/* 🧾 Contenido */}
        <div className="relative z-10 flex flex-col gap-6 sm:gap-8 min-h-[420px] items-start justify-end p-6 sm:p-10 text-white rounded-xl">
          <button
            onClick={handleScroll}
            className="w-fit bg-[#fff] hover:bg-[#e64a1d] hover:text-white transition text-[#e64a1d]  text-sm sm:text-base font-bold px-6 py-3 rounded-full shadow-lg mt-4"
          >
            Ver eventos
          </button>
        </div>
      </div>
    </div>
  );
}
