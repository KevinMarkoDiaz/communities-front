import { Field, ErrorMessage, FieldArray, useFormikContext } from "formik";
import DropzoneImagen from "../../../../DropzoneImagen";

export default function Paso2Cultura() {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#141C24]">País de origen</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <Field
            name="originCountryInfo.name"
            placeholder="Colombia"
            className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
          />
          <ErrorMessage
            name="originCountryInfo.name"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Bandera</label>
          <DropzoneImagen
            value={values.originCountryInfo?.flag || ""}
            onChange={(file) => setFieldValue("originCountryInfo.flag", file)}
            label="Bandera"
          />

          <ErrorMessage
            name="originCountryInfo.flag"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Capital</label>
          <Field
            name="originCountryInfo.capital"
            placeholder="Bogotá"
            className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
          />
          <ErrorMessage
            name="originCountryInfo.capital"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#141C24]">Tradiciones</h3>
      <FieldArray name="traditions">
        {({ push, remove }) => (
          <div className="space-y-4">
            {values.traditions?.map((trad, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Field
                  name={`traditions[${index}]`}
                  placeholder="Carnaval de Barranquilla"
                  className="form-input flex-1 h-12 px-4 rounded-xl border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 text-sm"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => push("")}
              className="btn btn-secondary"
            >
              Agregar tradición
            </button>
          </div>
        )}
      </FieldArray>

      <h3 className="text-lg font-semibold text-[#141C24]">Gastronomía</h3>
      <FieldArray name="food">
        {({ push, remove }) => (
          <div className="space-y-6">
            {values.food?.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-3 gap-4 border-b pb-6"
              >
                <div>
                  <label className="text-sm font-medium">Nombre</label>
                  <Field
                    name={`food[${index}].name`}
                    placeholder="Arepa"
                    className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Descripción</label>
                  <Field
                    name={`food[${index}].description`}
                    placeholder="Típico alimento a base de maíz"
                    className="form-input w-full h-12 px-4 rounded-xl border border-gray-300"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Imagen</label>
                  <DropzoneImagen
                    value={item?.image || ""}
                    onChange={(file) =>
                      setFieldValue(`food[${index}].image`, file)
                    }
                    label={`Imagen del plato ${index + 1}`}
                  />
                </div>

                <div className="col-span-full">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 text-sm mt-2"
                  >
                    Eliminar plato
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => push({ name: "", description: "", image: "" })}
              className="btn btn-secondary"
            >
              Agregar plato típico
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
}
