import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCommunityById, updateCommunity } from "../../api/communityApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const esquemaComunidad = Yup.object().shape({
  name: Yup.string().required("Nombre obligatorio"),
  description: Yup.string().required("Descripción obligatoria"),
  language: Yup.string().required("Idioma obligatorio"),
  flagImage: Yup.string().url("Debe ser una URL válida").optional(),
});

export default function EditarComunidad() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const usuario = useSelector((state) => state.auth.usuario);

  const [comunidad, setComunidad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getCommunityById(id);

        // Validar permisos
        if (usuario.role !== "admin" && usuario._id !== data.owner) {
          setError("Acceso no autorizado");
          return;
        }

        setComunidad(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar comunidad");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [id, usuario]);

  const handleSubmit = async (valores, { setSubmitting }) => {
    try {
      await updateCommunity(id, valores, token);
      navigate("/dashboard/comunidades");
    } catch (err) {
      console.error("Error al actualizar comunidad:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-4">Cargando datos...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!comunidad) return <div className="p-4">Comunidad no encontrada.</div>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Editar comunidad
      </h2>

      <Formik
        initialValues={{
          name: comunidad.name || "",
          description: comunidad.description || "",
          language: comunidad.language || "es",
          flagImage: comunidad.flagImage || "",
        }}
        enableReinitialize
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
              placeholder="Idioma"
              className="w-full border px-4 py-2 rounded"
            />
            <ErrorMessage
              name="language"
              component="div"
              className="text-red-600 text-sm"
            />

            <Field
              name="flagImage"
              placeholder="URL de bandera"
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
              Guardar cambios
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
