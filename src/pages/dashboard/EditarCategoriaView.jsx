import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getCategoryById, updateCategory } from "../../api/categoryApi";
import { Helmet } from "react-helmet-async";

const esquemaCategoria = Yup.object().shape({
  name: Yup.string().required("Nombre obligatorio"),
  description: Yup.string().required("Descripción obligatoria"),
  icon: Yup.string(),
});

export default function EditarCategoriaView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarCategoria = async () => {
      try {
        const res = await getCategoryById(id);
        setCategoria(res.category);
      } catch (err) {
        console.error("Error al cargar categoría:", err);
      } finally {
        setLoading(false);
      }
    };

    cargarCategoria();
  }, [id]);

  if (loading) return <div className="p-4">Cargando categoría...</div>;
  if (!categoria)
    return <div className="p-4 text-red-600">No se encontró la categoría.</div>;

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

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded-xl">
      <Helmet>
        <title>Editar Categoría | Dashboard</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-6 text-[#141C24]">
        Editar categoría
      </h2>

      <Formik
        initialValues={{
          name: categoria.name,
          description: categoria.description || "",
          icon: categoria.icon || "",
        }}
        validationSchema={esquemaCategoria}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <Field
                name="name"
                className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
                placeholder="Nombre de la categoría"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Descripción
              </label>
              <Field
                as="textarea"
                name="description"
                className="form-textarea w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl px-4 py-3"
                placeholder="Descripción breve"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Icono</label>
              <Field
                name="icon"
                className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
                placeholder="URL del icono (opcional)"
              />
              <ErrorMessage
                name="icon"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#141C24] text-white py-3 rounded-xl font-semibold hover:bg-[#1c2430] transition"
            >
              Guardar cambios
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
