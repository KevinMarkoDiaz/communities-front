export default function BannerComunidades({ scrollToRef }) {
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
          className="relative flex flex-col justify-end min-h-[420px] bg-cover bg-center bg-no-repeat rounded-xl"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 25%), url("https://cdn.usegalileo.ai/sdxl10/d267c6dc-0566-41eb-a965-a7a4f063b026.png")`,
          }}
        >
          <div className="p-6">
            <p className="text-white text-3xl sm:text-4xl font-bold leading-tight tracking-tight max-w-xl">
              Más que un lugar, somos quienes lo llenan de vida.
            </p>
            <p className="text-white mt-2 text-sm sm:text-base font-normal max-w-xl leading-relaxed">
              Conectá con comunidades latinas que comparten tu historia, tu
              idioma y tu esencia.
            </p>

            <button
              onClick={handleScroll}
              className="mt-6 bg-[#f45525] hover:bg-[#e64a1d] text-white text-sm sm:text-base font-bold px-6 py-3 rounded-full shadow-lg"
            >
              Ver comunidades
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
