import { Field, ErrorMessage } from "formik";

export default function Paso1General() {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Nombre
        </label>
        <Field
          name="nombre"
          placeholder="Estudio de Yoga Tierra y Alma"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="nombre"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Descripción
        </label>
        <Field
          name="descripcion"
          as="textarea"
          placeholder="Describe tu negocio"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl px-4 py-3 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="descripcion"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Categoría
        </label>
        <Field
          name="categoria"
          as="select"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 text-[#3F5374]"
        >
          <option value="">Seleccionar...</option>
          <option value="comida">Comida</option>
          <option value="salud">Salud</option>
          <option value="ropa">Ropa</option>
          <option value="servicios">Servicios</option>
        </Field>
        <ErrorMessage
          name="categoria"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Comunidad
        </label>
        <Field
          name="comunidad"
          placeholder="Latinoamericana"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="comunidad"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
}
