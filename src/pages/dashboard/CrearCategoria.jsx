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
    <div className="max-w-xl mx-auto p-4 bg-white ">
      <h2 className="text-2xl font-bold mb-6 text-[#141C24]">
        Nueva categoría
      </h2>

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
          <Form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <Field
                name="name"
                placeholder="Nombre de la categoría"
                className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
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
                placeholder="Descripción breve"
                className="form-textarea w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl px-4 py-3"
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
                placeholder="URL del icono (opcional)"
                className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
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
              Crear Categoría
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
