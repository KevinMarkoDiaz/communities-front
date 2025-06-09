import bannerEVV from "../../assets/bannerEVV.mp4";

export default function BannerEvento({ scrollToRef }) {
  const handleScroll = () => {
    scrollToRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="flex justify-center">
      <div className="w-full rounded-xl overflow-hidden relative">
        {/* 🎥 Video de fondo */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={bannerEVV}
          autoPlay
          muted
          playsInline
        />

        {/* 🔲 Capa oscura para contraste */}
        <div className="absolute inset-0 bg-black/20" />

        {/* 🧾 Contenido */}
        <div className="relative z-10 flex flex-col gap-6 sm:gap-8 min-h-[420px] items-start justify-end p-6 sm:p-10 text-white">
          <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-[-0.02em]">
            Celebrá tu identidad. Unite a experiencias que inspiran.
          </h1>

          <button
            onClick={handleScroll}
            className="bg-[#f45525] hover:bg-[#e64a1d] transition text-white text-sm sm:text-base font-bold px-5 py-2 sm:py-3 rounded-full"
          >
            Ver eventos
          </button>
        </div>
      </div>
    </div>
  );
}
