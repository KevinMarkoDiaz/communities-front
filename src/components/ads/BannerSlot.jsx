// src/components/ads/BannerSlot.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AdBanner from "./AdBanner";
import axiosInstance from "../../api/axiosInstance";

// Fallbacks estáticos opcionales por placement
const STATIC_FALLBACKS = {
  home_top: {
    title: "¡Anúnciate en Communidades!",
    imageUrl: "/fallbacks/home_top.png",
    redirectUrl: "https://communidades.com/anunciate",
    imageAlt: "Anúnciate aquí",
    _id: "fb-home_top",
    isFallback: true,
  },
};

// Google Ads (respeta alto del contenedor)
function GoogleAdSlot({ clientId, adUnit, style }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!window.__adsense_loaded__) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
      s.setAttribute("data-ad-client", clientId);
      s.setAttribute("crossorigin", "anonymous");
      document.head.appendChild(s);
      window.__adsense_loaded__ = true;
    }

    const t = setInterval(() => {
      if (window.adsbygoogle && ref.current) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          clearInterval(t);
        } catch {}
      }
    }, 300);

    return () => clearInterval(t);
  }, [clientId]);

  return (
    <ins
      ref={ref}
      className="adsbygoogle"
      style={style || { display: "block", width: "100%" }}
      data-ad-client={clientId}
      data-ad-slot={adUnit}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

// Acepta {banners: [...]}, {ads: [...]}, o {data: [...]}
function getBannerListFromResponse(data) {
  return data?.banners ?? data?.ads ?? data?.data ?? [];
}

/**
 * Flujo:
 * 1) Busca vendidos (includeFallback=false)
 * 2) Si no hay → fallback de BD (includeFallback=true)
 * 3) Si tampoco → Google Ads (si está habilitado)
 * 4) Si nada → fallback estático
 */
export default function BannerSlot({
  placement,
  communityId, // ← opcional (prop). Si no viene, se usa Redux.
  categoryId,
  businessId,
  adUnit,
  enableGoogleAds = true,
  adsenseClient = import.meta.env.VITE_ADSENSE_CLIENT,
  className = "",
  containerStyle,
  imgClassName = "",
  openInNewTabDefault = true,
  askDbFallbackIfNoAds = true,
  fixedHeight = null, // ej: "250px" o 250
}) {
  const [banner, setBanner] = useState(null);
  const [showAds, setShowAds] = useState(false);

  // 🧠 Tomamos la comunidad seleccionada desde Redux
  const reduxCommunityId = useSelector(
    (s) => s.comunidades?.comunidadSeleccionada?.comunidad?._id
  );

  // Si pasaron communityId por prop, lo usamos; si no, usamos Redux
  const effectiveCommunityId = communityId ?? reduxCommunityId ?? null;

  const domId = useMemo(
    () => `banner-${placement}-${Math.random().toString(36).slice(2)}`,
    [placement]
  );

  // normalizamos fixedHeight a string CSS
  const clampHeight =
    typeof fixedHeight === "number"
      ? `${fixedHeight}px`
      : typeof fixedHeight === "string"
      ? fixedHeight
      : null;

  // estilo base del wrapper
  const baseStyle = clampHeight
    ? { height: clampHeight, maxHeight: clampHeight, ...containerStyle }
    : containerStyle;

  // fetch vendido → fallback DB → google → estático
  useEffect(() => {
    let mounted = true;
    const base = {
      placement,
      limit: 1,
      strategy: "weighted",
      ...(effectiveCommunityId ? { communityId: effectiveCommunityId } : {}),
      ...(categoryId ? { categoryId } : {}),
      ...(businessId ? { businessId } : {}),
    };

    const trySold = async () => {
      try {
        const { data } = await axiosInstance.get("ads/active", {
          params: { ...base, includeFallback: "false" },
          headers: { "Cache-Control": "no-cache" },
        });
        if (!mounted) return false;
        const list = getBannerListFromResponse(data);
        const b = list[0];
        if (b) {
          setBanner(b);
          setShowAds(false);
          return true;
        }
        return false;
      } catch {
        return false;
      }
    };

    const tryDbFallback = async () => {
      if (!askDbFallbackIfNoAds) return false;
      try {
        const { data } = await axiosInstance.get("ads/active", {
          params: { ...base, includeFallback: "true" },
          headers: { "Cache-Control": "no-cache" },
        });
        if (!mounted) return false;
        const list = getBannerListFromResponse(data);
        const fb = list[0];
        if (fb) {
          setBanner(fb);
          setShowAds(false);
          return true;
        }
        return false;
      } catch {
        return false;
      }
    };

    (async () => {
      if (await trySold()) return;
      if (await tryDbFallback()) return;

      if (enableGoogleAds && adsenseClient && adUnit) {
        setShowAds(true);
        setBanner(null);
        return;
      }

      setBanner(STATIC_FALLBACKS[placement] || null);
      setShowAds(false);
    })();

    return () => {
      mounted = false;
    };
  }, [
    placement,
    effectiveCommunityId, // 👈 cambia cuando cambia la comunidad en Redux
    categoryId,
    businessId,
    enableGoogleAds,
    adsenseClient,
    adUnit,
    askDbFallbackIfNoAds,
  ]);

  // Tracking impresión (solo banners vendidos/DB, no estáticos)
  useEffect(() => {
    if (!banner?._id || banner?.isFallback) return;

    const el = document.getElementById(domId);
    if (!el) return;

    let tracked = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !tracked) {
            tracked = true;
            axiosInstance
              .post(`ads/banners/${banner._id}/track?type=impression`)
              .catch(() => {});
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [banner, domId, placement]);

  // Render vendido/fallback (BD)
  if (banner) {
    // ÚNICO log que dejamos en prod para verificar qué banner quedó
    console.log(banner);

    // variantes normalizadas
    const desktopImage =
      banner.imageDesktopUrl ||
      banner.sources?.desktop ||
      banner.imageUrl ||
      banner.sources?.default ||
      null;
    const tabletImage =
      banner.imageTabletUrl ||
      banner.sources?.tablet ||
      banner.imageUrl ||
      banner.sources?.default ||
      null;
    const mobileImage =
      banner.imageMobileUrl ||
      banner.sources?.mobile ||
      banner.imageUrl ||
      banner.sources?.default ||
      null;
    const image =
      banner.imageUrl ||
      banner.sources?.default ||
      desktopImage ||
      tabletImage ||
      mobileImage ||
      null;

    const openNew =
      typeof banner.openInNewTab === "boolean"
        ? banner.openInNewTab
          ? "_blank"
          : "_self"
        : openInNewTabDefault
        ? "_blank"
        : "_self";

    return (
      <div id={domId} className={className} style={baseStyle}>
        <div className="h-full w-full overflow-hidden flex items-center justify-center">
          <AdBanner
            image={image}
            desktopImage={desktopImage}
            tabletImage={tabletImage}
            mobileImage={mobileImage}
            link={banner.redirectUrl}
            className="h-full w-full"
            imgClassName={`h-full w-full object-contain ${imgClassName || ""}`}
            target={openNew}
            ariaLabel={banner.imageAlt || banner.title}
            onClick={() => {
              if (!banner.isFallback && banner._id) {
                axiosInstance
                  .post(`ads/banners/${banner._id}/track?type=click`)
                  .catch(() => {});
              }
            }}
          />
        </div>
      </div>
    );
  }

  // Render Google Ads (respetando altura)
  if (showAds) {
    return (
      <div id={domId} className={className} style={baseStyle}>
        <div className="max-h-[116px] w-full overflow-hidden">
          <GoogleAdSlot
            clientId={adsenseClient}
            adUnit={adUnit}
            style={{
              display: "block",
              width: "100%",
              ...(clampHeight
                ? { height: clampHeight, maxHeight: clampHeight }
                : {}),
            }}
          />
        </div>
      </div>
    );
  }

  // Fallback estático
  const fb = STATIC_FALLBACKS[placement];
  return fb ? (
    <div id={domId} className={className} style={baseStyle}>
      <div className="max-h-[116px] w-full overflow-hidden flex items-center justify-center">
        <AdBanner
          image={fb.imageUrl}
          link={fb.redirectUrl}
          className="max-h-[116px] w-full"
          imgClassName={`max-h-[116px] w-full object-contain ${
            imgClassName || ""
          }`}
        />
      </div>
    </div>
  ) : null;
}
