import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { createCommunity } from "../../api/communityApi";
import { useNavigate } from "react-router-dom";
import DropzoneImagen from "../../components/DropzoneImagen";

const esquemaComunidad = Yup.object().shape({
  name: Yup.string().required("Nombre obligatorio"),
  description: Yup.string().required("Descripción obligatoria"),
  language: Yup.string().required("Idioma obligatorio"),
  tipo: Yup.string().required("Tipo obligatorio"),
  flagImage: Yup.mixed().nullable(),
  bannerImage: Yup.mixed().nullable(),
});

export default function CrearComunidad() {
  const usuario = useSelector((state) => state.auth.usuario);
  const navigate = useNavigate();

  if (!["admin", "business_owner"].includes(usuario.role)) {
    return <div className="p-4 text-red-600">Acceso no autorizado</div>;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();

      // Imágenes (pueden venir como File)
      if (values.flagImage) formData.append("flagImage", values.flagImage);
      if (values.bannerImage)
        formData.append("bannerImage", values.bannerImage);

      // Datos JSON (INCLUYE owner, name, etc.)
      const payload = {
        name: values.name,
        description: values.description,
        language: values.language,
        tipo: "migrante",
        owner: usuario.id, // <- ✅ esto estaba faltando
      };

      formData.append("data", JSON.stringify(payload));

      // DEBUG
      for (const pair of formData.entries()) {
        console.log(usuario.id);
        console.log("📦 FormData =>", pair[0], pair[1]);
      }

      await createCommunity(formData); // axiosInstance ya tiene withCredentials
      navigate("/dashboard/comunidades");
    } catch (err) {
      console.error("Error al crear comunidad:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 bg-white rounded-2xl shadow-sm border border-[#E4E9F1]">
      <h2 className="text-[#141C24] text-2xl font-bold tracking-tight pb-4">
        Crear comunidad
      </h2>

      <Formik
        initialValues={{
          name: "",
          description: "",
          language: "es",
          tipo: "migrante",
          flagImage: null,
          bannerImage: null,
          owner: "",
        }}
        validationSchema={esquemaComunidad}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nombre de la comunidad
              </label>
              <Field
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Descripción
              </label>
              <Field
                name="description"
                as="textarea"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none min-h-[100px]"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Idioma</label>
              <Field
                name="language"
                placeholder="es"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
              <ErrorMessage
                name="language"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Tipo de comunidad
              </label>
              <Field
                as="select"
                name="tipo"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              >
                <option value="migrante">Migrante</option>
                <option value="cultural">Cultural</option>
                <option value="social">Social</option>
              </Field>
              <ErrorMessage
                name="tipo"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Imagen de bandera
              </label>
              <DropzoneImagen
                value={values.flagImage}
                name="flagImage"
                onChange={(file) => setFieldValue("flagImage", file)}
              />
              <ErrorMessage
                name="flagImage"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Imagen destacada
              </label>
              <DropzoneImagen
                value={values.bannerImage}
                name="bannerImage"
                onChange={(file) => setFieldValue("bannerImage", file)}
              />
              <ErrorMessage
                name="bannerImage"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-xl hover:bg-blue-700 transition-all"
            >
              Crear comunidad
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
