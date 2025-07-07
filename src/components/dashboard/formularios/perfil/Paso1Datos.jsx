// src/components/dashboard/formularios/perfil/Paso1Datos.jsx
import { Field, ErrorMessage, useFormikContext } from "formik";
import Select from "react-select";
import { customSelectStylesForm } from "../../../../../src/styles/customSelectStylesForm";

export default function Paso1Datos() {
  const { values, setFieldValue } = useFormikContext();

  // Opciones del título
  const opcionesTitulo = [
    { value: "Empresario", label: "Empresario" },
    { value: "Estudiante", label: "Estudiante" },
    { value: "Profesional", label: "Profesional" },
    { value: "Otro", label: "Otro" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-white text-lg font-semibold">Información personal</h3>

      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Nombre
        </label>
        <Field
          name="name"
          placeholder="Kevin"
          className="w-full px-4 py-3 border border-white/30 bg-white/10 rounded-lg placeholder:text-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <ErrorMessage
          name="name"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* Apellido */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Apellido
        </label>
        <Field
          name="lastName"
          placeholder="Díaz"
          className="w-full px-4 py-3 border border-white/30 bg-white/10 rounded-lg placeholder:text-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <ErrorMessage
          name="lastName"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* Título (React Select) */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Título
        </label>
        <Select
          options={opcionesTitulo}
          placeholder="Selecciona una opción..."
          styles={customSelectStylesForm}
          value={
            opcionesTitulo.find((opt) => opt.value === values.title) || null
          }
          onChange={(selected) => setFieldValue("title", selected?.value)}
        />
        <ErrorMessage
          name="title"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>
    </div>
  );
}
