import { Field, ErrorMessage, useFormikContext } from "formik";
import { useEffect } from "react";

export default function PasoUbicacion() {
  const { values, setFieldValue } = useFormikContext();

  const isOnline = Boolean(values?.isOnline);

  // Si se cambia a online, limpiamos dirección física y viceversa
  useEffect(() => {
    if (isOnline) {
      // Modo ONLINE: limpiar dirección física
      setFieldValue("location.address", "");
      setFieldValue("location.city", "");
      setFieldValue("location.state", "");
      setFieldValue("location.zipCode", "");
      // lat/lng opcionales
      setFieldValue("location.coordinates.lat", "");
      setFieldValue("location.coordinates.lng", "");
    } else {
      // Modo PRESENCIAL: limpiar link virtual
      if (values.virtualLink) setFieldValue("virtualLink", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline]);

  const onToggleOnline = (e) => {
    const checked = e.target.checked;
    setFieldValue("isOnline", checked);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Ubicación del Evento</h3>

      {/* 🔁 Toggle Online / Presencial */}
      <label className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
        <Field
          type="checkbox"
          name="isOnline"
          checked={isOnline}
          onChange={onToggleOnline}
        />
        <span className="text-xs text-white">
          Evento online (sin ubicación física)
        </span>
      </label>

      {/* ONLINE: solo virtualLink */}
      {isOnline ? (
        <div>
          <label className="block text-xs font-medium text-white mb-1">
            Enlace del evento (virtual)
          </label>
          <Field name="virtualLink">
            {({ field }) => (
              <input
                {...field}
                type="url"
                placeholder="https://tu-evento-virtual.com/sala"
                className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
                onChange={(e) => {
                  const v = e.target.value.trim();
                  setFieldValue("virtualLink", v);
                }}
              />
            )}
          </Field>
          <ErrorMessage
            name="virtualLink"
            component="div"
            className="text-red-400 text-xs mt-1"
          />
          <p className="text-xs text-white/70 mt-2">
            Si es online, no necesitas ingresar dirección. El backend guardará
            el enlace como referencia para los asistentes.
          </p>
        </div>
      ) : (
        // PRESENCIAL: dirección completa + (opcional) lat/lng
        <>
          {/* Address */}
          <div>
            <label className="block text-xs font-medium text-white mb-1">
              Dirección
            </label>
            <Field
              name="location.address"
              placeholder="345 Colorado Peace St"
              className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
            />
            <ErrorMessage
              name="location.address"
              component="div"
              className="text-red-400 text-xs mt-1"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-medium text-white mb-1">
              Ciudad
            </label>
            <Field
              name="location.city"
              placeholder="Dallas"
              className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
            />
            <ErrorMessage
              name="location.city"
              component="div"
              className="text-red-400 text-xs mt-1"
            />
          </div>

          {/* State (dos letras, mayúsculas) */}
          <div>
            <label className="block text-xs font-medium text-white mb-1">
              Estado (2 letras)
            </label>
            <Field name="location.state">
              {({ field }) => (
                <input
                  {...field}
                  maxLength={2}
                  placeholder="TX"
                  className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
                  onChange={(e) => {
                    const v = e.target.value.toUpperCase().slice(0, 2);
                    setFieldValue("location.state", v);
                  }}
                />
              )}
            </Field>
            <ErrorMessage
              name="location.state"
              component="div"
              className="text-red-400 text-xs mt-1"
            />
          </div>

          {/* Zip Code (5 dígitos) */}
          <div>
            <label className="block text-xs font-medium text-white mb-1">
              Código Postal (5 dígitos)
            </label>
            <Field name="location.zipCode">
              {({ field }) => (
                <input
                  {...field}
                  inputMode="numeric"
                  pattern="\d{5}"
                  maxLength={5}
                  placeholder="75081"
                  className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
                  onChange={(e) => {
                    const digits = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 5);
                    setFieldValue("location.zipCode", digits);
                  }}
                />
              )}
            </Field>
            <ErrorMessage
              name="location.zipCode"
              component="div"
              className="text-red-400 text-xs mt-1"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-xs font-medium text-white mb-1">
              País
            </label>
            <Field
              name="location.country"
              placeholder="USA"
              className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
            />
            <ErrorMessage
              name="location.country"
              component="div"
              className="text-red-400 text-xs mt-1"
            />
          </div>

          {/* Lat/Lng (opcionales, por si quieres forzar coordenadas). 
              Tu backend requiere geoJSON coordinates si no es online; 
              si tienes geocodificación en backend, puedes dejarlas vacías. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Latitud (opcional)
              </label>
              <Field name="location.coordinates.lat">
                {({ field }) => (
                  <input
                    {...field}
                    type="number"
                    step="any"
                    placeholder="32.7767"
                    className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
                  />
                )}
              </Field>
            </div>
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Longitud (opcional)
              </label>
              <Field name="location.coordinates.lng">
                {({ field }) => (
                  <input
                    {...field}
                    type="number"
                    step="any"
                    placeholder="-96.7970"
                    className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
                  />
                )}
              </Field>
            </div>
          </div>

          <p className="text-xs text-white/70 mt-2">
            Si no indicas coordenadas, el sistema intentará geocodificar la
            dirección. Para máxima precisión en el mapa, agrega lat/lng.
          </p>
        </>
      )}
    </div>
  );
}
