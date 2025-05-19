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
      <div className="w-full max-w-5xl rounded-xl overflow-hidden">
        <div
          className="flex flex-col gap-6 sm:gap-8 min-h-[420px] bg-cover bg-center bg-no-repeat items-start justify-end p-6 sm:p-10 rounded-xl text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url("https://cdn.usegalileo.ai/sdxl10/d165a828-d75c-4cc1-902a-3c807410ddcf.png")`,
          }}
        >
          <div className="flex flex-col gap-2 max-w-xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Celebrá lo que te conecta.
            </h1>
            <p className="text-sm sm:text-base font-normal leading-relaxed">
              Eventos que reúnen culturas, personas y memorias en un solo lugar.
            </p>
          </div>

          <button
            onClick={handleScroll}
            className="bg-[#f45525] hover:bg-[#e64a1d] transition text-white text-sm sm:text-base font-bold px-6 py-3 rounded-full shadow-lg mt-4"
          >
            Ver eventos
          </button>
        </div>
      </div>
    </div>
  );
}
