import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getBusinessById, updateBusiness } from "../../api/businessApi"
import { useSelector } from "react-redux"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

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

export default function EditarNegocio() {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)

  const [negocio, setNegocio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getBusinessById(id)
        setNegocio(data)
      } catch (err) {
        console.error(err)
        setError("No se pudo cargar el negocio")
      } finally {
        setLoading(false)
      }
    }

    cargar()
  }, [id])

  if (loading) return <div className="p-4">Cargando datos...</div>
  if (error) return <div className="p-4 text-red-600">{error}</div>
  if (!negocio) return <div className="p-4">Negocio no encontrado.</div>

  const handleSubmit = async (valores, { setSubmitting }) => {
    try {
      await updateBusiness(id, valores, token)
      navigate("/dashboard/mis-negocios")
    } catch (err) {
      console.error("Error al actualizar negocio:", err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Editar negocio</h2>

      <Formik
        initialValues={negocio}
        enableReinitialize
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
              Guardar cambios
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
