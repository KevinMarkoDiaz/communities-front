import { useFormikContext, ErrorMessage, Field } from "formik";
import DropzoneImagen from "../../../DropzoneImagen";

export default function Paso3Ubicacion() {
  const { values, setFieldValue } = useFormikContext();

  return (
    <div className="space-y-6">
      <h3 className="text-white text-lg font-semibold">Imagen y ubicación</h3>

      {/* Imagen con Dropzone */}
      <div>
        <DropzoneImagen
          value={values.profileImage}
          onChange={(file) => setFieldValue("profileImage", file)}
          label="Imagen de perfil"
        />
        <ErrorMessage
          name="profileImage"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* Ubicación */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Ubicación
        </label>
        <Field
          name="location"
          placeholder="Dallas, TX"
          className="w-full px-4 py-3 border border-white/30 bg-white/10 rounded-lg placeholder:text-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <ErrorMessage
          name="location"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>

      {/* País */}
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          País
        </label>
        <Field
          name="country"
          placeholder="Estados Unidos"
          className="w-full px-4 py-3 border border-white/30 bg-white/10 rounded-lg placeholder:text-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <ErrorMessage
          name="country"
          component="div"
          className="text-red-400 text-sm mt-1"
        />
      </div>
    </div>
  );
}
