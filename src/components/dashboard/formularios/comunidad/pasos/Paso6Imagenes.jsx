import { ErrorMessage, useFormikContext } from "formik";
import DropzoneImagen from "../../../../DropzoneImagen";

export default function Paso6Imagenes() {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-[#141C24]">Imágenes</h3>

      {/* Imagen de bandera */}
      <DropzoneImagen
        value={values.flagImage}
        onChange={(file) => setFieldValue("flagImage", file)}
        label="Bandera de la comunidad (formato JPG, PNG o WEBP)"
      />
      <ErrorMessage
        name="flagImage"
        component="div"
        className="text-red-500 text-sm"
      />

      {/* Imagen destacada */}
      <DropzoneImagen
        value={values.bannerImage}
        onChange={(file) => setFieldValue("bannerImage", file)}
        label="Imagen destacada o banner principal"
      />
      <ErrorMessage
        name="bannerImage"
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
}
