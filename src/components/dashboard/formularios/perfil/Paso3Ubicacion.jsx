// src/components/dashboard/formularios/perfil/Paso3Ubicacion.jsx
import { Field, ErrorMessage } from "formik";

export default function Paso3Ubicacion() {
  return (
    <div className="space-y-6">
      <h3 className="text-[#141C24] text-lg font-semibold">
        Imagen y ubicación
      </h3>

      <div>
        <label className="block text-sm font-medium mb-1">
          Imagen de perfil (URL)
        </label>
        <Field
          name="profileImage"
          placeholder="https://..."
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        />
        <ErrorMessage
          name="profileImage"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ubicación</label>
        <Field
          name="location"
          placeholder="Dallas, TX"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        />
        <ErrorMessage
          name="location"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">País</label>
        <Field
          name="country"
          placeholder="Estados Unidos"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        />
        <ErrorMessage
          name="country"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
}
