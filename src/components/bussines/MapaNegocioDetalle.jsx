// src/components/MapaComunidadConApi.jsx
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { motion, AnimatePresence } from "framer-motion";
import { PiChartPieSliceFill } from "react-icons/pi";
// ❌ Ya no importamos getBusinessesForMapByCommunity ni useParams
import { estaAbiertoAhora } from "../../utils/estaAbiertoAhora";
import Loading from "../Loading";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapaComunidadConApi({
  negocios = [], // ✅ ahora llegan por props
  communityName = "", // ✅ opcional (para las banderas)
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerActivoRef = useRef(null);
  const dropdownRef = useRef(null);
  const botonDropdownRef = useRef(null);
  const usuarioTocoDropdown = useRef(false);

  const [loading, setLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userCoords, setUserCoords] = useState(null);
  const [mostrarLeyenda, setMostrarLeyenda] = useState(false);
  const [categoriasUnicas, setCategoriasUnicas] = useState([]);

  // ⛳ Geolocalización del usuario
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords([pos.coords.longitude, pos.coords.latitude]);
      },
      () => {
        // fallback Dallas
        setUserCoords([-96.797, 32.7767]);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, []);

  // ✅ Mostrar/ocultar leyenda auto
  useEffect(() => {
    const timeoutOpen = setTimeout(() => {
      setMostrarLeyenda(true);
      const timeoutClose = setTimeout(() => {
        if (!usuarioTocoDropdown.current) {
          setMostrarLeyenda(false);
        }
      }, 4000);
      return () => clearTimeout(timeoutClose);
    }, 1000);
    return () => clearTimeout(timeoutOpen);
  }, []);

  // ✅ Render del mapa basado en `negocios` por props
  useEffect(() => {
    // loading visual mientras monta mapa en base a props
    setLoading(true);
  }, [negocios]);

  useEffect(() => {
    if (!mapRef.current) return;

    // reset si ya existe
    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    // centro por primer negocio válido o fallback NYC
    const firstCoords =
      Array.isArray(negocios) && negocios[0]?.location?.coordinates?.coordinates
        ? negocios[0].location.coordinates.coordinates
        : null;
    const defaultCenter =
      firstCoords?.length === 2
        ? firstCoords
        : userCoords || [-74.006, 40.7128];

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: defaultCenter,
      zoom: 12,
      attributionControl: false,
    });

    mapInstance.current = map;

    map.on("load", () => {
      setMapLoaded(true);
      setLoading(false);

      const bounds = new mapboxgl.LngLatBounds();

      // limpiar markers previos del DOM
      document
        .querySelectorAll(".emoji-pin, .marker-usuario")
        .forEach((el) => el.remove());

      const categorias = new Set();

      negocios.forEach((n) => {
        const coordsArray = n.location?.coordinates?.coordinates;
        if (!Array.isArray(coordsArray) || coordsArray.length !== 2) return;

        const [lng, lat] = coordsArray;
        const categoria =
          Array.isArray(n.categories) && n.categories[0]?.name
            ? n.categories[0].name
            : "Sin categoría";
        const colorCategoria = getColorByCategory(categoria);
        categorias.add(categoria);

        // tamaños adaptados premium/no-premium
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        const size = n.isPremium ? (isDesktop ? 40 : 34) : isDesktop ? 25 : 20;

        const wrapper = document.createElement("div");
        wrapper.className = "emoji-pin";
        wrapper.style.position = "absolute";
        wrapper.style.zIndex = "1";
        wrapper.style.width = `${size}px`;
        wrapper.style.height = `${size}px`;
        wrapper.style.cursor = "pointer";

        const markerEl = document.createElement("div");
        markerEl.style.width = `70%`;
        markerEl.style.height = `70%`;
        markerEl.style.borderRadius = "50%";
        markerEl.style.overflow = "hidden";
        markerEl.style.transition = "transform 0.2s ease";
        markerEl.style.pointerEvents = "auto";

        if (n.isPremium) {
          // Premium con logo
          markerEl.style.backgroundColor = "white";
          markerEl.style.border = `1px solid ${colorCategoria}`;
          const img = document.createElement("img");
          img.src = n.profileImage || "/placeholder.png";
          img.alt = `Logo de ${n.name}`;
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.objectFit = "cover";
          markerEl.appendChild(img);

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
          const flagBg = getFlagBackgroundByCommunity(communityName);
          if (flagBg) {
            markerEl.style.background = flagBg;
            markerEl.style.backgroundSize = "100% 100%";
            markerEl.style.border = "1px solid rgba(0,0,0,0.15)";
            markerEl.style.boxShadow = "0 0 4px rgba(0,0,0,0.25)";
          } else {
            markerEl.style.backgroundColor = colorCategoria;
          }
        }

        const popup = new mapboxgl.Popup({ offset: 35, closeButton: false })
          .setHTML(`
          <div class="w-[240px] rounded-xl shadow-2xl border border-white/10 bg-black/70 backdrop-blur-xs p-3">
            <div class="flex items-center gap-3">
              <img 
                src="${n.profileImage || "/placeholder.png"}" 
                alt="Logo de ${n.name}" 
                class="w-10 h-10 rounded-full object-cover border border-white/10"
              />
              <div class="flex flex-col">
                <h3 class="text-xs font-semibold text-gray-100">${n.name}</h3>
                <p class="text-[11px] text-gray-100 leading-tight">${categoria}</p>
              </div>
            </div>
            <div class="flex justify-between items-center mt-3">
              <a href="/negocios/${
                n._id
              }" class="text-xs text-white bg-orange-500 hover:bg-orange-600 font-medium px-2 py-1 rounded transition">
                Ver más
              </a>
              <div class="flex items-center gap-2 ml-2">
                ${
                  estaAbiertoAhora(n.openingHours)
                    ? `<span class="pulsing-dot"></span><span class="text-[11px] text-green-400">Abierto ahora</span>`
                    : `<span class="text-[11px] text-red-400">Cerrado</span>`
                }
              </div>
            </div>
          </div>
        `);

        wrapper.appendChild(markerEl);

        const marker = new mapboxgl.Marker(wrapper)
          .setLngLat([lng, lat])
          .setPopup(popup);

        wrapper.addEventListener("click", (e) => {
          e.stopPropagation();
          if (
            markerActivoRef.current &&
            markerActivoRef.current.markerEl !== markerEl
          ) {
            markerActivoRef.current.markerEl.style.transform = "scale(1)";
            markerActivoRef.current.wrapper.style.zIndex = "1";
            markerActivoRef.current.popup?.remove();
          }

          popup.addTo(map);

          if (n.isPremium) {
            markerEl.style.transform = "scale(3)";
            wrapper.style.zIndex = "20";
          }

          markerActivoRef.current = { markerEl, wrapper, popup };
        });

        marker.addTo(map);
        bounds.extend([lng, lat]);
      });

      setCategoriasUnicas(Array.from(categorias));

      if (userCoords) {
        const el = document.createElement("div");
        el.className = "marker-usuario";
        el.style.width = "18px";
        el.style.height = "18px";
        el.style.backgroundColor = "#3B82F6";
        el.style.borderRadius = "50%";
        el.style.border = "2px solid white";
        el.style.boxShadow = "0 0 6px rgba(0, 0, 0, 0.3)";

        new mapboxgl.Marker(el)
          .setLngLat(userCoords)
          .setPopup(new mapboxgl.Popup().setText("Tu ubicación"))
          .addTo(map);

        bounds.extend(userCoords);
      }

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, { padding: 50 });
      }
    });

    return () => {
      map.remove();
      mapInstance.current = null;
    };
    // negocios o communityName cambian => re-monta el mapa con nueva data
  }, [negocios, userCoords, communityName]);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (
        mostrarLeyenda &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !botonDropdownRef.current?.contains(e.target)
      ) {
        setMostrarLeyenda(false);
      }

      if (markerActivoRef.current) {
        markerActivoRef.current.markerEl.style.transform = "scale(1)";
        markerActivoRef.current.wrapper.style.zIndex = "1";
        markerActivoRef.current.popup?.remove();
        markerActivoRef.current = null;
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [mostrarLeyenda]);

  return (
    <div className="relative overflow-hidden rounded-xl shadow h-full">
      {loading || !mapLoaded ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur">
          <Loading
            variant="splash"
            bgColor="bg-red-600"
            message="Preparando tu experiencia…"
          />
        </div>
      ) : null}

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
                  key={cat}
                  className="flex items-center gap-2 py-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
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

      <div
        ref={mapRef}
        className="w-full h-full min-h-[500px] md:min-h-[500px]"
      />
    </div>
  );
}

