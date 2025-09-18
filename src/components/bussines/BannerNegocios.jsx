import bannerBSS from "../../assets/negociosbanner.jpg";

export default function BannerNegocios({ scrollToRef }) {
  const handleScroll = () => {
    scrollToRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex justify-center">
      <div className="w-full rounded-sm overflow-hidden relative">
        {/* 🖼 Fondo de imagen */}
        <img
          src={bannerBSS}
          alt="Banner negocios"
          className="absolute inset-0 w-full h-[200px] lg:h-full object-cover"
        />

        {/* 🔲 Capa oscura para mejorar contraste */}

        {/* 🧾 Contenido */}
        <div className="relative z-10 flex flex-col gap-6 sm:gap-8 min-h-[200px] items-start justify-end p-6 sm:p-10 text-white">
          <button
            onClick={handleScroll}
            className="bg-[#fff] hover:shadow-xl transition text-black  text-xs sm:text-base font-bold px-5 py-2 sm:py-3 rounded-full"
          >
            Explorar negocios
          </button>
        </div>
      </div>
    </div>
  );
}
