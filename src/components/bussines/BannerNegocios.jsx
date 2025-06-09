import bannerBSS from "../../assets/bannerBSS.mp4";

export default function BannerNegocios({ scrollToRef }) {
  const handleScroll = () => {
    scrollToRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex justify-center">
      <div className="w-fullrounded-xl overflow-hidden relative">
        {/* 🎥 Fondo de video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={bannerBSS}
          autoPlay
          muted
          playsInline
        />

        {/* 🔲 Capa oscura para mejorar contraste */}
        <div className="absolute inset-0 bg-black/20" />

        {/* 🧾 Contenido */}
        <div className="relative z-10 flex flex-col gap-6 sm:gap-8 min-h-[420px] items-start justify-end p-6 sm:p-10 text-white">
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-[-0.02em]">
              Apoyá lo nuestro. Descubrí negocios que llevan tu cultura en el
              corazón.
            </h1>
            <h2 className="text-sm sm:text-base font-normal leading-normal">
              Descubrí miles de negocios locales de propietarios migrantes y
              apoyá a la gente que comparte tus raíces.
            </h2>
          </div>

          <button
            onClick={handleScroll}
            className="bg-[#f45525] hover:bg-[#e64a1d] transition text-white text-sm sm:text-base font-bold px-5 py-2 sm:py-3 rounded-full"
          >
            Explorar negocios
          </button>
        </div>
      </div>
    </div>
  );
}
