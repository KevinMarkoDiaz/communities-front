import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customSelectStylesForm } from "../../styles/customSelectStylesForm";
import DropzoneImagen from "../../components/DropzoneImagen";
import { useCargarCategorias } from "../../hooks/useCargarCategorias";
import Select from "react-select";
import { createPromo } from "../../store/promocionesSlice";

// Al principio (Yup)
const schema = Yup.object().shape({
  name: Yup.string().required("Nombre obligatorio"),
  description: Yup.string().required("Descripción obligatoria"),
  type: Yup.string().required("Tipo obligatorio"),
  startDate: Yup.date().required("Fecha de inicio obligatoria"),
  endDate: Yup.date().required("Fecha de fin obligatoria"),
  image: Yup.mixed().required("Imagen obligatoria"),
  community: Yup.string().required("Comunidad obligatoria"),
  business: Yup.string().required("Negocio obligatorio"),
  maxClaims: Yup.number()
    .nullable()
    .min(1, "Debe ser al menos 1")
    .typeError("Debe ser un número"),
});

export default function PromoForm() {
  const dispatch = useDispatch();
  useCargarCategorias();
  const { negocioId } = useParams();
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
    business: negocioId,
    maxClaims: "", // nuevo campo
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
        business: values.business,
        category: values.category,
        community: values.community,
        createdBy: usuario._id,
        maxClaims: values.maxClaims || null, // importante
      };

      formData.append("data", JSON.stringify(data));
      formData.append("featuredImage", values.image);

      await dispatch(createPromo(formData)).unwrap();
      navigate("/dashboard/mis-negocios");
    } catch (err) {
      // El feedback ya se maneja desde el thunk con mostrarFeedback
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnChange={false}
      enableReinitialize
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto p-4 md:p-8 bg-black/40 backdrop-blur-lg md:rounded-2xl shadow-2xl text-white">
          <div className="flex-1 space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Nombre
              </label>
              <Field
                name="name"
                className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
                placeholder="Nombre de la promoción"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Descripción
              </label>
              <Field
                as="textarea"
                name="description"
                className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg placeholder:text-gray-300 focus:outline-none"
                placeholder="Describe tu promoción"
                rows={3}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Tipo de promoción
              </label>
              <Select
                menuPlacement="top"
                options={[
                  {
                    value: "promo_fin_de_semana",
                    label: "Promo fin de semana",
                  },
                  {
                    value: "descuentos_imperdibles",
                    label: "Descuentos imperdibles",
                  },
                  {
                    value: "nuevos_lanzamientos",
                    label: "Nuevos lanzamientos",
                  },
                ]}
                value={
                  [
                    {
                      value: "promo_fin_de_semana",
                      label: "Promo fin de semana",
                    },
                    {
                      value: "descuentos_imperdibles",
                      label: "Descuentos imperdibles",
                    },
                    {
                      value: "nuevos_lanzamientos",
                      label: "Nuevos lanzamientos",
                    },
                  ].find((option) => option.value === values.type) || null
                }
                placeholder="Selecciona el tipo de promoción..."
                styles={customSelectStylesForm}
                onChange={(opt) => setFieldValue("type", opt.value)}
              />
              <ErrorMessage
                name="type"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Desde
                </label>
                <Field
                  type="date"
                  name="startDate"
                  className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg text-white focus:outline-none"
                />
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-red-400 text-sm mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Hasta
                </label>
                <Field
                  type="date"
                  name="endDate"
                  className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg text-white focus:outline-none"
                />
                <ErrorMessage
                  name="endDate"
                  component="div"
                  className="text-red-400 text-sm mt-1"
                />
              </div>
            </div>

            {/* Comunidad */}
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Comunidad
              </label>
              <Select
                menuPlacement="top"
                options={comunidades?.map((c) => ({
                  value: c._id,
                  label: c.name,
                }))}
                value={
                  comunidades?.find((c) => c._id === values.community)
                    ? {
                        value: values.community,
                        label: comunidades.find(
                          (c) => c._id === values.community
                        )?.name,
                      }
                    : null
                }
                placeholder="Selecciona una comunidad..."
                styles={customSelectStylesForm}
                onChange={(opt) => setFieldValue("community", opt.value)}
              />
              <ErrorMessage
                name="community"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Categoría
              </label>
              <Select
                menuPlacement="top"
                options={categorias?.map((c) => ({
                  value: c._id,
                  label: c.name,
                }))}
                value={
                  categorias?.find((c) => c._id === values.category)
                    ? {
                        value: values.category,
                        label: categorias.find((c) => c._id === values.category)
                          ?.name,
                      }
                    : null
                }
                placeholder="Selecciona una categoría..."
                styles={customSelectStylesForm}
                onChange={(opt) => setFieldValue("category", opt.value)}
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Límite de cupones disponibles{" "}
                <span className="text-white/60">(opcional)</span>
              </label>
              <Field
                name="maxClaims"
                type="number"
                className="w-full px-4 py-3 border border-white/40 bg-white/10 rounded-lg text-white placeholder:text-gray-300 focus:outline-none"
                placeholder="Ej: 100"
              />
              <ErrorMessage
                name="maxClaims"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>
            {/* Imagen */}
            <div>
              <DropzoneImagen
                value={values.image}
                nombreCampo="image"
                onChange={(file) => setFieldValue("image", file)}
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition"
            >
              {isSubmitting ? "Guardando..." : "Crear Promoción"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
