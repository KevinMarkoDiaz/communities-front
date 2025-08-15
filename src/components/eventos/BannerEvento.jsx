import bannerEVV from "../../assets/comunidadbanner.png";

export default function BannerEvento({ scrollToRef }) {
  const handleScroll = () => {
    scrollToRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="flex justify-center">
      <div className="w-full rounded-xl overflow-hidden relative h-[300px]  md:h-[300px]">
        {/* 🖼 Imagen de fondo */}
        <img
          src={bannerEVV}
          alt="Banner eventos"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 🔲 Capa oscura para contraste */}

        {/* 🧾 Contenido */}
        <div className="relative z-10 flex flex-col gap-6 sm:gap-8 h-full items-start justify-end p-6 sm:p-10 text-white">
          <button
            onClick={handleScroll}
            className="bg-[#f45525] hover:bg-[#e64a1d] transition text-white  text-xs sm:text-base font-bold px-5 py-2 sm:py-3 rounded-full"
          >
            Ver eventos
          </button>
        </div>
      </div>
    </div>
  );
}
