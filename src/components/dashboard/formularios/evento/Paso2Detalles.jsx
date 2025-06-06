import { Field, ErrorMessage } from "formik";

export default function Paso2Detalles() {
  return (
    <div className="space-y-6">
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

      <div>
        <label className="block text-sm font-medium mb-1">Ubicación</label>
        <Field
          name="location"
          placeholder="Ciudad, Estado"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        />
        <ErrorMessage
          name="location"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="time"
          className="block text-sm font-medium text-gray-700"
        >
          Hora del evento
        </label>
        <Field
          type="time"
          name="time"
          id="time"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <ErrorMessage
          name="time"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
}
