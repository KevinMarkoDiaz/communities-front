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
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Crear comunidad</h2>

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
            <Field
              name="name"
              placeholder="Nombre"
              className="w-full border px-4 py-2 rounded"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-600 text-sm"
            />

            <Field
              name="description"
              placeholder="Descripción"
              className="w-full border px-4 py-2 rounded"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-600 text-sm"
            />

            <Field
              name="language"
              placeholder="Idioma (es, en...)"
              className="w-full border px-4 py-2 rounded"
            />
            <ErrorMessage
              name="language"
              component="div"
              className="text-red-600 text-sm"
            />

            <Field
              name="flagImage"
              placeholder="URL de bandera (opcional)"
              className="w-full border px-4 py-2 rounded"
            />
            <ErrorMessage
              name="flagImage"
              component="div"
              className="text-red-600 text-sm"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Crear comunidad
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
