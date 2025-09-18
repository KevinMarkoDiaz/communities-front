// src/layout/Layout.jsx (manteniendo tu estructura actual con ajuste del banner inicial)
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StickyAds from "../components/StickyAds";
import { Outlet, useLocation } from "react-router-dom";
import CookieConsentModal from "../components/CookieConsentModal";
import { useEffect, useMemo, useRef, useState } from "react";
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  const hiddenAdsRoutes = useMemo(
    () => [
      "/login",
      "/register",
      "/dashboard",
      "/premium",
      "/suscribirse",
      "/suscripcion-exitosa",
      "/suscripcion-cancelada",
      "/inbox",
      "/inbox/conversation",
    ],
    []
  );

  const hideAds = hiddenAdsRoutes.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(route + "/")
  );

  // ---------------- Intro Banner logic ----------------
  const [showIntroBanner, setShowIntroBanner] = useState(false);
  const [introPhase, setIntroPhase] = useState("hidden");
  const introTimeouts = useRef({});

  useEffect(() => {
    if (hideAds) return;

    const alreadyShown = sessionStorage.getItem("introBottomBannerShown");
    if (!alreadyShown) {
      setShowIntroBanner(true);
      introTimeouts.current.enter = setTimeout(
        () => setIntroPhase("visible"),
        0
      );
      introTimeouts.current.hold = setTimeout(
        () => setIntroPhase("exiting"),
        3000
      );
      introTimeouts.current.cleanup = setTimeout(() => {
        setShowIntroBanner(false);
        sessionStorage.setItem("introBottomBannerShown", "1");
      }, 3400);
    }

    return () => {
      Object.values(introTimeouts.current).forEach((t) => clearTimeout(t));
    };
  }, [hideAds]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {!hideAds && (
        <div className="w-full bg-gradient-to-r from-[#fff7ec] to-[#f3e8ff] text-center py-2">
          <BannerSlot
            placement="home_top"
            communityId={selectedCommunityId}
            adUnit={import.meta.env.VITE_ADSENSE_SLOT_HOME_TOP}
            enableGoogleAds={true}
            className="mx-auto max-w-[1400px]"
            containerStyle={{ minHeight: "70px" }}
            imgClassName="max-h-[116px]"
          />
        </div>
      )}

      <main className="flex w-full max-w-full  mx-auto gap-4 flex-grow lg:px-2 md:px-4">
        {!hideAds && (
          <div className="hidden 2xl:block w-[230px] shrink-0">
            <SidebarComunidad />
          </div>
        )}

        <div className="flex-1 flex flex-col md:gap-12 py-2 lg:py-8 overflow-hidden mx-auto 2xl:max-w-[1440px]">
          <Outlet />
        </div>

        {!hideAds && (
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

      {!hideAds && !showIntroBanner && (
        <div className="w-full bg-gradient-to-r from-[#fff7ec] to-[#f3e8ff] text-center py-2">
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

      {!hideAds && showIntroBanner && (
        <IntroBottomBanner
          communityId={selectedCommunityId}
          adUnit={import.meta.env.VITE_ADSENSE_SLOT_HOME_BOTTOM}
          phase={introPhase}
        />
      )}

      <Footer />
      <CookieConsentModal />
    </div>
  );
}

function IntroBottomBanner({ communityId, adUnit, phase }) {
  return (
    <div
      className={[
        "fixed bottom-0 inset-x-0 z-[60] flex justify-center", // centrado horizontal, ancho fluido
        "transition-transform duration-400 ease-out will-change-transform",
        phase === "visible" ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
      aria-live="polite"
    >
      <div className="bg-gradient-to-r from-[#fff7ec] to-[#f3e8ff] py-2 text-center shadow-lg rounded-md">
        <BannerSlot
          placement="home_bottom"
          communityId={communityId}
          adUnit={adUnit}
          enableGoogleAds={true}
          className="mx-auto"
          containerStyle={{ minHeight: "70px" }}
          fixedHeight="70px"
          imgClassName="max-h-[116px]"
        />
      </div>
    </div>
  );
}
