import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, updateEvent } from "../../api/eventApi";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const esquemaEvento = Yup.object().shape({
  title: Yup.string().required("Título obligatorio"),
  description: Yup.string().required("Descripción obligatoria"),
  date: Yup.date().required("Fecha obligatoria"),
  location: Yup.string().required("Ubicación obligatoria"),
  image: Yup.string().url("Debe ser una URL válida").optional(),
});

export default function EditarEvento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getEventById(id);
        setEvento(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el evento");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [id]);

  const handleSubmit = async (valores, { setSubmitting }) => {
    try {
      await updateEvent(id, valores, token);
      navigate("/dashboard/mis-eventos");
    } catch (err) {
      console.error("Error al actualizar evento:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-4">Cargando datos...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!evento) return <div className="p-4">Evento no encontrado.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Editar evento</h2>

      <Formik
        initialValues={{
          title: evento.title || "",
          description: evento.description || "",
          date: evento.date ? evento.date.slice(0, 10) : "",
          location: evento.location || "",
          image: evento.image || "",
        }}
        enableReinitialize
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
              Guardar cambios
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
