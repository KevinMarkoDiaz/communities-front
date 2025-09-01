import { Helmet } from "react-helmet-async";
import CrearBanner from "./CrearBanner";
import authBg from "../../../assets/authbg.png";
import ilust2 from "../../../assets/ilust2.svg";

export default function CrearBannerView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2 gap-8 md:mt-8 lg:mt-16">
      <Helmet>
        <title>Crear Banner | Communidades</title>
      </Helmet>

      <section
        className="relative w-full max-w-4xl shadow-xl rounded-2xl md:p-6 sm:p-16 space-y-6 overflow-hidden"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl h-full"></div>

        <div className="relative space-y-6 grid gap-8">
          <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap p-4">
            <div className="flex-1 space-y-2">
              <h1 className="text-2xl font-bold text-black">Crear Banner</h1>
              <p className="text-gray-700  text-xs sm:text-base">
                Sube el arte y configura la segmentación, vigencia y límites del
                anuncio ✨
              </p>
            </div>
            <img
              src={ilust2}
              alt="Ilustración"
              className="w-36 xl:w-52 opacity-90"
            />
          </div>

          <CrearBanner />
        </div>
      </section>
    </div>
  );
}
