import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapaNegocioDetalle({ lat, lng, name }) {
  const mapRef = useRef(null);
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
    });

    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup().setText(name || "Ubicación del negocio"))
      .addTo(map);

    if (userCoords) {
      new mapboxgl.Marker({ color: "blue" })
        .setLngLat(userCoords)
        .setPopup(new mapboxgl.Popup().setText("Tu ubicación"))
        .addTo(map);
    }

    map.on("load", () => setIsLoaded(true));
    return () => map.remove();
  }, [lat, lng, name, userCoords]);

  return (
    <div className="relative overflow-hidden rounded-xl shadow">
      {!isLoaded && (
        <div className="w-full h-[300px] flex items-center justify-center bg-gray-100">
          <span className="text-sm text-gray-500">Cargando mapa...</span>
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
