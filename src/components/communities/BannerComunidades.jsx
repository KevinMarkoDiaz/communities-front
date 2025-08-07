import bannerCMM from "../../assets/bannerCMM.mp4";

export default function BannerComunidades({ scrollToRef }) {
  const handleScroll = () => {
    scrollToRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="w-full">
      <div className="relative w-full rounded-xl overflow-hidden aspect-[3/1] sm:aspect-[3/1.2] md:aspect-[16/6]">
        {/* 🎥 Video de fondo */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={bannerCMM}
          autoPlay
          muted
          loop
          playsInline
        />

        {/* 🔲 Capa oscura para contraste */}
        <div className="absolute inset-0 bg-black/10 z-10" />

        {/* 🧾 Contenido encima del video */}
      </div>
    </div>
  );
}
