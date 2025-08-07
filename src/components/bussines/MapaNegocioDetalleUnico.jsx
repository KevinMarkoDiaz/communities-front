import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function MapaNegocioDetalleUnico({ lat, lng, logo = "" }) {
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
      attributionControl: false,
    });

    map.on("load", () => setIsLoaded(true));

    const bounds = new mapboxgl.LngLatBounds();

    // 📍 PIN DE NEGOCIO (gota con logo o sólida)
    const negocioEl = document.createElement("div");

    const logoValido =
      logo &&
      typeof logo === "string" &&
      logo.trim() !== "" &&
      !logo.includes("undefined");

    if (logoValido) {
      negocioEl.innerHTML = `
        <div style="
          width: 35px;
          height: 35px;
          background-color: #dc2626;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 0 16px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        ">
          <img src="${logo}" alt="logo" style="
            width: 90%;
            height: 90%;
            border-radius: 50%;
            object-fit: cover;
          " />
        </div>
      `;
    } else {
      negocioEl.innerHTML = `
        <div style="
          width: 30px;
          height: 30px;
          background-color: #dc2626;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          box-shadow: 0 0 16px rgba(0,0,0,0.5);
        "></div>
      `;
    }

    new mapboxgl.Marker(negocioEl.firstElementChild)
      .setLngLat([lng, lat])
      .addTo(map);

    bounds.extend([lng, lat]);

    // 📍 PIN DEL USUARIO
    if (userCoords) {
      const userEl = document.createElement("div");
      userEl.style.width = "20px";
      userEl.style.height = "20px";
      userEl.style.backgroundColor = "#dc2626";
      userEl.style.borderRadius = "50% 50% 50% 0";
      userEl.style.transform = "rotate(-45deg)";
      userEl.style.boxShadow = "0 0 6px rgba(0,0,0,0.3)";
      userEl.style.display = "flex";
      userEl.style.alignItems = "center";
      userEl.style.justifyContent = "center";

      const punto = document.createElement("div");
      punto.style.width = "10px";
      punto.style.height = "10px";
      punto.style.borderRadius = "50%";
      punto.style.backgroundColor = "white";
      punto.style.transform = "rotate(45deg)";
      userEl.appendChild(punto);

      new mapboxgl.Marker(userEl).setLngLat(userCoords).addTo(map);
      bounds.extend(userCoords);
    }

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, { padding: 50 });
    }

    return () => map.remove();
  }, [lat, lng, userCoords, logo]);

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
