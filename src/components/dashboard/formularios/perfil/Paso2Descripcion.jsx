// src/components/dashboard/formularios/perfil/Paso2Descripcion.jsx
import { Field, ErrorMessage } from "formik";

export default function Paso2Descripcion() {
  return (
    <div className="space-y-6">
      <h3 className="text-[#141C24] text-lg font-semibold">Sobre ti</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <Field
          as="textarea"
          name="description"
          placeholder="Cuéntanos algo sobre ti..."
          rows={5}
          className="form-textarea w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl px-4 py-3"
        />
        <ErrorMessage
          name="description"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
}
