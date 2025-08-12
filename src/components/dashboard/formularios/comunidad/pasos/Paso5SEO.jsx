import { Field, ErrorMessage } from "formik";
import Select from "react-select";
import { useFormikContext } from "formik";
import { customSelectStylesForm } from "../../../../../../src/styles/customSelectStylesForm";

export default function Paso5SEO() {
  const { setFieldValue, values } = useFormikContext();

  const options = [
    { value: "Publicada", label: "Publicada" },
    { value: "Pendiente", label: "Pendiente" },
    { value: "Inactiva", label: "Inactiva" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">SEO y visibilidad</h3>

      {/* Meta title */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Meta título
        </label>
        <Field
          name="metaTitle"
          placeholder="Comunidad en DFW"
          className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="metaTitle"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* Meta description */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Meta descripción
        </label>
        <Field
          as="textarea"
          name="metaDescription"
          placeholder="Conecta con migrantes, negocios locales, eventos y más en USA."
          className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none min-h-[100px]"
        />
        <ErrorMessage
          name="metaDescription"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* Estado */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Estado de publicación
        </label>
        <Select
          menuPlacement="top"
          name="status"
          options={options}
          placeholder="Selecciona el estado..."
          styles={customSelectStylesForm}
          value={options.find((opt) => opt.value === values.status) || null}
          onChange={(option) => setFieldValue("status", option.value)}
        />
        <ErrorMessage
          name="status"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* Verificación */}
      <div className="flex items-center gap-2">
        <Field
          type="checkbox"
          name="isVerified"
          className="form-checkbox border-white/40 bg-white/10 text-orange-500 focus:ring-0 focus:outline-none"
        />
        <label className="text-sm text-white">Marcar como verificada</label>
      </div>
    </div>
  );
}
