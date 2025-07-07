import { Field, ErrorMessage, useFormikContext } from "formik";
import Select from "react-select";
import { customSelectStylesForm } from "../../../../styles/customSelectStylesForm";

export default function Paso1Info() {
  const { values, setFieldValue } = useFormikContext();

  const opcionesIdioma = [
    { value: "es", label: "Español" },
    { value: "en", label: "Inglés" },
    { value: "pt", label: "Portugués" },
    { value: "fr", label: "Francés" },
  ];

  return (
    <div className="space-y-6">
      {/* Título */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Título del evento
        </label>
        <Field
          name="title"
          placeholder="Título del evento"
          className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="title"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Descripción
        </label>
        <Field
          as="textarea"
          name="description"
          placeholder="Breve descripción del evento"
          rows={3}
          className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="description"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* Etiquetas */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Etiquetas (separadas por coma)
        </label>
        <Field
          name="tags"
          placeholder="ej. música, comida, feria"
          className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="tags"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* Idioma */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Idioma del evento
        </label>
        <Select
          name="language"
          options={opcionesIdioma}
          placeholder="Selecciona un idioma..."
          styles={customSelectStylesForm}
          value={
            opcionesIdioma.find((opt) => opt.value === values.language) || null
          }
          onChange={(option) => setFieldValue("language", option.value)}
        />
        <ErrorMessage
          name="language"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* ¿Es gratuito? */}
      <div className="flex items-center space-x-2">
        <Field
          type="checkbox"
          name="isFree"
          id="isFree"
          className="h-5 w-5 text-orange-500 border-white/40 bg-white/10 rounded focus:ring-0"
        />
        <label htmlFor="isFree" className="text-sm text-white font-medium">
          Evento gratuito
        </label>
      </div>

      {/* Precio */}
      {!values.isFree && (
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Precio
          </label>
          <Field
            type="number"
            name="price"
            placeholder="Ej: 10"
            className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
          />
          <ErrorMessage
            name="price"
            component="div"
            className="text-red-400 text-sm mt-1"
          />
        </div>
      )}
    </div>
  );
}
