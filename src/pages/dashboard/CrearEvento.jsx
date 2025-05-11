import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createEvent } from "../../api/eventApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const esquemaEvento = Yup.object().shape({
  title: Yup.string().required("Título obligatorio"),
  description: Yup.string().required("Descripción obligatoria"),
  date: Yup.date().required("Fecha obligatoria"),
  location: Yup.string().required("Ubicación obligatoria"),
  image: Yup.string().url("Debe ser una URL válida").optional(),
});

export default function CrearEvento() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const usuario = useSelector((state) => state.auth.usuario);

  const handleSubmit = async (valores, { setSubmitting }) => {
    try {
      const payload = {
        ...valores,
        organizer: usuario._id,
        organizerModel: "User", // o "Business" si lo hacés como empresa
        communities: [], // ⚠️ Ajustar cuando haya selección real
        businesses: [],
        categories: [],
      };

      await createEvent(payload, token);
      navigate("/dashboard/mis-eventos");
    } catch (error) {
      console.error("Error al crear evento:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Crear evento</h2>

      <Formik
        initialValues={{
          title: "",
          description: "",
          date: "",
          location: "",
          image: "",
        }}
        validationSchema={esquemaEvento}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">
            <Field
              name="title"
              placeholder="Título"
              className="w-full border px-4 py-2 rounded"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-600 text-sm"
            />

            <Field
              name="description"
              as="textarea"
              placeholder="Descripción"
              className="w-full border px-4 py-2 rounded"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-600 text-sm"
            />

            <Field
              name="date"
              type="date"
              className="w-full border px-4 py-2 rounded"
            />
            <ErrorMessage
              name="date"
              component="div"
              className="text-red-600 text-sm"
            />

            <Field
              name="location"
              placeholder="Ubicación"
              className="w-full border px-4 py-2 rounded"
            />
            <ErrorMessage
              name="location"
              component="div"
              className="text-red-600 text-sm"
            />

            <Field
              name="image"
              placeholder="URL de imagen (opcional)"
              className="w-full border px-4 py-2 rounded"
            />
            <ErrorMessage
              name="image"
              component="div"
              className="text-red-600 text-sm"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Crear evento
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
