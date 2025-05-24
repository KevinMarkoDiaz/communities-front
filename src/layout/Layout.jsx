import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StickyAds from "../components/StickyAds"; // nuevo componente
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  const hiddenAdsRoutes = ["/login", "/register", "/dashboard"];
  const hideAds = hiddenAdsRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {!hideAds && (
        <div className="w-full bg-gray-100 text-center py-2">
          <div className="ads-banner h-[90px] bg-gray-200 flex items-center justify-center text-sm text-gray-500 border border-dashed">
            Publicidad Top
          </div>
        </div>
      )}

      <main className="flex w-full max-w-[95%] lg:max-w-[80%] mx-auto gap-4 flex-grow">
        <div className="flex-1 flex flex-col gap-12 py-8 overflow-hidden">
          <Outlet />
        </div>

        {!hideAds && <StickyAds />}
      </main>
      {!hideAds && (
        <div className="w-full bg-gray-100 text-center py-2">
          <div className="ads-banner h-[90px] bg-gray-200 flex items-center justify-center text-sm text-gray-500 border border-dashed">
            Publicidad Intermedia
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
