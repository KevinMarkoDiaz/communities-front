import { Field, FieldArray, ErrorMessage, useFormikContext } from "formik";

const diasSemana = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function Paso4Horarios() {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#141C24]">
        Horarios de atención
      </h3>

      <FieldArray
        name="openingHours"
        render={() => (
          <div className="space-y-4">
            {diasSemana.map((dia, index) => (
              <div key={index} className="flex flex-col gap-2 border-b pb-4">
                <label className="font-medium">{dia}</label>

                <label className="flex items-center gap-2 text-sm">
                  <Field
                    type="checkbox"
                    name={`openingHours[${index}].closed`}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setFieldValue(`openingHours[${index}].closed`, isChecked);

                      if (isChecked) {
                        // Usamos string vacío en vez de null para evitar error de validación
                        setFieldValue(`openingHours[${index}].open`, "");
                        setFieldValue(`openingHours[${index}].close`, "");
                      }
                    }}
                  />
                  Cerrado
                </label>

                {!values.openingHours[index].closed && (
                  <div className="flex gap-4">
                    <div>
                      <label className="block text-xs">Abre</label>
                      <Field
                        type="time"
                        name={`openingHours[${index}].open`}
                        className="form-input"
                      />
                      <ErrorMessage
                        name={`openingHours[${index}].open`}
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs">Cierra</label>
                      <Field
                        type="time"
                        name={`openingHours[${index}].close`}
                        className="form-input"
                      />
                      <ErrorMessage
                        name={`openingHours[${index}].close`}
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
}
