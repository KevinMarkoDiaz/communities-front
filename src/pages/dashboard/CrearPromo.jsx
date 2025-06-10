import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createPromotion } from "../../api/promotionApi";
import DropzoneImagen from "../../components/DropzoneImagen";
import { useCargarCategorias } from "../../hooks/useCargarCategorias";

const schema = Yup.object().shape({
  name: Yup.string().required("Nombre obligatorio"),
  description: Yup.string().required("Descripción obligatoria"),
  type: Yup.string().required("Tipo obligatorio"),
  startDate: Yup.date().required("Fecha de inicio obligatoria"),
  endDate: Yup.date().required("Fecha de fin obligatoria"),
  image: Yup.mixed().required("Imagen obligatoria"),
  community: Yup.string().required("Comunidad obligatoria"),
});

export default function CrearPromo() {
  useCargarCategorias();
  const { id: negocioId } = useParams();
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.auth.usuario);
  const comunidades = useSelector((state) => state.comunidades.lista);
  const categorias = useSelector((state) => state.categorias.data) || [];

  const initialValues = {
    name: "",
    description: "",
    type: "promo_fin_de_semana",
    startDate: "",
    endDate: "",
    image: null,
    category: "",
    community: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      const formData = new FormData();

      const data = {
        name: values.name,
        description: values.description,
        type: values.type,
        startDate: values.startDate,
        endDate: values.endDate,
        business: negocioId,
        category: values.category,
        community: values?.community,
        createdBy: usuario._id,
      };

      formData.append("data", JSON.stringify(data));
      formData.append("featuredImage", values.image);

      await createPromotion(formData);
      alert("✅ Promoción creada correctamente");
      navigate("/dashboard/mis-negocios");
    } catch (err) {
      console.error("❌ Error al crear promoción:", err);
      alert("Error al guardar la promoción");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-6">Crear Promoción</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <Field
                name="name"
                className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Descripción
              </label>
              <Field
                as="textarea"
                name="description"
                className="form-textarea w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl p-3"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Tipo de promoción
              </label>
              <Field
                as="select"
                name="type"
                className="form-select w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
              >
                <option value="promo_fin_de_semana">Promo fin de semana</option>
                <option value="descuentos_imperdibles">
                  Descuentos imperdibles
                </option>
                <option value="nuevos_lanzamientos">Nuevos lanzamientos</option>
              </Field>
              <ErrorMessage
                name="type"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Desde</label>
                <Field
                  type="date"
                  name="startDate"
                  className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
                />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Hasta</label>
                <Field
                  type="date"
                  name="endDate"
                  className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
                />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Comunidad
              </label>
              <Field
                as="select"
                name="community"
                className="form-select w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
              >
                <option value="">Selecciona una comunidad</option>
                {comunidades?.map((com) => (
                  <option key={com._id} value={com._id}>
                    {com.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="community"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Categoría
              </label>
              <Field
                as="select"
                name="category"
                className="form-select w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Imagen */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Imagen destacada
              </label>
              <DropzoneImagen
                value={values.image}
                nombreCampo="image"
                onChange={(file) => setFieldValue("image", file)}
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#111827] text-white font-semibold py-3 rounded-xl hover:bg-[#1f2937] transition"
            >
              {isSubmitting ? "Guardando..." : "Crear Promoción"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
