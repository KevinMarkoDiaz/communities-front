import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { createCategory } from "../../api/categoryApi";
import { useNavigate } from "react-router-dom";

const esquemaCategoria = Yup.object().shape({
  name: Yup.string().required("Nombre obligatorio"),
  description: Yup.string().required("Descripción obligatoria"),
  icon: Yup.string().optional(),
});

export default function CrearCategoria() {
  const token = useSelector((state) => state.auth.token);
  const usuario = useSelector((state) => state.auth.usuario);
  const navigate = useNavigate();

  if (usuario.role !== "admin") {
    return <div className="p-4 text-red-600">Acceso no autorizado</div>;
  }

  const handleSubmit = async (valores, { setSubmitting }) => {
    try {
      const data = {
        ...valores,
        createdBy: usuario._id,
      };

      await createCategory(data, token);
      navigate("/dashboard/categorias");
    } catch (err) {
      console.error("Error al crear categoría:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Nueva categoría</h2>

      <Formik
        initialValues={{
          name: "",
          description: "",
          icon: "",
        }}
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
              Crear
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
