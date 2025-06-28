import { Field, ErrorMessage, useFormikContext } from "formik";

export default function Paso2Detalles() {
  const { values } = useFormikContext();

  return (
    <div className="space-y-6">
      {/* Fecha */}
      <div>
        <label className="block text-sm font-medium mb-1">Fecha</label>
        <Field
          type="date"
          name="date"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        />
        <ErrorMessage
          name="date"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Hora */}
      <div>
        <label htmlFor="time" className="block text-sm font-medium mb-1">
          Hora del evento
        </label>
        <Field
          type="time"
          name="time"
          id="time"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        />
        <ErrorMessage
          name="time"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Evento online */}
      <div className="flex items-center space-x-2">
        <Field
          type="checkbox"
          name="isOnline"
          id="isOnline"
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label htmlFor="isOnline" className="text-sm font-medium">
          ¿Es un evento virtual?
        </label>
      </div>

      {/* Link virtual (si aplica) */}
      {values.isOnline && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Link del evento online
          </label>
          <Field
            name="virtualLink"
            placeholder="https://..."
            className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
          />
          <ErrorMessage
            name="virtualLink"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      )}

      {/* Link de registro (opcional) */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Link de registro (si aplica)
        </label>
        <Field
          name="registrationLink"
          placeholder="https://formulario.com/registro"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        />
        <ErrorMessage
          name="registrationLink"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
}
