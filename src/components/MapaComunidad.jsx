import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Loading from "./Loading";
import { fetchMapboxStyleWithRetry } from "../utils/fetchMapboxStyleWithRetry";
import { estaAbiertoAhora } from "../utils/estaAbiertoAhora";
import { FaQuestionCircle } from "react-icons/fa";
import { PiChartPieSliceFill } from "react-icons/pi";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapaComunidad({ negocios, coords }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [categoriasUnicas, setCategoriasUnicas] = useState([]);
  const [mostrarLeyenda, setMostrarLeyenda] = useState(false);

  const userCoords = useSelector((state) => state.ubicacion.coords);

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
          center: [-74.006, 40.7128],
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

  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !isLoaded) return;

    const bounds = new mapboxgl.LngLatBounds();
    document
      .querySelectorAll(".emoji-pin, .marker-usuario")
      .forEach((el) => el.remove());

    const categorias = new Set();

    negocios.forEach((n) => {
      const coordsArray = n.location?.coordinates?.coordinates;
      if (!Array.isArray(coordsArray) || coordsArray.length !== 2) return;

      const [lng, lat] = coordsArray;
      const categoria = n.categories[0]?.name || "Sin categoría";
      const colorCategoria = getColorByCategory(categoria);
      categorias.add(categoria);

      const wrapper = document.createElement("div");
      wrapper.className = "emoji-pin";
      wrapper.style.position = "absolute";
      wrapper.style.zIndex = "1";

      const markerEl = document.createElement("div");
      markerEl.style.width = "26px";
      markerEl.style.height = "26px";
      markerEl.style.borderRadius = "50%";
      markerEl.style.overflow = "hidden";
      markerEl.style.transition = "transform 0.2s ease";
      markerEl.style.pointerEvents = "auto";

      if (n.isPremium) {
        markerEl.style.backgroundColor = "white";
        markerEl.style.border = `1px solid ${colorCategoria}`;
        markerEl.style.boxShadow = "0 0 6px rgba(0, 0, 0, 0.3)";
        markerEl.style.width = "32px";
        markerEl.style.height = "32px";
        const img = document.createElement("img");
        img.src = n.profileImage || "/placeholder.png";
        img.alt = `Logo de ${n.name}`;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        markerEl.appendChild(img);

        wrapper.addEventListener("mouseenter", () => {
          if (window.innerWidth >= 768) {
            wrapper.style.zIndex = "9999";
            markerEl.style.transform = "scale(4.4)";
          }
        });
        wrapper.addEventListener("mouseleave", () => {
          if (window.innerWidth >= 768) {
            wrapper.style.zIndex = "1";
            markerEl.style.transform = "scale(1)";
          }
        });
      } else {
        markerEl.style.backgroundColor = colorCategoria;
        markerEl.style.border = "none";
      }

      wrapper.appendChild(markerEl);

      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
        .setHTML(`
        <div class="w-[240px] rounded-xl shadow-2xl border border-white/10 bg-black/70 backdrop-blur-xs p-3">
          <div class="flex items-center gap-3">
            <img 
              src="${n.profileImage || "/placeholder.png"}" 
              alt="Logo de ${n.name}" 
              class="w-10 h-10 rounded-full object-cover border border-white/10"
            />
            <div class="flex flex-col">
              <h3 class="text-sm font-semibold text-gray-100">${n.name}</h3>
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

      new mapboxgl.Marker(wrapper)
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(map);
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

  return (
    <div className="relative overflow-hidden rounded-xl shadow h-full">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur">
          <Loading />
        </div>
      )}

      {/* Dropdown de leyenda de colores */}
      <div className="absolute top-2 left-2 z-20">
        <button
          onClick={() => setMostrarLeyenda((prev) => !prev)}
          className="flex items-center gap-1 bg-white text-gray-700 px-3 py-2 rounded shadow text-sm hover:bg-gray-100"
        >
          <PiChartPieSliceFill className="text-lg text-orange-500" />
          <p className="text-xs">Categorias</p>
        </button>

        {mostrarLeyenda && (
          <div className="absolute mt-2 w-max bg-black/50 backdrop-blur-sm rounded-md shadow p-3 text-xs text-white">
            {categoriasUnicas.map((cat) => (
              <div key={cat} className="flex items-center gap-2 py-1">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: getColorByCategory(cat) }}
                />
                <span>{cat}</span>
              </div>
            ))}
          </div>
        )}
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

// 🎨 Color asociado a cada categoría
function getColorByCategory(nombre) {
  switch (nombre) {
    case "Comida y Bebida":
      return "#fbbf24"; // naranja claro (honey)
    case "Salud y Bienestar":
      return "#10b981"; // verde esmeralda
    case "Deporte y Fitness":
      return "#3b82f6"; // azul vibrante
    case "Belleza y Cuidado Personal":
      return "#f9a8d4"; // rosa pálido
    case "Educación":
      return "#8b5cf6"; // violeta pastel
    case "Entretenimiento":
      return "#facc15"; // amarillo maíz
    case "Mascotas":
      return "#d6a35c"; // café claro (arena)
    case "Finanzas y Legales":
      return "#e5e7eb"; // gris claro / blanco roto
    case "Arte y Cultura":
      return "#7c3aed"; // morado profundo
    default:
      return "#9ca3af"; // gris neutro medio
  }
}
