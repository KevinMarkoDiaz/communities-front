import { Field, ErrorMessage } from "formik";

export default function Paso1Info() {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Nombre de la comunidad
        </label>
        <Field
          name="name"
          placeholder="Colombianos en Dallas"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4"
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
          placeholder="Una comunidad para compartir eventos, negocios y cultura colombiana en Dallas."
          className="form-textarea w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl px-4 py-3 min-h-[100px]"
        />
        <ErrorMessage
          name="description"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Idioma
        </label>
        <Field
          name="language"
          placeholder="es"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4"
        />
        <ErrorMessage
          name="language"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Tipo de comunidad
        </label>
        <Field
          as="select"
          name="tipo"
          className="form-select w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 text-[#3F5374]"
        >
          <option value="migrante">Migrante</option>
          <option value="cultural">Cultural</option>
          <option value="social">Social</option>
        </Field>
        <ErrorMessage
          name="tipo"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
}
