import { Field, ErrorMessage } from "formik";
import Select from "react-select";
import { useFormikContext } from "formik";
import { customSelectStylesForm } from "../../../../../src/styles/customSelectStylesForm";

/**
 * Paso 1: Información general del negocio
 * @param {{ categorias: Array<{ _id: string, name: string }>, comunidades: Array<{ _id: string, name: string }> }} props
 */
export default function Paso1General({ categorias = [], comunidades = [] }) {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="space-y-5">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Nombre
        </label>
        <Field
          name="name"
          placeholder="Estudio de Yoga Tierra y Alma"
          className="form-input w-full bg-white/10 border border-white/30 rounded-lg h-12 px-4 placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="name"
          component="div"
          className="text-red-500 text-sm mt-1"
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
          placeholder="Describe tu negocio"
          className="form-textarea cursor-default w-full h-42 xl:h-82 bg-white/10 border border-white/30 rounded-lg px-4 py-3 placeholder:text-gray-300 focus:outline-none resize-none overflow-y-auto custom-scroll"
        />
        <ErrorMessage
          name="description"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Categorías (múltiples) */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Categorías
        </label>
        <Select
          isMulti
          menuPlacement="top"
          options={categorias.map((c) => ({
            value: c._id,
            label: c.name,
          }))}
          placeholder="Selecciona una o más categorías..."
          styles={customSelectStylesForm}
          value={categorias
            .filter((c) => values.categories?.includes(c._id))
            .map((c) => ({ value: c._id, label: c.name }))}
          onChange={(selected) =>
            setFieldValue(
              "categories",
              selected ? selected.map((opt) => opt.value) : []
            )
          }
        />
        <ErrorMessage
          name="categories"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Comunidad */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Comunidad
        </label>
        <Select
          menuPlacement="top"
          options={comunidades.map((c) => ({
            value: c._id,
            label: c.name,
          }))}
          placeholder="Selecciona una comunidad..."
          styles={customSelectStylesForm}
          value={
            Array.isArray(comunidades)
              ? comunidades
                  .filter((c) => c?._id === values?.community)
                  .map((c) => ({
                    value: c._id,
                    label: c.name,
                  }))[0] || null
              : null
          }
          onChange={(selected) => setFieldValue("community", selected?.value)}
        />
        <ErrorMessage
          name="community"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
}
