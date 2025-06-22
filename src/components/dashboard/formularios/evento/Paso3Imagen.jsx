import { useFormikContext, ErrorMessage } from "formik";
import DropzoneImagen from "../../../DropzoneImagen";
import DropzoneGaleria from "../../../DropzoneGaleria"; // 👈 asegurate que esté importado

export default function Paso3Imagen() {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="space-y-6">
      {/* Imagen destacada */}
      <div>
        <DropzoneImagen
          value={values.image}
          onChange={(file) => setFieldValue("image", file)}
          label="Imagen destacada del evento"
        />
        <ErrorMessage
          name="image"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Galería */}
      <div>
        <DropzoneGaleria
          values={values.images}
          onChange={(files) => setFieldValue("images", files)}
          label="Galería de imágenes del evento"
        />
        {/* No es requerido, pero si querés validarlo podrías agregar campo 'images' a Yup */}
      </div>
    </div>
  );
}
