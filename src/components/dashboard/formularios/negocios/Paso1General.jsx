import { Field, ErrorMessage } from "formik";

/**
 * Paso 1: Información general del negocio
 * @param {{ categorias: Array<{ _id: string, name: string }>, comunidades: Array<{ _id: string, name: string }> }} props
 */
export default function Paso1General({ categorias = [], comunidades = [] }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Nombre
        </label>
        <Field
          name="name"
          placeholder="Estudio de Yoga Tierra y Alma"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="name"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Descripción
        </label>
        <Field
          name="description"
          as="textarea"
          placeholder="Describe tu negocio"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl px-4 py-3 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="description"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Categoría
        </label>
        <Field
          name="category"
          as="select"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 text-[#3F5374]"
        >
          <option value="">Seleccionar...</option>
          {Array.isArray(categorias) &&
            categorias.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </Field>
        <ErrorMessage
          name="category"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Comunidad
        </label>
        <Field
          name="community"
          as="select"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 text-[#3F5374]"
        >
          <option value="">Seleccionar...</option>
          {Array.isArray(comunidades) &&
            comunidades.map((com) => (
              <option key={com._id} value={com._id}>
                {com.name}
              </option>
            ))}
        </Field>
        <ErrorMessage
          name="community"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
}
