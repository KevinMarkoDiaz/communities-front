import { useFormikContext, ErrorMessage } from "formik";
import DropzoneImagen from "../../../DropzoneImagen";

export default function Paso3Imagen() {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="space-y-6">
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
    </div>
  );
}
