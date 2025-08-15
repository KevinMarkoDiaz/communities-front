// src/components/dashboard/formularios/perfil/Paso2Descripcion.jsx
import { Field, ErrorMessage } from "formik";

export default function Paso2Descripcion() {
  return (
    <div className="space-y-6">
      <h3 className="text-white text-lg font-semibold">Sobre ti</h3>

      <div>
        <label className="block  text-xs font-medium text-white mb-1">
          Descripción
        </label>
        <Field
          as="textarea"
          name="description"
          placeholder="Cuéntanos algo sobre ti..."
          rows={5}
          className="w-full px-4 py-3 border border-white/30 bg-white/10 rounded-lg placeholder:text-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <ErrorMessage
          name="description"
          component="div"
          className="text-red-400  text-xs mt-1"
        />
      </div>
    </div>
  );
}
