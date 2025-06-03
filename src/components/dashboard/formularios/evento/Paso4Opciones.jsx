// src/components/dashboard/formularios/evento/Paso4Opciones.jsx
import { Field, ErrorMessage } from "formik";

export default function Paso4Opciones() {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Categorías</label>
        <Field
          as="select"
          name="categories"
          multiple
          className="form-select w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl px-4 py-2 h-32"
        >
          <option value="666a1c5cb58a59e2fd93a111">Cultura</option>
          <option value="666a1c5cb58a59e2fd93a112">Educación</option>
          <option value="666a1c5cb58a59e2fd93a113">Negocios</option>
        </Field>
        <ErrorMessage
          name="categories"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Comunidades</label>
        <Field
          as="select"
          name="communities"
          multiple
          className="form-select w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl px-4 py-2 h-32"
        >
          <option value="666a1c5cb58a59e2fd93b001">Colombiana</option>
          <option value="666a1c5cb58a59e2fd93b002">Venezolana</option>
        </Field>
        <ErrorMessage
          name="communities"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Etiquetas (separadas por coma)
        </label>
        <Field
          name="tags"
          placeholder="gratuito, niños, comida"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        />
        <ErrorMessage
          name="tags"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
}
