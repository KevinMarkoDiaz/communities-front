import { Field, ErrorMessage } from "formik";

export default function Paso3Imagen() {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">
          Imagen destacada (URL)
        </label>
        <Field
          name="image"
          placeholder="https://ejemplo.com/imagen.jpg"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        />
        <ErrorMessage
          name="image"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
}
