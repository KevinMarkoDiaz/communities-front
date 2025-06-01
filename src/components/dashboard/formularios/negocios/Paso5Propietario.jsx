// src/components/formularios/pasos/Paso5Propietario.jsx
import { Field, ErrorMessage } from "formik";

export default function Paso5Propietario() {
  return (
    <div className="space-y-5">
      <h3 className="text-[#141C24] text-lg font-semibold">
        Propietario del negocio
      </h3>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Nombre del propietario
        </label>
        <Field
          name="propietario.nombre"
          placeholder="Luciana Ortega"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="propietario.nombre"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Foto (URL)
        </label>
        <Field
          name="propietario.imagen"
          placeholder="https://..."
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="propietario.imagen"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
}
