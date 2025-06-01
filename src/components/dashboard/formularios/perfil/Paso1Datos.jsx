// src/components/dashboard/formularios/perfil/Paso1Datos.jsx
import { Field, ErrorMessage } from "formik";

export default function Paso1Datos() {
  return (
    <div className="space-y-6">
      <h3 className="text-[#141C24] text-lg font-semibold">
        Información personal
      </h3>

      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <Field
          name="name"
          placeholder="Kevin"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        />
        <ErrorMessage
          name="name"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Apellido</label>
        <Field
          name="lastName"
          placeholder="Díaz"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        />
        <ErrorMessage
          name="lastName"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Título</label>
        <Field
          as="select"
          name="title"
          className="form-select w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        >
          <option value="">Selecciona una opción</option>
          <option value="Empresario">Empresario</option>
          <option value="Estudiante">Estudiante</option>
          <option value="Profesional">Profesional</option>
          <option value="Otro">Otro</option>
        </Field>
        <ErrorMessage
          name="title"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
}
