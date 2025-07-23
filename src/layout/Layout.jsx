import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StickyAds from "../components/StickyAds";
import { Outlet, useLocation } from "react-router-dom";
import CookieConsentModal from "../components/CookieConsentModal";
import { useEffect } from "react";
import { useInitData } from "../hooks/useInitData";
import AdBanner from "../components/ads/AdBanner";
import SidebarComunidad from "./SidebarComunidad";

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
    "/inbox",
    "/inbox/conversation",
  ];

  const hideAds = hiddenAdsRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {!hideAds && (
        <div className="w-full bg-gray-100 text-center py-2">
          <AdBanner className="bg-gradient-to-r from-yellow-50 to-orange-100" />
        </div>
      )}

      <main className="flex w-full max-w-full xl:max-w-[99%] mx-auto gap-4 flex-grow px-2 md:px-4">
        {/* Sidebar comunidad solo en desktop */}
        {!hideAds && (
          <div className="hidden lg:block w-[280px] shrink-0">
            <SidebarComunidad />
          </div>
        )}

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col md:gap-12 py-8 overflow-hidden">
          <Outlet />
        </div>

        {/* Anuncios sticky a la derecha en desktop */}
        {!hideAds && (
          <div className="hidden lg:block">
            <StickyAds />
          </div>
        )}
      </main>

      {!hideAds && (
        <div className="w-full bg-gray-100 text-center py-2">
          <AdBanner className="bg-gradient-to-r from-yellow-50 to-orange-100" />
        </div>
      )}

      <Footer />
      <CookieConsentModal />
    </div>
  );
}
