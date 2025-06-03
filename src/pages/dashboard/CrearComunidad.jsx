import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { createCommunity } from "../../api/communityApi";
import { useNavigate } from "react-router-dom";

const esquemaComunidad = Yup.object().shape({
  name: Yup.string().required("Nombre obligatorio"),
  description: Yup.string().required("Descripción obligatoria"),
  language: Yup.string().default("es"),
  flagImage: Yup.string().url("Debe ser una URL válida").optional(),
});

export default function CrearComunidad() {
  const token = useSelector((state) => state.auth.token);
  const usuario = useSelector((state) => state.auth.usuario);
  const navigate = useNavigate();

  if (!["admin", "business_owner"].includes(usuario.role)) {
    return <div className="p-4 text-red-600">Acceso no autorizado</div>;
  }

  const handleSubmit = async (valores, { setSubmitting }) => {
    try {
      const datos = {
        ...valores,
        owner: usuario._id,
      };

      await createCommunity(datos, token);
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
          flagImage: "",
        }}
        validationSchema={esquemaComunidad}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <Field
                name="name"
                placeholder="Nombre de la comunidad"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                name="description"
                as="textarea"
                placeholder="Descripción"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none min-h-[100px]"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                name="language"
                placeholder="Idioma (es, en, pt...)"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage
                name="language"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                name="flagImage"
                placeholder="URL de la bandera (opcional)"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <ErrorMessage
                name="flagImage"
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
