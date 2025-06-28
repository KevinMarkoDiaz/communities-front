import { Field, ErrorMessage } from "formik";

export default function Paso5SEO() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#141C24]">
        SEO y visibilidad
      </h3>

      {/* Meta title */}
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Meta título
        </label>
        <Field
          name="metaTitle"
          placeholder="Comunidad Colombiana en DFW"
          className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
        />
        <ErrorMessage
          name="metaTitle"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Meta description */}
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Meta descripción
        </label>
        <Field
          as="textarea"
          name="metaDescription"
          placeholder="Conecta con migrantes colombianos, negocios locales, eventos y más en DFW."
          className="form-input w-full px-4 py-3 rounded-xl border border-gray-300"
        />
        <ErrorMessage
          name="metaDescription"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Estado */}
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Estado de publicación
        </label>
        <Field
          as="select"
          name="status"
          className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
        >
          <option value="Publicada">Publicada</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Inactiva">Inactiva</option>
        </Field>
        <ErrorMessage
          name="status"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Verificación */}
      <div className="flex items-center gap-2">
        <Field type="checkbox" name="isVerified" className="form-checkbox" />
        <label className="text-sm text-[#141C24]">Marcar como verificada</label>
      </div>
    </div>
  );
}
