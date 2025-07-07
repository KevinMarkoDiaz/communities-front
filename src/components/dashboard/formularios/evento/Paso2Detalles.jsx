import { Field, ErrorMessage, useFormikContext } from "formik";

export default function Paso2Detalles() {
  const { values } = useFormikContext();

  return (
    <div className="space-y-6">
      {/* Fecha */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Fecha del evento
        </label>
        <Field
          type="date"
          name="date"
          className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg text-white placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="date"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* Hora */}
      <div>
        <label
          htmlFor="time"
          className="block text-sm font-medium text-white mb-1"
        >
          Hora del evento
        </label>
        <Field
          type="time"
          name="time"
          id="time"
          className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg text-white placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="time"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* Evento online */}
      <div className="flex items-center space-x-2">
        <Field
          type="checkbox"
          name="isOnline"
          id="isOnline"
          className="form-checkbox h-5 w-5 text-orange-500"
        />
        <label htmlFor="isOnline" className="text-sm font-medium text-white">
          ¿Es un evento virtual?
        </label>
      </div>

      {/* Link virtual */}
      {values.isOnline && (
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Link del evento online
          </label>
          <Field
            name="virtualLink"
            placeholder="https://..."
            className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg text-white placeholder:text-gray-300 focus:outline-none"
          />
          <ErrorMessage
            name="virtualLink"
            component="div"
            className="text-red-400 text-sm mt-1"
          />
        </div>
      )}

      {/* Link de registro */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Link de registro (opcional)
        </label>
        <Field
          name="registrationLink"
          placeholder="https://formulario.com/registro"
          className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg text-white placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="registrationLink"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>
    </div>
  );
}
