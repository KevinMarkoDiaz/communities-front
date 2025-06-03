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

        if (usuario.role !== "admin" && usuario._id !== data.community.owner) {
          setError("Acceso no autorizado");
          return;
        }

        setComunidad(data.community);
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow space-y-6">
      <h2 className="text-2xl font-bold text-[#141C24]">Editar comunidad</h2>

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
            <div>
              <Field
                name="name"
                placeholder="Nombre de la comunidad"
                className="w-full px-4 py-2 rounded-xl border border-[#E4E9F1] focus:outline-none focus:ring-2 focus:ring-[#F4C753]"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-sm text-red-600 mt-1"
              />
            </div>

            <div>
              <Field
                name="description"
                placeholder="Descripción"
                as="textarea"
                className="w-full px-4 py-2 rounded-xl border border-[#E4E9F1] resize-none h-24 focus:outline-none focus:ring-2 focus:ring-[#F4C753]"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-sm text-red-600 mt-1"
              />
            </div>

            <div>
              <Field
                name="language"
                placeholder="Idioma (es, en...)"
                className="w-full px-4 py-2 rounded-xl border border-[#E4E9F1] focus:outline-none focus:ring-2 focus:ring-[#F4C753]"
              />
              <ErrorMessage
                name="language"
                component="div"
                className="text-sm text-red-600 mt-1"
              />
            </div>

            <div>
              <Field
                name="flagImage"
                placeholder="URL de la bandera"
                className="w-full px-4 py-2 rounded-xl border border-[#E4E9F1] focus:outline-none focus:ring-2 focus:ring-[#F4C753]"
              />
              <ErrorMessage
                name="flagImage"
                component="div"
                className="text-sm text-red-600 mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#F4C753] text-[#141C24] py-2 rounded-xl font-semibold hover:bg-[#e7b93e] transition"
            >
              Guardar cambios
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
