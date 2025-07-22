import { Field, ErrorMessage } from "formik";
import Select from "react-select";
import { customSelectStylesForm } from "../../../../../styles/customSelectStylesForm";

const opcionesTipo = [
  { value: "migrante", label: "Migrante" },
  { value: "cultural", label: "Cultural" },
  { value: "social", label: "Social" },
];

export default function Paso1Info() {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Nombre de la comunidad
        </label>
        <Field
          name="name"
          placeholder="Colombianos en Dallas"
          className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="name"
          component="div"
          className="text-red-400 text-xs mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Descripción
        </label>
        <Field
          name="description"
          as="textarea"
          placeholder="Una comunidad para compartir eventos, negocios y cultura colombiana en Dallas."
          className="w-full h-40 lg:h-70 px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none min-h-[100px] "
        />
        <ErrorMessage
          name="description"
          component="div"
          className="text-red-400 text-xs mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Idioma
        </label>
        <Field
          name="language"
          placeholder="es"
          className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="language"
          component="div"
          className="text-red-400 text-xs mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Tipo de comunidad
        </label>
        <Field name="tipo">
          {({ field, form }) => (
            <Select
              styles={customSelectStylesForm}
              options={opcionesTipo}
              placeholder="Selecciona el tipo..."
              value={
                opcionesTipo.find((op) => op.value === field.value) || null
              }
              onChange={(option) => form.setFieldValue("tipo", option.value)}
            />
          )}
        </Field>
        <ErrorMessage
          name="tipo"
          component="div"
          className="text-red-400 text-xs mt-1"
        />
      </div>
    </div>
  );
}
