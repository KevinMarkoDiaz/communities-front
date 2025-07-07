import { Field, ErrorMessage } from "formik";

export default function PasoUbicacion() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Dirección del Evento</h3>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Dirección
        </label>
        <Field
          name="location.address"
          placeholder="322 Peace St"
          className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="location.address"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Ciudad
        </label>
        <Field
          name="location.city"
          placeholder="Lewisville"
          className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="location.city"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* State */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Estado
        </label>
        <Field
          name="location.state"
          placeholder="TX"
          className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="location.state"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* Zip Code */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Código Postal
        </label>
        <Field
          name="location.zipCode"
          placeholder="75067"
          className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="location.zipCode"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
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
          className="text-red-400 text-sm mt-1"
        />
      </div>
    </div>
  );
}
