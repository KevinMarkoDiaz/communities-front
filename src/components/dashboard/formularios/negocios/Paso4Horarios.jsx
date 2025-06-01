import { Field, ErrorMessage, useFormikContext } from "formik";

const diasSemana = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

export default function Paso4Horarios() {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="space-y-6">
      <h3 className="text-[#141C24] text-lg font-semibold">
        Horarios de atención
      </h3>

      <div className="space-y-4">
        {diasSemana.map((dia, index) => {
          const cerrado = values.horarios[index]?.cerrado;

          return (
            <div
              key={dia}
              className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center"
            >
              <div className="font-medium text-[#141C24] capitalize">{dia}</div>

              <div>
                <Field
                  type="time"
                  name={`horarios[${index}].apertura`}
                  disabled={cerrado}
                  className={`form-input w-full h-12 px-4 text-[#3F5374] ${
                    cerrado
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl"
                  }`}
                />
                <ErrorMessage
                  name={`horarios[${index}].apertura`}
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <Field
                  type="time"
                  name={`horarios[${index}].cierre`}
                  disabled={cerrado}
                  className={`form-input w-full h-12 px-4 text-[#3F5374] ${
                    cerrado
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl"
                  }`}
                />
                <ErrorMessage
                  name={`horarios[${index}].cierre`}
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={cerrado}
                  onChange={() =>
                    setFieldValue(`horarios[${index}].cerrado`, !cerrado)
                  }
                />
                <label className="text-sm text-[#141C24]">Cerrado</label>
              </div>

              <Field
                type="hidden"
                name={`horarios[${index}].dia`}
                value={dia}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