function getColorByCategory(nombre) {
  switch (nombre) {
    case "Comida y Bebida":
      return "#fbbf24";
    case "Salud y Bienestar":
      return "#10b981";
    case "Deporte y Fitness":
      return "#3b82f6";
    case "Belleza y Cuidado Personal":
      return "#f9a8d4";
    case "Educación":
      return "#8b5cf6";
    case "Entretenimiento":
      return "#facc15";
    case "Mascotas":
      return "#d6a35c";
    case "Finanzas y Legales":
      return "#e5e7eb";
    case "Arte y Cultura":
      return "#7c3aed";
    default:
      return "#9ca3af";
  }
}

function getFlagBackgroundByCommunity(name = "") {
  const n = String(name || "")
    .toLowerCase()
    .trim();
  if (n.includes("colom")) {
    return "linear-gradient(to bottom, #FCD116 0% 50%, #0038A8 50% 75%, #CE1126 75% 100%)";
  }
  if (n.includes("vene")) {
    return "linear-gradient(to bottom, #FCD116 0% 33.333%, #0033A0 33.333% 66.666%, #EF3340 66.666% 100%)";
  }
  if (n.includes("peru") || n.includes("perú")) {
    return "linear-gradient(to right, #D91023 0% 33.333%, #FFFFFF 33.333% 66.666%, #D91023 66.666% 100%)";
  }
  if (n.includes("argen")) {
    return "linear-gradient(to bottom, #74ACDF 0% 33.333%, #FFFFFF 33.333% 66.666%, #74ACDF 66.666% 100%)";
  }
  if (n.includes("mex") || n.includes("méx")) {
    return "linear-gradient(to right, #006847 0% 33.333%, #FFFFFF 33.333% 66.666%, #CE1126 66.666% 100%)";
  }
  if (
    n.includes("usa") ||
    n.includes("estados unidos") ||
    n.includes("united states")
  ) {
    return "repeating-linear-gradient(to bottom, #B22234 0 10%, #FFFFFF 10% 20%)";
  }
  return null;
}
