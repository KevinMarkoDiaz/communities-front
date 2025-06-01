import { Field, ErrorMessage, useFormikContext } from "formik";

export default function Paso6Extras() {
  const { setFieldValue, values } = useFormikContext();

  return (
    <div className="space-y-5">
      <h3 className="text-[#141C24] text-lg font-semibold">Extras</h3>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Imagen destacada (URL)
        </label>
        <Field
          name="featuredImage"
          placeholder="https://..."
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="featuredImage"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Etiquetas (separadas por coma)
        </label>
        <Field
          name="tagsString"
          placeholder="Yoga, Bienestar, Meditación"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
          value={values.tags?.join(", ") || ""}
          onChange={(e) => {
            const tags = e.target.value
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag);
            setFieldValue("tags", tags);
          }}
        />
        <ErrorMessage
          name="tags"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div className="flex items-center gap-2">
        <Field type="checkbox" name="isVerified" className="form-checkbox" />
        <label className="text-sm text-[#141C24]">Marcar como verificado</label>
      </div>
    </div>
  );
}
