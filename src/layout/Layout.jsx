// src/layout/Layout.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StickyAds from "../components/StickyAds";
import { Outlet, useLocation } from "react-router-dom";
import CookieConsentModal from "../components/CookieConsentModal";
import { useEffect } from "react";
import { useInitData } from "../hooks/useInitData";
import SidebarComunidad from "./SidebarComunidad";
import BannerSlot from "../components/ads/BannerSlot";
import { useSelector } from "react-redux";

export default function Layout() {
  const location = useLocation();
  useInitData();

  const selectedCommunityId = useSelector(
    (s) => s.comunidadSeleccionada?.comunidad?._id
  );
  console.log(selectedCommunityId);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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

  const hiddenSideAdsRoutes = ["/comunidades"];

  const hideAds = hiddenAdsRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  const hideSideAds = hiddenSideAdsRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {!hideAds && (
        <div className="w-full bg-gray-100 text-center py-2">
          <BannerSlot
            placement="home_top"
            communityId={selectedCommunityId}
            adUnit={import.meta.env.VITE_ADSENSE_SLOT_HOME_TOP}
            enableGoogleAds={true}
            className="mx-auto max-w-[1400px]"
            containerStyle={{ minHeight: "120px" }}
            fixedHeight="120px"
            imgClassName="max-h-[116px]"
          />
        </div>
      )}

      <main className="flex w-full max-w-full   mx-auto gap-4 flex-grow px-2 md:px-4">
        {!hideAds && (
          <div className="hidden 2xl:block w-[230px] shrink-0">
            <SidebarComunidad />
          </div>
        )}

        <div className="flex-1 flex flex-col md:gap-12 py-8 overflow-hidden mx-auto 2xl:max-w-[1440px]">
          <Outlet />
        </div>

        {!hideAds && !hideSideAds && (
          <div className="hidden lg:block">
            <StickyAds communityId={selectedCommunityId} />
          </div>
        )}
      </main>

      {!hideAds && (
        <div className="2xl:hidden">
          <SidebarComunidad />
        </div>
      )}

      {!hideAds && (
        <div className="w-full bg-gray-100 text-center py-2">
          <BannerSlot
            placement="home_bottom"
            communityId={selectedCommunityId}
            adUnit={import.meta.env.VITE_ADSENSE_SLOT_HOME_BOTTOM}
            enableGoogleAds={true}
            className="mx-auto max-w-[1400px]"
            containerStyle={{ minHeight: "120px" }}
            fixedHeight="120px"
            imgClassName="max-h-[116px]"
          />
        </div>
      )}

      <Footer />
      <CookieConsentModal />
    </div>
  );
}
