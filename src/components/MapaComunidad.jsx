import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Loading from "./Loading";
import { fetchMapboxStyleWithRetry } from "../utils/fetchMapboxStyleWithRetry";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapaComunidad({ negocios, coords }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [userCoords, setUserCoords] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // 🌎 Obtener ubicación del usuario
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords([pos.coords.longitude, pos.coords.latitude]);
      },
      (err) => {
        console.warn("Ubicación no disponible:", err.message);
      }
    );
  }, []);

  // 🗺️ Inicializar el mapa solo una vez
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
          optimizeForTerrain: false,
          antialias: false,
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
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

  // 🎯 Actualizar marcadores cuando cambian negocios, coords o ubicación del usuario
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !isLoaded) return;

    const bounds = new mapboxgl.LngLatBounds();

    // Eliminar marcadores existentes
    const oldMarkers = document.querySelectorAll(".emoji-pin, .marker-usuario");
    oldMarkers.forEach((el) => el.remove());

    negocios.forEach((n) => {
      const c = n.location?.coordinates;
      if (typeof c?.lng !== "number" || typeof c?.lat !== "number") return;

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

      new mapboxgl.Marker(el)
        .setLngLat([c.lng, c.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="w-[240px] p-3 rounded-xl">
              <div class="flex flex-col gap-1">
                <div class="flex items-center">
                  <h3 class="text-sm font-bold text-gray-900">${n.nombre}</h3>
                  ${
                    n.verificado
                      ? `<div class="w-5 h-5 p-[2px] ring-2 ring-sky-400 shadow-inner bg-gradient-to-br from-sky-200 to-sky-400 flex items-center justify-center"
                          style="clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                          title="Verificado por Communities">
                          <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12.5c1.5 2 4 4.5 4 4.5s6-8.5 14-12"/>
                          </svg>
                        </div>`
                      : ""
                  }
                </div>
                <p class="text-xs text-gray-600 line-clamp-2">${
                  n.descripcion
                }</p>
                <a href="/negocios/${n.id}" class="text-sm font-semibold mt-1">
                  Ver perfil →
                </a>
              </div>
            </div>
          `)
        )
        .addTo(map);

      bounds.extend([c.lng, c.lat]);
    });

    // 📍 Marcador de usuario
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
  switch (categoria.name) {
    case "Comida y Bebida":
      return "🍽️";
    case "Salud y Bienestar":
      return "🧘‍♀️";
    case "Ciencia y Tecnología":
      return "💻";
    case "Belleza y Cuidado Personal":
      return "💇‍♀️";
    case "Bienes Raíces":
      return "🏠";
    case "Arte y Cultura":
      return "🎨";
    case "Mascotas":
      return "🐾";
    case "Educación":
      return "📚";
    case "Deporte y Fitness":
      return "🏋️‍♂️";
    case "Finanzas y Legales":
      return "📊";
    case "Entretenimiento":
      return "🎭";
    default:
      return "📍";
  }
}
