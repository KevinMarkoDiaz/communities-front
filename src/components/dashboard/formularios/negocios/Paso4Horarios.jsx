// src/components/formularios/pasos/Paso4Horarios.jsx
import { Field, ErrorMessage, useFormikContext } from "formik";

export default function Paso4Horarios() {
  const { values, setFieldValue } = useFormikContext();

  const horarios = Array.isArray(values.openingHours)
    ? values.openingHours
    : [];

  return (
    <div className="space-y-6">
      <h3 className="text-[#141C24] text-lg font-semibold">
        Horarios de atención
      </h3>

      <div className="space-y-4">
        {horarios.length > 0 ? (
          horarios.map((horario, index) => {
            const cerrado = horario?.closed ?? false;

            return (
              <div
                key={horario.day || index}
                className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center"
              >
                <div className="font-medium text-[#141C24] capitalize">
                  {horario.day}
                </div>

                <div>
                  <Field
                    type="time"
                    name={`openingHours[${index}].open`}
                    disabled={cerrado}
                    className={`form-input w-full h-12 px-4 text-[#3F5374] ${
                      cerrado
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl"
                    }`}
                  />
                  <ErrorMessage
                    name={`openingHours[${index}].open`}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <Field
                    type="time"
                    name={`openingHours[${index}].close`}
                    disabled={cerrado}
                    className={`form-input w-full h-12 px-4 text-[#3F5374] ${
                      cerrado
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl"
                    }`}
                  />
                  <ErrorMessage
                    name={`openingHours[${index}].close`}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={cerrado}
                    onChange={() =>
                      setFieldValue(`openingHours[${index}].closed`, !cerrado)
                    }
                  />
                  <label className="text-sm text-[#141C24]">Cerrado</label>
                </div>

                <Field type="hidden" name={`openingHours[${index}].day`} />
              </div>
            );
          })
        ) : (
          <p>No hay horarios definidos</p>
        )}
      </div>
    </div>
  );
}
