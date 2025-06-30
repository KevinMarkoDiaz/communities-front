import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DropzoneImagen from "../../components/DropzoneImagen";
import { createCategory } from "../../api/categoryApi";

const esquemaCategoria = Yup.object().shape({
  name: Yup.string().required("Nombre obligatorio"),
  description: Yup.string().required("Descripción obligatoria"),
  icon: Yup.mixed().required("Icono obligatorio"),
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
      const formData = new FormData();

      const data = {
        name: valores.name,
        description: valores.description,
        createdBy: usuario._id,
      };

      formData.append("data", JSON.stringify(data));

      if (valores.icon && typeof valores.icon !== "string") {
        formData.append("profileImage", valores.icon); // ⬅️ nombre esperado por Multer + Cloudinary
      }
      for (let [key, value] of formData.entries()) {
      }

      await createCategory(formData, token);
      alert("✅ Categoría creada correctamente");
      navigate("/dashboard/categorias");
    } catch (err) {
      console.error("❌ Error al crear categoría:", err);
      alert("Ocurrió un error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-[#141C24]">
        Nueva categoría
      </h2>

      <Formik
        initialValues={{
          name: "",
          description: "",
          icon: null,
        }}
        validationSchema={esquemaCategoria}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
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
              <DropzoneImagen
                value={values.icon}
                onChange={(file) => setFieldValue("icon", file)}
                label="Icono de la categoría"
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
