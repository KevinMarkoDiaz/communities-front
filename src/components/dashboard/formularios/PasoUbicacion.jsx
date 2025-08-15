import { Field, ErrorMessage, useFormikContext } from "formik";
import { useEffect } from "react";

export default function PasoUbicacion() {
  const { values, setFieldValue } = useFormikContext();

  const isDeliveryOnly = Boolean(values?.isDeliveryOnly);

  // Al activar "solo delivery", prellenar primaryZip desde location.zipCode (si existe)
  // y limpiar los campos de dirección para evitar confusiones visuales.
  useEffect(() => {
    if (isDeliveryOnly) {
      if (!values.primaryZip && values?.location?.zipCode) {
        setFieldValue(
          "primaryZip",
          String(values.location.zipCode).slice(0, 5)
        );
      }
      // Limpia dirección (opcional, seguro con tu backend/validación condicional)
      setFieldValue("location.address", "");
      setFieldValue("location.city", "");
      setFieldValue("location.state", "");
      // Conservamos country/zipCode por si los quieres usar en algún lado
      // (el backend en modo delivery usa primaryZip)
    }
  }, [
    isDeliveryOnly,
    setFieldValue,
    values?.location?.zipCode,
    values?.primaryZip,
  ]);

  // Maneja el cambio del checkbox y sincroniza zip si alternas de regreso a presencial
  const onToggleDelivery = (e) => {
    const checked = e.target.checked;
    setFieldValue("isDeliveryOnly", checked);
    if (!checked) {
      // Si vuelves a presencial y no tienes zip en location, copia desde primaryZip
      if (!values.location?.zipCode && values.primaryZip) {
        setFieldValue("location.zipCode", values.primaryZip);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Dirección del Evento</h3>

      {/* 🔵 Toggle Solo Delivery */}
      <label className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
        <Field
          type="checkbox"
          name="isDeliveryOnly"
          checked={isDeliveryOnly}
          onChange={onToggleDelivery}
        />
        <span className="  text-xs text-white">
          Solo delivery (sin ubicación física). Usaremos el centro del ZIP para
          ubicar el pin en el mapa.
        </span>
      </label>

      {/* Si es SOLO DELIVERY, mostramos solo el ZIP principal */}
      {isDeliveryOnly ? (
        <div>
          <label className="block  text-xs font-medium text-white mb-1">
            ZIP principal (5 dígitos)
          </label>

          <Field name="primaryZip">
            {({ field }) => (
              <input
                {...field}
                inputMode="numeric"
                pattern="\d{5}"
                maxLength={5}
                placeholder="75067"
                className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
                onChange={(e) => {
                  // Solo dígitos, máximo 5
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 5);
                  setFieldValue("primaryZip", digits);
                }}
              />
            )}
          </Field>

          <ErrorMessage
            name="primaryZip"
            component="div"
            className="text-red-400  text-xs mt-1"
          />

          <p className="text-xs text-white/70 mt-2">
            El mapa mostrará la ubicación aproximada en el centro de este ZIP.
          </p>
        </div>
      ) : (
        // 🚩 Modo presencial: dirección completa
        <>
          {/* Address */}
          <div
            className={isDeliveryOnly ? "opacity-60 pointer-events-none" : ""}
          >
            <label className="block  text-xs font-medium text-white mb-1">
              Dirección
            </label>
            <Field
              name="location.address"
              placeholder=" 345 Colorado Peace St"
              className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
              disabled={isDeliveryOnly}
            />
            <ErrorMessage
              name="location.address"
              component="div"
              className="text-red-400  text-xs mt-1"
            />
          </div>

          {/* City */}
          <div
            className={isDeliveryOnly ? "opacity-60 pointer-events-none" : ""}
          >
            <label className="block  text-xs font-medium text-white mb-1">
              Ciudad
            </label>
            <Field
              name="location.city"
              placeholder="Dallas"
              className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
              disabled={isDeliveryOnly}
            />
            <ErrorMessage
              name="location.city"
              component="div"
              className="text-red-400  text-xs mt-1"
            />
          </div>

          {/* State */}
          <div
            className={isDeliveryOnly ? "opacity-60 pointer-events-none" : ""}
          >
            <label className="block  text-xs font-medium text-white mb-1">
              Estado
            </label>
            <Field
              name="location.state"
              placeholder="TX"
              className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
              disabled={isDeliveryOnly}
            />
            <ErrorMessage
              name="location.state"
              component="div"
              className="text-red-400  text-xs mt-1"
            />
          </div>

          {/* Zip Code */}
          <div
            className={isDeliveryOnly ? "opacity-60 pointer-events-none" : ""}
          >
            <label className="block  text-xs font-medium text-white mb-1">
              Código Postal
            </label>
            <Field
              name="location.zipCode"
              placeholder="75081"
              className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
              disabled={isDeliveryOnly}
            />
            <ErrorMessage
              name="location.zipCode"
              component="div"
              className="text-red-400  text-xs mt-1"
            />
          </div>

          {/* Country */}
          <div
            className={isDeliveryOnly ? "opacity-60 pointer-events-none" : ""}
          >
            <label className="block  text-xs font-medium text-white mb-1">
              País
            </label>
            <Field
              name="location.country"
              placeholder="USA"
              className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
              disabled={isDeliveryOnly}
            />
            <ErrorMessage
              name="location.country"
              component="div"
              className="text-red-400  text-xs mt-1"
            />
          </div>
        </>
      )}
    </div>
  );
}
