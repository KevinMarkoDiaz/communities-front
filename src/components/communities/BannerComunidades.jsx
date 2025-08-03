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

        {/* 🧾 Contenido */}
        <div className="relative z-10 flex flex-col gap-6 sm:gap-8 min-h-[450px] 2xl:min-h-[480px] items-start justify-end p-6 sm:p-10 text-white"></div>
      </div>
    </div>
  );
}
