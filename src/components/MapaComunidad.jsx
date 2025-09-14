// Mapa Comunidad Pins (hiper-defensivo: popups unificados, leyenda, fallbacks y limpieza)
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Loading from "./Loading";
import { fetchMapboxStyleWithRetry } from "../utils/fetchMapboxStyleWithRetry";
import { estaAbiertoAhora } from "../utils/estaAbiertoAhora";
import { PiChartPieSliceFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ✅ Token defensivo (evita crashear si falta)
const TOKEN = import.meta.env?.VITE_MAPBOX_TOKEN || "";
mapboxgl.accessToken = TOKEN;

const DALLAS_CENTER = { lat: 32.7767, lng: -96.797 };
const PLACEHOLDER_IMG = "/placeholder.png";

export default function MapaComunidad({ negocios, coords }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]); // ✅ llevamos refs de todos los markers para limpiar
  const markerActivoRef = useRef(null);

  const dropdownRef = useRef(null);
  const botonDropdownRef = useRef(null);
  const usuarioTocoDropdown = useRef(false);

  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [categoriasUnicas, setCategoriasUnicas] = useState([]);
  const [mostrarLeyenda, setMostrarLeyenda] = useState(false);

  const userCoords = useSelector((state) => state?.ubicacion?.coords ?? null);
  const comunidadSel = useSelector(
    (state) => state?.comunidadSeleccionada?.comunidad ?? null
  );
  const name = comunidadSel?.name ?? "";

  const listaNegocios = Array.isArray(negocios) ? negocios : [];

  const getDispositivoEscala = () => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    return width < 1024 ? 0.8 : 1;
  };

  // ✅ Mostrar/ocultar leyenda con cleanup correcto de timeouts
  useEffect(() => {
    let timeoutOpen, timeoutClose;
    timeoutOpen = setTimeout(() => {
      setMostrarLeyenda(true);
      timeoutClose = setTimeout(() => {
        if (!usuarioTocoDropdown.current) setMostrarLeyenda(false);
      }, 4000);
    }, 1000);

    return () => {
      clearTimeout(timeoutOpen);
      clearTimeout(timeoutClose);
    };
  }, []);

  // ✅ Inicialización del mapa (usa coords si están, sino Dallas)
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const initMap = async () => {
      try {
        if (!TOKEN) throw new Error("MAPBOX_TOKEN ausente.");

        // Precalienta el estilo con retry (evita race conditions)
        await fetchMapboxStyleWithRetry(
          `https://api.mapbox.com/styles/v1/mapbox/streets-v11?access_token=${TOKEN}`
        );

        const startCenter = [
          Number.isFinite(coords?.lng) ? coords.lng : DALLAS_CENTER.lng,
          Number.isFinite(coords?.lat) ? coords.lat : DALLAS_CENTER.lat,
        ];

        const map = new mapboxgl.Map({
          container: mapRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: startCenter,
          zoom: 12,
          attributionControl: false,
        });

        mapInstance.current = map;

        // Resize seguro al cambiar viewport
        const resize = () => {
          try {
            map.resize();
          } catch {}
        };
        window.addEventListener("resize", resize);

        map.on("load", () => {
          setIsLoaded(true);
        });

        // Cleanup total
        return () => {
          window.removeEventListener("resize", resize);
          // Quita popups activos
          if (markerActivoRef.current?.popup) {
            try {
              markerActivoRef.current.popup.remove();
            } catch {}
            markerActivoRef.current = null;
          }
          // Quita marcadores
          markersRef.current.forEach((m) => {
            try {
              m.remove();
            } catch {}
          });
          markersRef.current = [];
          // Quita mapa
          try {
            map.remove();
          } catch {}
          mapInstance.current = null;
        };
      } catch (err) {
        console.error("❌ Error al cargar el mapa:", err);
        setMapError(true);
        setIsLoaded(true);
      }
    };

    const cleanup = initMap();
    return () => {
      // si initMap devolvió cleanup, ejecútalo
      if (typeof cleanup === "function") cleanup();
    };
  }, [coords?.lat, coords?.lng]); // si cambian coords antes de crear, arrancará centrado bien

  // ✅ Reaccionar a cambios de coords (flyTo suave)
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !isLoaded) return;
    if (!Number.isFinite(coords?.lat) || !Number.isFinite(coords?.lng)) return;

    try {
      map.flyTo({ center: [coords.lng, coords.lat], zoom: 12 });
    } catch {}
  }, [coords, isLoaded]);

  // ✅ Helper para obtener [lng, lat] desde dos posibles esquemas
  const getLngLat = (n) => {
    // GeoJSON-like: n.location.coordinates.coordinates = [lng, lat]
    const c1 = n?.location?.coordinates?.coordinates;
    if (Array.isArray(c1) && c1.length === 2 && c1.every(Number.isFinite)) {
      return [c1[0], c1[1]];
    }
    // Alterno: n.ubicacion.coordenadas.lat/lng
    const lat = n?.ubicacion?.coordenadas?.lat;
    const lng = n?.ubicacion?.coordenadas?.lng;
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      return [lng, lat];
    }
    return null;
  };

  // ✅ Render/refresh de marcadores + bounds
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !isLoaded) return;

    // Limpia marcadores previos
    markersRef.current.forEach((m) => {
      try {
        m.remove();
      } catch {}
    });
    markersRef.current = [];

    // Limpia popup activo
    if (markerActivoRef.current?.popup) {
      try {
        markerActivoRef.current.popup.remove();
      } catch {}
      markerActivoRef.current = null;
    }

    const escalaDispositivo = getDispositivoEscala();
    const bounds = new mapboxgl.LngLatBounds();
    const categorias = new Set();
    const isDesktop =
      typeof window !== "undefined"
        ? window.matchMedia("(min-width: 1024px)").matches
        : false;

    // Crear markers de negocios
    listaNegocios.forEach((n) => {
      const pair = getLngLat(n);
      if (!pair) return;

      const [lng, lat] = pair;
      if (!Number.isFinite(lng) || !Number.isFinite(lat)) return;

      const categoria =
        Array.isArray(n?.categories) && n.categories[0]?.name
          ? n.categories[0]?.name
          : "Sin categoría";
      const colorCategoria = getColorByCategory(categoria);
      categorias.add(categoria);

      const baseSize = n?.isPremium ? 40 : 36;
      const size =
        escalaDispositivo * (n?.isPremium ? baseSize : baseSize * 0.8);

      const wrapper = document.createElement("div");
      wrapper.className = "emoji-pin";
      Object.assign(wrapper.style, {
        position: "absolute",
        zIndex: "1",
        width: `${size}px`,
        height: `${size}px`,
        cursor: "pointer",
      });

      const markerEl = document.createElement("div");
      Object.assign(markerEl.style, {
        width: "80%",
        height: "80%",
        borderRadius: "50%",
        overflow: "hidden",
        transition: "transform 0.2s ease",
        pointerEvents: "auto",
      });

      // Apariencia según premium o bandera por comunidad
      if (n?.isPremium) {
        markerEl.style.backgroundColor = "white";
        markerEl.style.border = `1px solid ${colorCategoria}`;
        markerEl.style.boxShadow = "0 0 6px rgba(0, 0, 0, 0.3)";

        const img = document.createElement("img");
        img.src = n?.profileImage || PLACEHOLDER_IMG;
        img.alt = `Logo de ${n?.name || "Negocio"}`;
        Object.assign(img.style, {
          width: "100%",
          height: "100%",
          objectFit: "cover",
        });
        markerEl.appendChild(img);

        // Hover zoom solo desktop y si no hay popup activo
        if (isDesktop) {
          wrapper.addEventListener("mouseenter", () => {
            if (!markerActivoRef.current) {
              markerEl.style.transform = "scale(3)";
              wrapper.style.zIndex = "20";
            }
          });
          wrapper.addEventListener("mouseleave", () => {
            if (!markerActivoRef.current) {
              markerEl.style.transform = "scale(1)";
              wrapper.style.zIndex = "1";
            }
          });
        }
      } else {
        const flagBg = getFlagBackgroundByCommunity(name);
        if (flagBg) {
          markerEl.style.background = flagBg;
          markerEl.style.backgroundSize = "100% 100%";
        } else {
          markerEl.style.backgroundColor = colorCategoria;
          markerEl.style.border = "none";
        }
      }

      // Popup HTML (con valores saneados)
      const safeName = n?.name || "Negocio";
      const safeImg = n?.profileImage || PLACEHOLDER_IMG;
      const safeCategoria = categoria || "Sin categoría";
      const safeId = n?._id || n?.id || "";
      const safeSlug = n?.slug || ""; // ✅ nuevo
      const abierto = estaAbiertoAhora(n?.openingHours);

      const html = `
  <div class="w-[240px] rounded-xl shadow-2xl border border-white/10 bg-black/70 backdrop-blur-xs p-3">
    <div class="flex items-center gap-3">
      <img 
        src="${safeImg}" 
        alt="Logo de ${safeName}" 
        class="w-10 h-10 rounded-full object-cover border border-white/10"
      />
      <div class="flex flex-col">
        <h3 class="text-xs font-semibold text-gray-100">${safeName}</h3>
        <p class="text-[11px] text-gray-100 leading-tight">${safeCategoria}</p>
      </div>
    </div>
    <div class="flex justify-between items-center mt-3">
      <a 
        href="/negocios/${safeSlug || safeId}" 
        data-navigate="/negocios/${safeSlug || safeId}"
        class="text-xs text-white bg-orange-500 hover:bg-orange-600 font-medium px-2 py-1 rounded transition"
      >
        Ver más
      </a>
      <div class="flex items-center gap-2 ml-2">
        ${
          abierto
            ? `<span class="pulsing-dot"></span><span class="text-[11px] text-green-400">Abierto ahora</span>`
            : `<span class="text-[11px] text-red-400">Cerrado</span>`
        }
      </div>
    </div>
  </div>
`;

      const popup = new mapboxgl.Popup({
        offset: 35,
        closeButton: false,
      }).setHTML(html);

      // Intercepta clics en el popup para SPA
      popup.on("open", () => {
        const el = popup.getElement();
        const clickHandler = (e) => {
          const link = e?.target?.closest?.("[data-navigate]");
          const to = link?.getAttribute?.("data-navigate");
          if (to) {
            e.preventDefault();
            try {
              navigate(to);
            } catch {}
            try {
              popup.remove();
            } catch {}
          }
        };
        el.addEventListener("click", clickHandler);
        el._popupClickHandler = clickHandler;
      });

      popup.on("close", () => {
        const el = popup.getElement?.();
        if (el?._popupClickHandler) {
          el.removeEventListener("click", el._popupClickHandler);
          delete el._popupClickHandler;
        }
      });

      wrapper.appendChild(markerEl);

      const marker = new mapboxgl.Marker(wrapper)
        .setLngLat([lng, lat])
        .setPopup(popup);

      // Click en marker: maneja popup/zoom y cierra el anterior
      wrapper.addEventListener("click", (e) => {
        e.stopPropagation();

        if (
          markerActivoRef.current &&
          markerActivoRef.current.markerEl !== markerEl
        ) {
          try {
            markerActivoRef.current.markerEl.style.transform = "scale(1)";
            markerActivoRef.current.wrapper.style.zIndex = "1";
            markerActivoRef.current.popup?.remove();
          } catch {}
        }

        try {
          popup.addTo(map);
        } catch {}

        if (n?.isPremium) {
          markerEl.style.transform = "scale(3)";
          wrapper.style.zIndex = "20";
        }

        markerActivoRef.current = { markerEl, wrapper, popup };
      });

      try {
        marker.addTo(map);
      } catch {}
      markersRef.current.push(marker);
      bounds.extend([lng, lat]);
    });

    setCategoriasUnicas(Array.from(categorias).sort());

    // Marker del usuario
    if (
      userCoords &&
      Number.isFinite(userCoords.lng) &&
      Number.isFinite(userCoords.lat)
    ) {
      const el = document.createElement("div");
      el.className = "marker-usuario";
      Object.assign(el.style, {
        width: "18px",
        height: "18px",
        backgroundColor: "#3B82F6",
        borderRadius: "50%",
        border: "2px solid white",
        boxShadow: "0 0 6px rgba(0, 0, 0, 0.3)",
      });

      const mUser = new mapboxgl.Marker(el)
        .setLngLat([userCoords.lng, userCoords.lat])
        .setPopup(new mapboxgl.Popup().setText("Tu ubicación"));

      try {
        mUser.addTo(map);
      } catch {}
      markersRef.current.push(mUser);
      bounds.extend([userCoords.lng, userCoords.lat]);
    }

    // Fit bounds seguro (sin NaN, soporta 0 o 1 punto)
    try {
      if (!bounds.isEmpty()) {
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        const samePoint = sw?.lng === ne?.lng && sw?.lat === ne?.lat;
        if (samePoint) {
          map.setCenter([sw.lng, sw.lat]);
          map.setZoom(13);
        } else {
          map.fitBounds(bounds, { padding: 50 });
        }
      }
    } catch {}
  }, [listaNegocios, userCoords, isLoaded, name]);

  // ✅ Cierre global de popup y dropdown al click fuera
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Cerrar leyenda si clic fuera
      if (
        mostrarLeyenda &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !botonDropdownRef.current?.contains(e.target)
      ) {
        setMostrarLeyenda(false);
      }

      // Cerrar popup activo si se clickea afuera
      if (markerActivoRef.current) {
        try {
          markerActivoRef.current.markerEl.style.transform = "scale(1)";
          markerActivoRef.current.wrapper.style.zIndex = "1";
          markerActivoRef.current.popup?.remove();
        } catch {}
        markerActivoRef.current = null;
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [mostrarLeyenda]);

  return (
    <div className="relative overflow-hidden rounded-xl shadow h-full">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur">
          <Loading
            variant="splash"
            bgColor="bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-700"
            message="Conectando con tu comunidad..."
          />
        </div>
      )}

      {/* Botón de categorías / leyenda */}
      <div className="absolute top-2 left-2 z-20">
        <button
          ref={botonDropdownRef}
          onClick={(e) => {
            e.stopPropagation();
            usuarioTocoDropdown.current = true;
            setMostrarLeyenda((prev) => !prev);
          }}
          className="flex items-center gap-1 bg-white text-gray-700 px-3 py-2 rounded shadow text-xs hover:bg-gray-100"
        >
          <PiChartPieSliceFill className="text-lg text-orange-500" />
          <p className="text-xs">Categorías</p>
        </button>

        <AnimatePresence>
          {mostrarLeyenda && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute mt-2 w-max bg-black/50 backdrop-blur-sm rounded-md shadow p-3 text-xs text-white"
            >
              {categoriasUnicas.map((cat, i) => (
                <motion.div
                  key={`${cat}-${i}`}
                  className="flex items-center gap-2 py-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: getColorByCategory(cat) }}
                  />
                  <span>{cat}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!mapError && (
        <div
          ref={mapRef}
          className="w-full h-full min-h-[500px] md:min-h-[500px] lg:min-h-0"
        />
      )}
      {mapError && (
        <div className="w-full h-[500px] flex items-center justify-center text-sm text-gray-600">
          No se pudo cargar el mapa. Verifica tu conexión o la configuración del
          mapa.
        </div>
      )}
    </div>
  );
}

// ---------- Utils ----------

function getColorByCategory(nombre = "") {
  switch (nombre) {
    case "Gastronomía":
      return "#fbbf24";
    case "Salud y Belleza":
      return "#10b981";
    case "Deporte":
      return "#3b82f6";
    case "Comercio":
      return "#f9a8d4";
    case "Educación":
      return "#8b5cf6";
    case "Entretenimiento":
      return "#facc15";
    case "Mascotas":
      return "#d6a35c";
    case "Finanzas y Legal":
      return "#e5e7eb";
    case "Cultura":
      return "#7c3aed";
    case "Construcción":
      return "#00a116ff";
    case "Tecnología":
      return "#00158fff";
    case "Inmobiliario":
      return "#ff1111ff";
    case "Automotriz":
      return "#00d9ffff";
    case "Arte corporal":
      return "#ff00ffff";
    default:
      return "#9ca3af";
  }
}

function getFlagBackgroundByCommunity(name = "") {
  const n = String(name || "")
    .toLowerCase()
    .trim();

  // 🇨🇴 Colombia (amarillo 50%, azul 25%, rojo 25%)
  if (n.includes("colom")) {
    return "linear-gradient(to bottom, #FCD116 0% 50%, #0038A8 50% 75%, #CE1126 75% 100%)";
  }

  // 🇻🇪 Venezuela (amarillo/azul/rojo a tercios; sin estrellas)
  if (n.includes("vene")) {
    return "linear-gradient(to bottom, #FCD116 0% 33.333%, #0033A0 33.333% 66.666%, #EF3340 66.666% 100%)";
  }

  // 🇵🇪 Perú (rojo, blanco, rojo vertical)
  if (n.includes("peru") || n.includes("perú")) {
    return "linear-gradient(to right, #D91023 0% 33.333%, #FFFFFF 33.333% 66.666%, #D91023 66.666% 100%)";
  }

  // 🇦🇷 Argentina (celeste/blanco/celeste)
  if (n.includes("argen")) {
    return "linear-gradient(to bottom, #74ACDF 0% 33.333%, #FFFFFF 33.333% 66.666%, #74ACDF 66.666% 100%)";
  }

  // 🇲🇽 México (verde/blanco/rojo vertical; sin escudo)
  if (n.includes("mex") || n.includes("méx")) {
    return "linear-gradient(to right, #006847 0% 33.333%, #FFFFFF 33.333% 66.666%, #CE1126 66.666% 100%)";
  }

  // 🇺🇸 USA (simplificado: rojo/blanco rayas)
  if (
    n.includes("usa") ||
    n.includes("estados unidos") ||
    n.includes("united states")
  ) {
    return "repeating-linear-gradient(to bottom, #B22234 0 10%, #FFFFFF 10% 20%)";
  }

  // Si no reconocemos la comunidad, devolvemos null para caer al color de categoría
  return null;
}
