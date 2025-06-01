// src/components/formularios/pasos/Paso6Extras.jsx
import { Field, ErrorMessage } from "formik";

export default function Paso6Extras() {
  return (
    <div className="space-y-5">
      <h3 className="text-[#141C24] text-lg font-semibold">Extras</h3>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Imagen destacada (URL)
        </label>
        <Field
          name="imagenDestacada"
          placeholder="https://..."
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="imagenDestacada"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Etiquetas (separadas por coma)
        </label>
        <Field
          name="etiquetas"
          placeholder="Yoga, Bienestar, Meditación"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="etiquetas"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div className="flex items-center gap-2">
        <Field type="checkbox" name="verificado" className="form-checkbox" />
        <label className="text-sm text-[#141C24]">Marcar como verificado</label>
      </div>
    </div>
  );
}
