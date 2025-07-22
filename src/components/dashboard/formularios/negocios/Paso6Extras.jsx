import { Field, ErrorMessage, useFormikContext } from "formik";
import DropzoneImagen from "../../../DropzoneImagen";
import DropzoneGaleria from "../../../DropzoneGaleria";
import { useState } from "react";

export default function Paso6Extras() {
  const { setFieldValue, values } = useFormikContext();
  const [tagsInput, setTagsInput] = useState(
    Array.isArray(values.tags) ? values.tags.join(", ") : ""
  );

  return (
    <div className="space-y-6">
      <h3 className="text-white text-lg font-semibold">Extras</h3>

      {/* Imagen destacada */}
      <DropzoneImagen
        value={values.featuredImage}
        onChange={(file) => setFieldValue("featuredImage", file)}
        label="Imagen destacada del negocio"
        className="text-white"
      />
      <ErrorMessage
        name="featuredImage"
        component="div"
        className="text-red-500 text-sm"
      />

      {/* Imagen de perfil */}
      <DropzoneImagen
        value={values.profileImage}
        onChange={(file) => setFieldValue("profileImage", file)}
        label="Logo o imagen de perfil"
        className="text-white"
      />
      <ErrorMessage
        name="profileImage"
        component="div"
        className="text-red-500 text-sm"
      />

      {/* Etiquetas */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Etiquetas (separadas por coma)
        </label>
        <input
          type="text"
          placeholder="Café, Latino, Artesanal"
          className="w-full bg-white/10 border border-white/30 rounded-lg h-12 px-4 placeholder:text-gray-300 text-white focus:outline-none"
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
        <Field
          type="checkbox"
          name="isVerified"
          id="isVerified"
          className="form-checkbox h-5 w-5 text-orange-500 focus:ring-0 border-white/30"
        />
        <label htmlFor="isVerified" className="text-sm text-white">
          Marcar como verificado
        </label>
      </div>

      {/* Galería */}
      <DropzoneGaleria
        values={values.images || []}
        onChange={(files) => setFieldValue("images", files)}
        label="Galería de imágenes del negocio"
        maxImages={5}
        className="text-white"
      />
      <ErrorMessage
        name="images"
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
}
