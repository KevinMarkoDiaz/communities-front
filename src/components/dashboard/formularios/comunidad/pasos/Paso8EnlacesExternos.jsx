import { Field, ErrorMessage, FieldArray, useFormikContext } from "formik";
import { customSelectStylesForm } from "../../../../../../src/styles/customSelectStylesForm";
import Select from "react-select";

const tipoOpciones = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "otro", label: "Otro" },
];

export function Paso8EnlacesExternos() {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#141C24]">
        Enlaces útiles externos
      </h3>

      <FieldArray name="externalLinks">
        {({ push, remove }) => (
          <div className="space-y-4">
            {values.externalLinks?.map((link, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start border-b pb-4"
              >
                <div>
                  <label className="block  text-xs font-medium mb-1">
                    Título
                  </label>
                  <Field
                    name={`externalLinks[${index}].title`}
                    placeholder="Grupo de WhatsApp"
                    className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
                  />
                  <ErrorMessage
                    name={`externalLinks[${index}].title`}
                    component="div"
                    className="text-red-500  text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block  text-xs font-medium mb-1">URL</label>
                  <Field
                    name={`externalLinks[${index}].url`}
                    placeholder="https://..."
                    className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
                  />
                  <ErrorMessage
                    name={`externalLinks[${index}].url`}
                    component="div"
                    className="text-red-500  text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block  text-xs font-medium mb-1">
                    Tipo
                  </label>
                  <Select
                    name={`externalLinks[${index}].type`}
                    options={tipoOpciones}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="Seleccionar"
                    styles={customSelectStylesForm}
                    value={tipoOpciones.find(
                      (op) => op.value === values.externalLinks[index].type
                    )}
                    onChange={(selected) =>
                      setFieldValue(
                        `externalLinks[${index}].type`,
                        selected ? selected.value : ""
                      )
                    }
                  />
                  <ErrorMessage
                    name={`externalLinks[${index}].type`}
                    component="div"
                    className="text-red-500  text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block  text-xs font-medium mb-1">
                    Descripción (opcional)
                  </label>
                  <Field
                    name={`externalLinks[${index}].description`}
                    placeholder="Grupo de ayuda para migrantes"
                    className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
                  />
                  <ErrorMessage
                    name={`externalLinks[${index}].description`}
                    component="div"
                    className="text-red-500  text-xs mt-1"
                  />
                </div>

                <div className="col-span-full">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500  text-xs"
                  >
                    Eliminar enlace
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                push({ title: "", url: "", type: "", description: "" })
              }
              className="btn btn-secondary"
            >
              Agregar enlace
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
}

export default Paso8EnlacesExternos;
