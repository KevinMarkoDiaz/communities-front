import { useSelector } from "react-redux";
import MapaComunidad from "../components/MapaComunidad";
import Loading from "./Loading";

export default function VistaComunidad() {
  const {
    lista: negocios,
    loading,
    error,
  } = useSelector((state) => state.negocios);

  const primerNegocio = negocios?.find(
    (n) => n.ubicacion?.coordenadas?.lat && n.ubicacion?.coordenadas?.lng
  );

  const coords = primerNegocio
    ? {
        lat: primerNegocio.ubicacion.coordenadas.lat,
        lng: primerNegocio.ubicacion.coordenadas.lng,
      }
    : { lat: 32.7767, lng: -96.797 }; // fallback

  return (
    <section className="space-y-4 relative h-full">
      {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      )}

      {error && (
        <div className="w-full h-full bg-red-100 text-red-700 rounded-xl shadow-inner flex items-center justify-center text-sm">
          Error: {error}
        </div>
      )}

      {!loading && !error && negocios?.length === 0 && (
        <div className="w-full h-full bg-gray-100 rounded-xl shadow-inner flex items-center justify-center text-sm text-gray-600">
          No se encontraron negocios.
        </div>
      )}

      {!loading && !error && negocios?.length > 0 && (
        <MapaComunidad negocios={negocios} coords={coords} />
      )}
    </section>
  );
}
