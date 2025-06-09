import bannerCMM from "../../assets/bannerCMM.mp4";

export default function BannerComunidades({ scrollToRef }) {
  const handleScroll = () => {
    scrollToRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="flex justify-center">
      <div className="w-full rounded-xl overflow-hidden relative">
        {/* 🎥 Fondo de video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={bannerCMM}
          autoPlay
          muted
          loop
          playsInline
        />

        {/* 🔲 Capa oscura para contraste */}
        <div className="absolute inset-0 bg-black/20" />

        {/* 🧾 Contenido */}
        <div className="relative z-10 flex flex-col gap-6 sm:gap-8 min-h-[420px] items-start justify-end p-6 sm:p-10 text-white">
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-[-0.02em]">
              Más que un lugar, somos quienes lo llenan de vida.
            </h1>
          </div>

          <button
            onClick={handleScroll}
            className="bg-[#f45525] hover:bg-[#e64a1d] transition text-white text-sm sm:text-base font-bold px-5 py-2 sm:py-3 rounded-full"
          >
            Ver comunidades
          </button>
        </div>
      </div>
    </div>
  );
}
