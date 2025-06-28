import { Field, ErrorMessage } from "formik";

export default function Paso4Ubicacion() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#141C24]">
        Región de la comunidad
      </h3>

      {/* Campo: Región */}
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Región / Área
        </label>
        <Field
          name="region"
          placeholder="Ej: DFW, NYC, South Florida..."
          className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
        />
        <ErrorMessage
          name="region"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Campos: Dirección completa */}
      <h3 className="text-lg font-semibold text-[#141C24]">
        Dirección general de la comunidad
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Dirección</label>
          <Field
            name="location.address"
            placeholder="Calle 123"
            className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
          />
          <ErrorMessage
            name="location.address"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ciudad</label>
          <Field
            name="location.city"
            placeholder="Dallas"
            className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
          />
          <ErrorMessage
            name="location.city"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Estado</label>
          <Field
            name="location.state"
            placeholder="Texas"
            className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
          />
          <ErrorMessage
            name="location.state"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Código postal
          </label>
          <Field
            name="location.zipCode"
            placeholder="75201"
            className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
          />
          <ErrorMessage
            name="location.zipCode"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">País</label>
          <Field
            name="location.country"
            placeholder="Estados Unidos"
            className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
          />
          <ErrorMessage
            name="location.country"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
      </div>

      {/* Coordenadas del mapa */}
      <h3 className="text-lg font-semibold text-[#141C24] pt-4">
        Centro del mapa (opcional)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Latitud</label>
          <Field
            name="mapCenter.lat"
            placeholder="Ej: 32.7767"
            type="number"
            step="any"
            className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
          />
          <ErrorMessage
            name="mapCenter.lat"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Longitud</label>
          <Field
            name="mapCenter.lng"
            placeholder="Ej: -96.7970"
            type="number"
            step="any"
            className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
          />
          <ErrorMessage
            name="mapCenter.lng"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
      </div>
    </div>
  );
}
