import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Loading from "./Loading";
import { fetchMapboxStyleWithRetry } from "../utils/fetchMapboxStyleWithRetry";
import { estaAbiertoAhora } from "../utils/estaAbiertoAhora";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapaComunidad({ negocios, coords }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  const userCoords = useSelector((state) => state.ubicacion.coords);

  // 🗺️ Inicializar mapa
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
          center: [-74.006, 40.7128], // default temporal
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

  // 🎯 Agregar marcadores
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !isLoaded) return;

    const bounds = new mapboxgl.LngLatBounds();

    // Limpiar marcadores antiguos
    document
      .querySelectorAll(".emoji-pin, .marker-usuario")
      .forEach((el) => el.remove());

    negocios.forEach((n) => {
      const coordsArray = n.location?.coordinates?.coordinates; // Esperado: [lng, lat]

      if (
        !Array.isArray(coordsArray) ||
        coordsArray.length !== 2 ||
        typeof coordsArray[0] !== "number" ||
        typeof coordsArray[1] !== "number"
      ) {
        return;
      }

      const [lng, lat] = coordsArray;

      const el = document.createElement("div");
      el.className = "emoji-pin";
      el.innerHTML = `
    <div style="position: relative; width: 30px; height: 30px;">
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        background-color: white;
        border-radius: 50%;
        box-shadow: 0 0 3px rgba(0,0,0,0.2);
      "></div>
      <span class="emoji" style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 22px;
      ">${getEmoji(n.category)}</span>
    </div>
  `;

      const estaAbierto = estaAbiertoAhora(n.openingHours);

      new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(`
        <div class="w-[240px] rounded-xl shadow-2xl border border-white/10 bg-black/70 backdrop-blur-xs p-3">
          <div class="flex items-center gap-3">
            <img 
              src="${n.profileImage || "/placeholder.png"}" 
              alt="Logo de ${n.name}" 
              class="w-10 h-10 rounded-full object-cover border border-white/10"
            />
            <div class="flex flex-col">
              <h3 class="text-sm font-semibold text-gray-100">${n.name}</h3>
              <p class="text-[11px] text-gray-100 leading-tight">
                ${n.category?.name || "Sin categoría"}
              </p>
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
                estaAbierto
                  ? `<span class="pulsing-dot"></span><span class="text-[11px] text-green-400">Abierto ahora</span>`
                  : `<span class="text-[11px] text-red-400">Cerrado</span>`
              }
            </div>
          </div>
        </div>
      `)
        )
        .addTo(map);

      bounds.extend([lng, lat]);
    });

    // 📍 Ubicación del usuario desde Redux
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
      {!mapError && (
        <div
          ref={mapRef}
          className="w-full h-full min-h-[500px] md:min-h-[500px] lg:min-h-0"
        />
      )}
    </div>
  );
}

function getEmoji(categoria) {
  switch (categoria?.name) {
    case "Comida y Bebida":
      return "🥗";
    case "Salud y Bienestar":
      return "⚕️";
    case "Ciencia y Tecnología":
      return "💻";
    case "Belleza y Cuidado Personal":
      return "✂️";
    case "Bienes Raíces":
      return "🏠";
    case "Arte y Cultura":
      return "🎨";
    case "Mascotas":
      return "🐾";
    case "Educación":
      return "📚";
    case "Deporte y Fitness":
      return "🏃";
    case "Finanzas y Legales":
      return "💼";
    case "Entretenimiento":
      return "🎬";
    default:
      return "📍";
  }
}
