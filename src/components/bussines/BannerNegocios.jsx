export default function BannerNegocios({ scrollToRef }) {
  const handleScroll = () => {
    scrollToRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10 flex justify-center">
      <div className="w-full max-w-5xl rounded-xl overflow-hidden">
        <div
          className="flex flex-col gap-6 sm:gap-8 min-h-[420px] bg-cover bg-center bg-no-repeat items-start justify-end p-6 sm:p-10 rounded-xl"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url("https://cdn.usegalileo.ai/sdxl10/0f80bf0e-864e-4352-ac7e-5f6c83987b80.png")`,
          }}
        >
          <div className="flex flex-col gap-2 text-left text-white">
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
