import { Field, ErrorMessage, useFormikContext } from "formik";

export default function Paso1Info() {
  const { values } = useFormikContext();

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <label className="block text-sm font-medium mb-1">Título</label>
        <Field
          name="title"
          placeholder="Título del evento"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        />
        <ErrorMessage
          name="title"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <Field
          as="textarea"
          name="description"
          placeholder="Breve descripción del evento"
          className="form-textarea w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl px-4 py-3"
        />
        <ErrorMessage
          name="description"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Etiquetas (tags) */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Etiquetas (separadas por coma)
        </label>
        <Field
          name="tags"
          placeholder="ej. música, comida, feria"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        />
        <ErrorMessage
          name="tags"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Idioma */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Idioma del evento
        </label>
        <Field
          as="select"
          name="language"
          className="form-select w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        >
          <option value="es">Español</option>
          <option value="en">Inglés</option>
          <option value="pt">Portugués</option>
          <option value="fr">Francés</option>
        </Field>
        <ErrorMessage
          name="language"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* ¿Es gratuito? */}
      <div className="flex items-center space-x-2">
        <Field
          type="checkbox"
          name="isFree"
          id="isFree"
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label htmlFor="isFree" className="text-sm font-medium">
          Evento gratuito
        </label>
      </div>

      {/* Precio (solo si no es gratuito) */}
      {!values.isFree && (
        <div>
          <label className="block text-sm font-medium mb-1">Precio</label>
          <Field
            type="number"
            name="price"
            placeholder="Ej: 10"
            className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
          />
          <ErrorMessage
            name="price"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      )}
    </div>
  );
}
