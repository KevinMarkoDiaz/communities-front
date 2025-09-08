import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cargarNegociosDeComunidad } from "../store/comunidadSeleccionadaSlice";
import MapaComunidad from "../components/MapaComunidad";
import Loading from "./Loading";

const DALLAS_CENTER = { lat: 32.7767, lng: -96.797 };

export default function VistaComunidad() {
  const dispatch = useDispatch();

  // Desestructuración segura con defaults
  const {
    comunidad,
    negocios = [],
    loaded,
  } = useSelector((state) => state.comunidadSeleccionada ?? {});

  const coordsRedux = useSelector((state) => state.ubicacion?.coords ?? null);

  // Memo helpers para deps estables
  const comunidadId = comunidad?._id ?? null;
  const hasCoords = Boolean(coordsRedux?.lat && coordsRedux?.lng);

  // ✅ Cargar negocios si hay comunidad y aún no se han cargado
  useEffect(() => {
    if (comunidadId && !loaded && hasCoords) {
      dispatch(
        cargarNegociosDeComunidad({
          communityId: comunidadId,
          coords: coordsRedux,
        })
      );
    }
  }, [comunidadId, loaded, hasCoords, coordsRedux, dispatch]);

  // ✅ Obtener coordenadas desde el primer negocio con coords válidas
  const primerNegocio = (negocios ?? []).find(
    (n) => n?.ubicacion?.coordenadas?.lat && n?.ubicacion?.coordenadas?.lng
  );

  const coords = primerNegocio
    ? {
        lat: primerNegocio.ubicacion.coordenadas.lat,
        lng: primerNegocio.ubicacion.coordenadas.lng,
      }
    : coordsRedux ?? DALLAS_CENTER;

  if (!coords) {
    // En la práctica no debería ocurrir porque tenemos DALLAS_CENTER como fallback,
    // pero mantenemos este guard por si cambia la lógica en el futuro.
    return (
      <div className="w-full h-full min-h-[500px] flex items-center justify-center">
        <Loading
          variant="splash"
          bgColor="bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-700"
          message="Conectando con tu comunidad..."
        />
      </div>
    );
  }

  return (
    <section className="space-y-4 relative h-full rounded-xl shadow overflow-hidden z-0">
      <MapaComunidad negocios={negocios} coords={coords} />
    </section>
  );
}
