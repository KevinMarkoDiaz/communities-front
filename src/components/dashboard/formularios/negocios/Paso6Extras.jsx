import { Field, ErrorMessage, useFormikContext } from "formik";
import DropzoneImagen from "../../../DropzoneImagen";
import DropzoneGaleria from "../../../DropzoneGaleria";
import { useState } from "react";

export default function Paso6Extras() {
  const { setFieldValue, values } = useFormikContext();
  const [tagsInput, setTagsInput] = useState("");

  return (
    <div className="space-y-5">
      <h3 className="text-[#141C24] text-lg font-semibold">Extras</h3>

      {/* Imagen destacada (tipo File) */}
      <DropzoneImagen
        value={values.featuredImage}
        onChange={(file) => setFieldValue("featuredImage", file)}
        label="Imagen destacada del negocio"
      />
      <ErrorMessage
        name="featuredImage"
        component="div"
        className="text-red-500 text-sm"
      />

      <DropzoneImagen
        value={values.profileImage}
        onChange={(file) => setFieldValue("profileImage", file)}
        label="Logo o imagen de perfil"
      />
      <ErrorMessage
        name="profileImage"
        component="div"
        className="text-red-500 text-sm"
      />

      {/* Etiquetas */}
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Etiquetas (separadas por coma)
        </label>
        <input
          type="text"
          placeholder="Café, Latino, Artesanal"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          onBlur={() => {
            const tags = tagsInput
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean);
            setFieldValue("tags", tags);
          }}
        />
        <ErrorMessage
          name="tags"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Verificación */}
      <div className="flex items-center gap-2">
        <Field type="checkbox" name="isVerified" className="form-checkbox" />
        <label className="text-sm text-[#141C24]">Marcar como verificado</label>
      </div>

      {/* Galería múltiple (archivos tipo File) */}
      <DropzoneGaleria
        values={values.images || []}
        onChange={(files) => setFieldValue("images", files)}
        label="Galería de imágenes del negocio"
        maxImages={5}
      />
      <ErrorMessage
        name="images"
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
}
