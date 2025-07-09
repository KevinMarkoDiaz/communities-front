import AdBanner from "./ads/AdBanner";

export default function StickyAds() {
  return (
    <aside className="hidden lg:flex flex-col w-[300px] min-h-full gap-6 lg:w-[200px] xl:w-[240px] 2xl:w-[280px]">
      {[1, 2].map((_, index) => (
        <div key={index} className="flex-1 min-h-screen relative">
          <div className="sticky top-[96px] p-2">
            <AdBanner
              // Si aún no tienes anuncio real, déjalo sin props
              // Puedes usar className para un fondo amarillo-naranja
              className="bg-gradient-to-r from-yellow-50 to-orange-100 h-[250px]"
            />
          </div>
        </div>
      ))}
    </aside>
  );
}
