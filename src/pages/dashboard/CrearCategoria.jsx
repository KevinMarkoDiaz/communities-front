// src/pages/dashboard/CrearCategoria.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DropzoneImagen from "../../components/DropzoneImagen";
import { createCategory } from "../../api/categoryApi";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { mostrarFeedback } from "../../store/feedbackSlice"; // ajustá el path si cambia

const esquemaCategoria = Yup.object().shape({
  name: Yup.string().required("Nombre obligatorio"),
  description: Yup.string().required("Descripción obligatoria"),
  icon: Yup.mixed().required("Icono obligatorio"),
});

export default function CrearCategoria() {
  const token = useSelector((state) => state.auth.token);
  const usuario = useSelector((state) => state.auth.usuario);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        formData.append("profileImage", valores.icon);
      }

      await createCategory(formData, token);

      dispatch(
        mostrarFeedback({
          type: "success",
          message: "✅ Categoría creada correctamente",
        })
      );

      navigate("/dashboard/categorias");
    } catch (err) {
      dispatch(
        mostrarFeedback({
          type: "error",
          message: "❌ Ocurrió un error al crear la categoría",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Nueva Categoría | Dashboard</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center md:px-4 ">
        <section className="w-full max-w-2xl shadow md:rounded-2xl p-4 md:p-8 space-y-6 bg-black/40 backdrop-blur-lg">
          <Formik
            initialValues={{
              name: "",
              description: "",
              icon: null,
            }}
            validationSchema={esquemaCategoria}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="space-y-6">
                {/* Nombre */}
                <div>
                  <label className="block  text-xs font-medium text-white mb-1">
                    Nombre
                  </label>
                  <Field
                    name="name"
                    placeholder="Nombre de la categoría"
                    className="w-full px-4 py-3 border border-white/30 bg-white/10 rounded-lg placeholder:text-gray-300 text-white focus:outline-none"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-400  text-xs mt-1"
                  />
                </div>

                {/* Descripción */}
                <div>
                  <label className="block  text-xs font-medium text-white mb-1">
                    Descripción
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder="Descripción breve"
                    rows={3}
                    className="w-full px-4 py-3 border border-white/30 bg-white/10 rounded-lg placeholder:text-gray-300 text-white focus:outline-none"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-400  text-xs mt-1"
                  />
                </div>

                {/* Icono */}
                <div>
                  <DropzoneImagen
                    value={values.icon}
                    onChange={(file) => setFieldValue("icon", file)}
                    label="Icono de la categoría"
                  />
                  <ErrorMessage
                    name="icon"
                    component="div"
                    className="text-red-400  text-xs mt-1"
                  />
                </div>

                {/* Botón */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  {isSubmitting ? "Creando..." : "Crear Categoría"}
                </button>
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </>
  );
}
