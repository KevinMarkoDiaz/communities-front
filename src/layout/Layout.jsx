import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StickyAds from "../components/StickyAds";
import { Outlet, useLocation } from "react-router-dom";
import CookieConsentModal from "../components/CookieConsentModal";
import { useEffect } from "react";
import { useInitData } from "../hooks/useInitData";

export default function Layout() {
  const location = useLocation();

  useInitData();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  const hiddenAdsRoutes = [
    "/login",
    "/register",
    "/dashboard",
    "/premium",
    "/suscribirse",
    "/suscripcion-exitosa",
    "/suscripcion-cancelada",
  ];
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

      <main className="flex w-full max-w-full xl:max-w-[80%] mx-auto gap-4 flex-grow px-4">
        <div className="flex-1 flex flex-col gap-12 py-8 overflow-hidden">
          <Outlet />
        </div>

        {!hideAds && (
          <div className="hidden lg:block">
            <StickyAds />
          </div>
        )}
      </main>

      {!hideAds && (
        <div className="w-full bg-gray-100 text-center py-2">
          <div className="ads-banner h-[90px] bg-gray-200 flex items-center justify-center text-sm text-gray-500 border border-dashed">
            Publicidad Intermedia
          </div>
        </div>
      )}

      <Footer />
      <CookieConsentModal />
    </div>
  );
}
