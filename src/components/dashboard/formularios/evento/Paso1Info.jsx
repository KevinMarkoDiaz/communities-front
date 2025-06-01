import { Field, ErrorMessage } from "formik";

export default function Paso1Info() {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Título</label>
        <Field
          name="title"
          placeholder="Título del evento"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        />
        <ErrorMessage
          name="title"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <Field
          as="textarea"
          name="description"
          placeholder="Breve descripción"
          className="form-textarea w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl px-4 py-3"
        />
        <ErrorMessage
          name="description"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
}
