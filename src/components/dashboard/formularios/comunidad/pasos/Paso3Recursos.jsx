import { Field, ErrorMessage, FieldArray, useFormikContext } from "formik";

export default function Paso3Recursos() {
  const { values } = useFormikContext();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#141C24]">Recursos útiles</h3>

      <FieldArray name="resources">
        {({ push, remove }) => (
          <div className="space-y-4">
            {values.resources?.map((res, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start border-b pb-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Título
                  </label>
                  <Field
                    name={`resources[${index}].title`}
                    placeholder="Consulado colombiano en Dallas"
                    className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
                  />
                  <ErrorMessage
                    name={`resources[${index}].title`}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">URL</label>
                  <Field
                    name={`resources[${index}].url`}
                    placeholder="https://..."
                    className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
                  />
                  <ErrorMessage
                    name={`resources[${index}].url`}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo</label>
                  <Field
                    name={`resources[${index}].type`}
                    as="select"
                    className="form-select w-full h-12 px-4 rounded-xl border border-gray-300"
                  >
                    <option value="">Seleccionar</option>
                    <option value="legal">Legal</option>
                    <option value="salud">Salud</option>
                    <option value="educación">Educación</option>
                    <option value="otros">Otros</option>
                  </Field>
                  <ErrorMessage
                    name={`resources[${index}].type`}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="col-span-full">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 text-sm"
                  >
                    Eliminar recurso
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => push({ title: "", url: "", type: "" })}
              className="btn btn-secondary"
            >
              Agregar recurso
            </button>
          </div>
        )}
      </FieldArray>

      <h3 className="text-lg font-semibold text-[#141C24] pt-6">
        Redes sociales
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Facebook</label>
          <Field
            name="socialMediaLinks.facebook"
            placeholder="https://facebook.com/..."
            className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Instagram</label>
          <Field
            name="socialMediaLinks.instagram"
            placeholder="https://instagram.com/..."
            className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">WhatsApp</label>
          <Field
            name="socialMediaLinks.whatsapp"
            placeholder="https://wa.me/..."
            className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">YouTube</label>
          <Field
            name="socialMediaLinks.youtube"
            placeholder="https://youtube.com/..."
            className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
