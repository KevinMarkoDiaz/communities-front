// Mapa Comunidad Pins (actualizado con gestión unificada de popups y leyenda)
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
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapaComunidad({ negocios, coords }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
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

  const comunidadSel =
    useSelector((state) => state?.comunidadSeleccionada?.comunidad) ?? null;

  const name = comunidadSel?.name ?? "";

  const getDispositivoEscala = () => {
    const width = window.innerWidth;
    if (width < 1024) return 0.8;
    return 1;
  };

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

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const initMap = async () => {
      try {
        await fetchMapboxStyleWithRetry(
          `https://api.mapbox.com/styles/v1/mapbox/streets-v11?access_token=${mapboxgl.accessToken}`
        );

        const map = new mapboxgl.Map({
          container: mapRef.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [-96.797, 32.7767],
          zoom: 12,
          attributionControl: false,
        });

        mapInstance.current = map;

        map.on("load", () => {
          setIsLoaded(true);
        });
      } catch (err) {
        console.error("❌ Error al cargar el mapa:", err);
        setMapError(true);
        setIsLoaded(true);
      }
    };

    initMap();
  }, []);
  const listaNegocios = Array.isArray(negocios) ? negocios : [];

  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !isLoaded) return;

    const escalaDispositivo = getDispositivoEscala();
    const bounds = new mapboxgl.LngLatBounds();
    document
      .querySelectorAll(".emoji-pin, .marker-usuario")
      .forEach((el) => el.remove());

    const categorias = new Set();

    listaNegocios.forEach((n) => {
      const coordsArray = n.location?.coordinates?.coordinates;
      if (!Array.isArray(coordsArray) || coordsArray.length !== 2) return;

      const [lng, lat] = coordsArray;
      const categoria =
        Array.isArray(n.categories) && n.categories[0]?.name
          ? n.categories[0]?.name
          : "Sin categoría";
      const colorCategoria = getColorByCategory(categoria);
      categorias.add(categoria);

      const baseSize = n.isPremium ? 40 : 36;
      const size =
        escalaDispositivo * (n.isPremium ? baseSize : baseSize * 0.8);

      const wrapper = document.createElement("div");
      wrapper.className = "emoji-pin";
      wrapper.style.position = "absolute";
      wrapper.style.zIndex = "1";
      wrapper.style.width = `${size}px`;
      wrapper.style.height = `${size}px`;
      wrapper.style.cursor = "pointer"; // ✅ Cambia el cursor al pasar sobre el pin

      const markerEl = document.createElement("div");
      markerEl.style.width = `80%`;
      markerEl.style.height = `80%`;
      markerEl.style.borderRadius = "50%";
      markerEl.style.overflow = "hidden";
      markerEl.style.transition = "transform 0.2s ease";
      markerEl.style.pointerEvents = "auto";

      // donde construyes el mapa/popup

      // ...

      // crea el popup con un data-attribute para que podamos enganchar el click
      const html = `
  <div class="w-[240px] rounded-xl shadow-2xl border border-white/10 bg-black/70 backdrop-blur-xs p-3">
    <div class="flex items-center gap-3">
      <img 
        src="${n.profileImage || "/placeholder.png"}" 
        alt="Logo de ${n.name}" 
        class="w-10 h-10 rounded-full object-cover border border-white/10"
      />
      <div class="flex flex-col">
        <h3 class="  text-xs font-semibold text-gray-100">${n.name}</h3>
        <p class="text-[11px] text-gray-100 leading-tight">${categoria}</p>
      </div>
    </div>
    <div class="flex justify-between items-center mt-3">
      <a 
        href="/negocios/${n._id}" 
        data-navigate="/negocios/${n._id}"
        class="text-xs text-white bg-orange-500 hover:bg-orange-600 font-medium px-2 py-1 rounded transition"
      >
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
`;

      const popup = new mapboxgl.Popup({
        offset: 35,
        closeButton: false,
      }).setHTML(html);

      // Intercepta clics dentro del popup y navega con React Router
      popup.on("open", () => {
        const el = popup.getElement();

        const clickHandler = (e) => {
          const link = e.target.closest("[data-navigate]");
          if (link) {
            e.preventDefault();
            const to = link.getAttribute("data-navigate");
            navigate(to); // navegación SPA, sin recargar
            popup.remove(); // opcional: cierra el popup
          }
        };

        el.addEventListener("click", clickHandler);
        // guarda ref para quitarlo al cerrar
        el._popupClickHandler = clickHandler;
      });

      popup.on("close", () => {
        const el = popup.getElement();
        if (el && el._popupClickHandler) {
          el.removeEventListener("click", el._popupClickHandler);
          delete el._popupClickHandler;
        }
      });

      if (n.isPremium) {
        markerEl.style.backgroundColor = "white";
        markerEl.style.border = `1px solid ${colorCategoria}`;
        markerEl.style.boxShadow = "0 0 6px rgba(0, 0, 0, 0.3)";
        const img = document.createElement("img");
        img.src = n.profileImage || "/placeholder.png";
        img.alt = `Logo de ${n.name}`;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        markerEl.appendChild(img);

        // ✅ Hover en desktop para hacer zoom del logo premium
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

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
          // Centro con bandera de la comunidad seleccionada
          markerEl.style.background = flagBg;
          markerEl.style.backgroundSize = "100% 100%";
        } else {
          // Fallback: color por categoría (comportamiento actual)
          markerEl.style.backgroundColor = colorCategoria;
          markerEl.style.border = "none";
        }
      }

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
        .setLngLat([userCoords.lng, userCoords.lat])
        .setPopup(new mapboxgl.Popup().setText("Tu ubicación"))
        .addTo(map);

      bounds.extend([userCoords.lng, userCoords.lat]);
    }

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, { padding: 50 });
    }
  }, [negocios, coords, userCoords, isLoaded]);

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
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur">
          <Loading />
        </div>
      )}

      <div className="absolute top-2 left-2 z-20">
        <button
          ref={botonDropdownRef}
          onClick={(e) => {
            e.stopPropagation();
            usuarioTocoDropdown.current = true;
            setMostrarLeyenda((prev) => !prev);
          }}
          className="flex items-center gap-1 bg-white text-gray-700 px-3 py-2 rounded shadow  text-xs hover:bg-gray-100"
        >
          <PiChartPieSliceFill className="text-lg text-orange-500" />
          <p className="text-xs">Categorias</p>
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

      {!mapError && (
        <div
          ref={mapRef}
          className="w-full h-full min-h-[500px] md:min-h-[500px] lg:min-h-0"
        />
      )}
    </div>
  );
}

function getColorByCategory(nombre) {
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
