// src/pages/dashboard/EditarCategoriaView.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getCategoryById, updateCategory } from "../../api/categoryApi";
import { Helmet } from "react-helmet-async";
import DropzoneImagen from "../../components/DropzoneImagen";
import authBg from "../../../src/assets/authbg.png";
import ilust2 from "../../assets/ilust2.svg";
import { useDispatch } from "react-redux";
import { mostrarFeedback } from "../../store/feedbackSlice"; // ajustá el path según tu estructura
import SkeletonNegocioForm from "../../components/Skeleton/SkeletonNegocioForm";

const esquemaCategoria = Yup.object().shape({
  name: Yup.string().required("Nombre obligatorio"),
  description: Yup.string().required("Descripción obligatoria"),
  icon: Yup.mixed().required("Icono obligatorio"),
});

export default function EditarCategoriaView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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

  if (!categoria)
    return <div className="p-4 text-red-600">No se encontró la categoría.</div>;

  const handleSubmit = async (valores, { setSubmitting }) => {
    try {
      const formData = new FormData();

      const data = {
        name: valores.name,
        description: valores.description,
      };

      formData.append("data", JSON.stringify(data));

      if (valores.icon && typeof valores.icon !== "string") {
        formData.append("profileImage", valores.icon);
      }

      await updateCategory(id, formData, token);

      dispatch(
        mostrarFeedback({
          type: "success",
          message: "✅ Categoría actualizada correctamente",
        })
      );

      navigate("/dashboard/categorias");
    } catch (err) {
      dispatch(
        mostrarFeedback({
          type: "error",
          message: "❌ Ocurrió un error al actualizar la categoría",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Editar Categoría | Dashboard</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-screen md:px-4 mt-8 lg:mt-16">
        <section
          className="w-full max-w-2xl shadow rounded-2xl p-6 sm:p-16 space-y-6 bg-black/40 backdrop-blur-lg"
          style={{
            backgroundImage: `url(${authBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl h-full"></div>
          <div className="flex gap-2">
            <div className="space-y-2 relative grid ">
              <h1 className="text-2xl font-bold text-[#141C24]">
                Editar Categoría
              </h1>
              <p className="text-gray-700 text-sm sm:text-base">
                Actualiza los detalles de tu categoría para mantener tu catálogo
                organizado ✨
              </p>
            </div>
            <img
              src={ilust2}
              alt="Ilustración comunidad"
              className="w-36 xl:w-52 opacity-90"
            />
          </div>
          <section className="w-full max-w-2xl shadow rounded-2xl p-6 md:p-8 space-y-6 bg-black/40 backdrop-blur-lg">
            {loading ? (
              <SkeletonNegocioForm />
            ) : (
              <Formik
                initialValues={{
                  name: categoria.name,
                  description: categoria.description || "",
                  icon: categoria.icon || "",
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
                      <label className="block text-sm font-medium text-white mb-1">
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
                        className="text-red-400 text-sm mt-1"
                      />
                    </div>

                    {/* Descripción */}
                    <div>
                      <label className="block text-sm font-medium text-white mb-1">
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
                        className="text-red-400 text-sm mt-1"
                      />
                    </div>

                    {/* Icono con dropzone */}
                    <div>
                      <DropzoneImagen
                        value={values.icon}
                        onChange={(file) => setFieldValue("icon", file)}
                        label="Icono de la categoría"
                      />
                      <ErrorMessage
                        name="icon"
                        component="div"
                        className="text-red-400 text-sm mt-1"
                      />
                    </div>

                    {/* Botón */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                      {isSubmitting ? "Guardando..." : "Guardar cambios"}
                    </button>
                  </Form>
                )}
              </Formik>
            )}
          </section>
        </section>

        <div className="pt-6 text-center">
          <p className="text-[#141C24] text-base font-medium">
            🌟 Mantén tu catálogo actualizado y profesional.
          </p>
          <p className="text-sm text-gray-600">
            Las categorías ayudan a tus usuarios a encontrar lo que buscan
            fácilmente.
          </p>
        </div>
      </div>
    </>
  );
}
