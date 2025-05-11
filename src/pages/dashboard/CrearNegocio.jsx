import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { createBusiness } from "../../api/businessApi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const esquemaNegocio = Yup.object().shape({
  name: Yup.string().required("Nombre obligatorio"),
  description: Yup.string().required("Descripción obligatoria"),
  category: Yup.string().required("Categoría obligatoria"),
  community: Yup.string().required("Comunidad obligatoria"),
  location: Yup.object().shape({
    address: Yup.string().required("Dirección obligatoria"),
    city: Yup.string().required("Ciudad obligatoria"),
    state: Yup.string().required("Estado obligatorio"),
    country: Yup.string().required("País obligatorio"),
  }),
})

export default function CrearNegocio() {
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)

  const handleSubmit = async (valores, { setSubmitting }) => {
    try {
      await createBusiness(valores, token)
      navigate("/dashboard/mis-negocios")
    } catch (error) {
      console.error("Error al crear negocio:", error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Crear negocio</h2>

      <Formik
        initialValues={{
          name: "",
          description: "",
          category: "",
          community: "",
          location: {
            address: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
          },
        }}
        validationSchema={esquemaNegocio}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">

            <Field name="name" placeholder="Nombre del negocio" className="w-full border px-4 py-2 rounded" />
            <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />

            <Field name="description" as="textarea" placeholder="Descripción" className="w-full border px-4 py-2 rounded" />
            <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />

            <Field name="category" placeholder="ID de categoría" className="w-full border px-4 py-2 rounded" />
            <ErrorMessage name="category" component="div" className="text-red-600 text-sm" />

            <Field name="community" placeholder="ID de comunidad" className="w-full border px-4 py-2 rounded" />
            <ErrorMessage name="community" component="div" className="text-red-600 text-sm" />

            <h3 className="text-lg font-medium">Ubicación</h3>
            <Field name="location.address" placeholder="Dirección" className="w-full border px-4 py-2 rounded" />
            <ErrorMessage name="location.address" component="div" className="text-red-600 text-sm" />

            <Field name="location.city" placeholder="Ciudad" className="w-full border px-4 py-2 rounded" />
            <ErrorMessage name="location.city" component="div" className="text-red-600 text-sm" />

            <Field name="location.state" placeholder="Estado" className="w-full border px-4 py-2 rounded" />
            <ErrorMessage name="location.state" component="div" className="text-red-600 text-sm" />

            <Field name="location.country" placeholder="País" className="w-full border px-4 py-2 rounded" />
            <ErrorMessage name="location.country" component="div" className="text-red-600 text-sm" />

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Crear negocio
            </button>

          </Form>
        )}
      </Formik>
    </div>
  )
}
