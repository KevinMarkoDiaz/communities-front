import bannerCMM from "../../assets/eventosbanner.png";

export default function BannerComunidades({ scrollToRef }) {
  const handleScroll = () => {
    scrollToRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="w-full">
      <div className="relative w-full rounded-xl overflow-hidden h-[250px]  md:h-[300px]">
        {/* 🖼 Imagen de fondo */}
        <img
          src={bannerCMM}
          alt="Banner comunidades"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 🔲 Capa oscura para contraste */}
        <div className="absolute inset-0 bg-black/10 z-10" />

        {/* 🧾 Contenido encima de la imagen */}
      </div>
    </div>
  );
}
