import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCommunityById, updateCommunity } from "../../api/communityApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DropzoneImagen from "../../components/DropzoneImagen";

const esquemaComunidad = Yup.object().shape({
  name: Yup.string().required("Nombre obligatorio"),
  description: Yup.string().required("Descripción obligatoria"),
  language: Yup.string().required("Idioma obligatorio"),
  tipo: Yup.string().required("Tipo obligatorio"),
  flagImage: Yup.mixed().nullable(),
  bannerImage: Yup.mixed().nullable(),
});

export default function EditarComunidad() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();

      if (values.flagImage && typeof values.flagImage !== "string") {
        formData.append("flagImage", values.flagImage);
      }

      if (values.bannerImage && typeof values.bannerImage !== "string") {
        formData.append("bannerImage", values.bannerImage);
      }

      const payload = {
        name: values.name,
        description: values.description,
        language: values.language,
        tipo: values.tipo,
        owner: comunidad.owner,
      };

      formData.append("data", JSON.stringify(payload));

      await updateCommunity(id, formData);
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
          tipo: comunidad.tipo || "migrante",
          flagImage: comunidad.flagImage || null,
          bannerImage: comunidad.bannerImage || null,
        }}
        enableReinitialize
        validationSchema={esquemaComunidad}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nombre de la comunidad
              </label>
              <Field
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Descripción
              </label>
              <Field
                name="description"
                as="textarea"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none min-h-[100px]"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Idioma</label>
              <Field
                name="language"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
              <ErrorMessage
                name="language"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Tipo de comunidad
              </label>
              <Field
                as="select"
                name="tipo"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              >
                <option value="migrante">Migrante</option>
                <option value="cultural">Cultural</option>
                <option value="social">Social</option>
              </Field>
              <ErrorMessage
                name="tipo"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Imagen de bandera
              </label>
              <DropzoneImagen
                value={values.flagImage}
                name="flagImage"
                onChange={(file) => setFieldValue("flagImage", file)}
              />
              <ErrorMessage
                name="flagImage"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Imagen destacada
              </label>
              <DropzoneImagen
                value={values.bannerImage}
                name="bannerImage"
                onChange={(file) => setFieldValue("bannerImage", file)}
              />
              <ErrorMessage
                name="bannerImage"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 rounded-xl hover:bg-blue-700 transition-all"
            >
              Guardar cambios
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
