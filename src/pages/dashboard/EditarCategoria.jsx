import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCategoryById, updateCategory } from "../../api/categoryApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const esquemaCategoria = Yup.object().shape({
  name: Yup.string().required("Nombre obligatorio"),
  description: Yup.string().required("Descripción obligatoria"),
  icon: Yup.string().optional(),
});

export default function EditarCategoria() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const usuario = useSelector((state) => state.auth.usuario);

  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (usuario.role !== "admin") {
      setError("Acceso no autorizado");
      setLoading(false);
      return;
    }

    const cargar = async () => {
      try {
        const data = await getCategoryById(id);
        setCategoria(data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la categoría");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [id, usuario.role]);

  const handleSubmit = async (valores, { setSubmitting }) => {
    try {
      await updateCategory(id, valores, token);
      navigate("/dashboard/categorias");
    } catch (err) {
      console.error("Error al actualizar categoría:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-4">Cargando datos...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!categoria) return <div className="p-4">Categoría no encontrada.</div>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        Editar categoría
      </h2>

      <Formik
        initialValues={{
          name: categoria.name || "",
          description: categoria.description || "",
          icon: categoria.icon || "",
        }}
        enableReinitialize
        validationSchema={esquemaCategoria}
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
              name="icon"
              placeholder="Icono (opcional)"
              className="w-full border px-4 py-2 rounded"
            />
            <ErrorMessage
              name="icon"
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
