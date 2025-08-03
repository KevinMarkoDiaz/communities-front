import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapaNegocioDetalle({
  lat,
  lng,
  name = "Ubicación del negocio",
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords([pos.coords.longitude, pos.coords.latitude]);
      },
      () => console.log("Ubicación denegada")
    );
  }, []);

  useEffect(() => {
    if (!mapRef.current || typeof lat !== "number" || typeof lng !== "number")
      return;

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 14,
      attributionControl: false,
    });

    mapInstance.current = map;

    map.on("load", () => {
      setIsLoaded(true);
    });

    // Crear marcador principal personalizado
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
        <span style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 22px;
        ">🔵</span>
      </div>
    `;

    new mapboxgl.Marker(el)
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(name))
      .addTo(map);

    const bounds = new mapboxgl.LngLatBounds();
    bounds.extend([lng, lat]);

    // Marcar ubicación del usuario si está disponible
    if (userCoords) {
      const userEl = document.createElement("div");
      userEl.className = "marker-usuario";
      userEl.style.width = "18px";
      userEl.style.height = "18px";
      userEl.style.backgroundColor = "#3B82F6";
      userEl.style.borderRadius = "50%";
      userEl.style.border = "2px solid white";
      userEl.style.boxShadow = "0 0 6px rgba(0, 0, 0, 0.3)";

      new mapboxgl.Marker(userEl)
        .setLngLat(userCoords)
        .setPopup(new mapboxgl.Popup().setText("Tu ubicación"))
        .addTo(map);

      bounds.extend(userCoords);
    }

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, { padding: 50 });
    }

    return () => map.remove();
  }, [lat, lng, name, userCoords]);

  return (
    <div className="relative overflow-hidden rounded-xl shadow">
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur">
          <span className="text-sm text-gray-600">Cargando mapa...</span>
        </div>
      )}
      <div
        ref={mapRef}
        className={`w-full h-[300px] transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
