import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Loading from "./Loading";
import { fetchMapboxStyleWithRetry } from "../utils/fetchMapboxStyleWithRetry";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapaComunidad({ negocios, coords }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [center, setCenter] = useState([coords.lng, coords.lat]);
  const [userCoords, setUserCoords] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  // Obtener ubicación del usuario
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const location = [pos.coords.longitude, pos.coords.latitude];
        setCenter(location);
        setUserCoords(location);
      },
      () => console.log("Ubicación denegada, usando centro por defecto")
    );
  }, []);

  // Inicializar mapa
  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = async () => {
      try {
        const styleUrl = "mapbox://styles/mapbox/streets-v11";

        await fetchMapboxStyleWithRetry(
          `https://api.mapbox.com/styles/v1/mapbox/streets-v11?access_token=${mapboxgl.accessToken}`
        );

        const map = new mapboxgl.Map({
          container: mapRef.current,
          style: styleUrl,
          center,
          zoom: 12,
        });

        mapInstance.current = map;

        map.on("load", () => {
          setIsLoaded(true);

          negocios.forEach((n) => {
            const coords = n.ubicacion?.coordenadas;
            if (
              !coords ||
              typeof coords.lat !== "number" ||
              typeof coords.lng !== "number"
            )
              return;

            const el = document.createElement("div");
            el.className = "emoji-marker";
            el.textContent = getEmoji(n.categoria);
            el.style.fontSize = "22px";
            el.style.cursor = "pointer";

            new mapboxgl.Marker(el)
              .setLngLat([coords.lng, coords.lat])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(`
                  <div class="w-[240px] p-3 rounded-xl">
                    <div class="flex flex-col gap-1">
                      <div class="flex items-center">
                        <h3 class="text-sm font-bold text-gray-900">${
                          n.nombre
                        }</h3>
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
                      <a href="/negocios/${
                        n.id
                      }" class="text-sm font-semibold mt-1">
                        Ver perfil →
                      </a>
                    </div>
                  </div>
                `)
              )
              .addTo(mapInstance.current);
          });
        });
      } catch (err) {
        console.error("❌ Error al cargar el mapa de Mapbox:", err);
        setMapError(true);
        setIsLoaded(true); // Para quitar el loader aunque haya error
      }
    };

    initMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [negocios, center]);

  // Marcador azul: ubicación del usuario
  useEffect(() => {
    if (userCoords && mapInstance.current) {
      new mapboxgl.Marker({ color: "blue" })
        .setLngLat(userCoords)
        .setPopup(new mapboxgl.Popup().setText("Tu ubicación"))
        .addTo(mapInstance.current);
    }
  }, [userCoords]);

  return (
    <div className="relative overflow-hidden rounded-xl shadow h-full">
      {/* Loader o fallback de error */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur">
          <Loading />
        </div>
      )}

      {/* Mapa visible solo si no hay error */}
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
  switch (categoria) {
    case "comida":
      return "🍽️";
    case "cafe":
      return "☕";
    case "belleza":
      return "💇‍♀️";
    case "ropa":
      return "👗";
    case "servicios":
      return "🛠️";
    default:
      return "📍";
  }
}
