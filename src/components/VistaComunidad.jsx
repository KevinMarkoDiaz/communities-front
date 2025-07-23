import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cargarNegociosDeComunidad } from "../store/comunidadSeleccionadaSlice";
import MapaComunidad from "../components/MapaComunidad";
import Loading from "./Loading";

export default function VistaComunidad() {
  const dispatch = useDispatch();

  const { comunidad, negocios, loaded } = useSelector(
    (state) => state.comunidadSeleccionada
  );

  const [userCoords, setUserCoords] = useState(null);

  // ✅ Cargar negocios si hay comunidad y aún no se han cargado
  useEffect(() => {
    if (comunidad?._id && !loaded) {
      dispatch(cargarNegociosDeComunidad(comunidad._id));
    }
  }, [comunidad?._id, loaded, dispatch]);

  // 🌍 Obtener ubicación del usuario solo si no hay negocios ni coords del primer negocio
  useEffect(() => {
    const tieneCoords = negocios.some(
      (n) => n.ubicacion?.coordenadas?.lat && n.ubicacion?.coordenadas?.lng
    );

    if (!tieneCoords && !userCoords) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn("No se pudo obtener la ubicación:", error.message);
          setUserCoords({ lat: 32.7767, lng: -96.797 }); // fallback Dallas
        }
      );
    }
  }, [negocios, userCoords]);

  const primerNegocio = negocios.find(
    (n) => n.ubicacion?.coordenadas?.lat && n.ubicacion?.coordenadas?.lng
  );

  const coords = primerNegocio
    ? {
        lat: primerNegocio.ubicacion.coordenadas.lat,
        lng: primerNegocio.ubicacion.coordenadas.lng,
      }
    : userCoords;

  if (!coords) {
    return (
      <div className="w-full h-full min-h-[500px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <section className="space-y-4 relative h-full rounded-xl shadow">
      <MapaComunidad negocios={negocios} coords={coords} />
    </section>
  );
}
