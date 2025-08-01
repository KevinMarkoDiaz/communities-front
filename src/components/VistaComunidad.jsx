import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cargarNegociosDeComunidad } from "../store/comunidadSeleccionadaSlice";
import MapaComunidad from "../components/MapaComunidad";
import Loading from "./Loading";

export default function VistaComunidad() {
  const dispatch = useDispatch();

  const { comunidad, negocios, loaded } = useSelector(
    (state) => state.comunidadSeleccionada
  );

  const coordsRedux = useSelector((state) => state.ubicacion.coords);

  // ✅ Cargar negocios si hay comunidad y aún no se han cargado
  useEffect(() => {
    if (comunidad?._id && !loaded) {
      dispatch(cargarNegociosDeComunidad(comunidad._id));
    }
  }, [comunidad?._id, loaded, dispatch]);

  // ✅ Obtener coordenadas desde el primer negocio si existen
  const primerNegocio = negocios.find(
    (n) => n.ubicacion?.coordenadas?.lat && n.ubicacion?.coordenadas?.lng
  );

  const coords = primerNegocio
    ? {
        lat: primerNegocio.ubicacion.coordenadas.lat,
        lng: primerNegocio.ubicacion.coordenadas.lng,
      }
    : coordsRedux; // ✅ Usa coords globales si no hay negocios

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
