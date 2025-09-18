import { Field, ErrorMessage, useFormikContext } from "formik";
import DropzoneImagen from "../../../DropzoneImagen";
import DropzoneGaleria from "../../../DropzoneGaleria";
import { useState, useMemo } from "react";

export default function Paso6Extras() {
  const { setFieldValue, values } = useFormikContext();
  const [tagsInput, setTagsInput] = useState(
    Array.isArray(values.tags) ? values.tags.join(", ") : ""
  );

  // Helpers para parseo y estilos del contador
  const parseTags = (s) =>
    (s || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

  const tagsArray = useMemo(() => parseTags(tagsInput), [tagsInput]);
  const tagsCount = tagsArray.length;

  const { colorClass, msg } = useMemo(() => {
    if (tagsCount < 5) {
      return {
        colorClass: "text-red-400",
        msg: "Está bien, pero entre más pongas más fácil te encuentran los usuarios (apunta a 5–15).",
      };
    }
    if (tagsCount <= 15) {
      return {
        colorClass: "text-yellow-300",
        msg: "Buen rango. Suma variaciones y sinónimos relevantes para mejorar el alcance.",
      };
    }
    return {
      colorClass: "text-green-400",
      msg: "Excelente cobertura de búsqueda. Mantén tags relevantes y evita duplicados.",
    };
  }, [tagsCount]);

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
        className="text-red-500 text-xs"
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
        className="text-red-500 text-xs"
      />

      {/* Etiquetas */}
      <div>
        <label className="block text-xs font-medium text-white mb-1">
          Etiquetas (separadas por coma)
        </label>
        <input
          type="text"
          placeholder="Café, Latino, Artesanal"
          className="w-full bg-white/10 border border-white/30 rounded-lg h-12 px-4 placeholder:text-gray-300 text-white focus:outline-none"
          value={tagsInput}
          onChange={(e) => {
            const v = e.target.value;
            setTagsInput(v);
            // Sincroniza en vivo con el form:
            setFieldValue("tags", parseTags(v));
          }}
          onBlur={() => {
            // Redundante pero seguro si se edita fuera de onChange:
            setFieldValue("tags", parseTags(tagsInput));
          }}
        />

        {/* Contador + mensaje dinámico */}
        <div className="mt-1 flex items-center gap-2" aria-live="polite">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full border border-white/20 bg-white/10 ${colorClass}`}
          >
            {tagsCount} tag{tagsCount !== 1 ? "s" : ""}
          </span>
          <span className={`text-xs ${colorClass}`}>{msg}</span>
        </div>

        <ErrorMessage
          name="tags"
          component="div"
          className="text-red-500 text-xs mt-1"
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
        <label htmlFor="isVerified" className="text-xs text-white">
          Marcar como verificado
        </label>
      </div>

      {/* Galería */}
      <DropzoneGaleria
        values={values.images || []}
        onChange={(files) => setFieldValue("images", files)}
        label="Galería de imágenes del negocio"
        maxImages={20}
        className="text-white"
      />
      <ErrorMessage
        name="images"
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
}
