import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Helmet } from "react-helmet-async"
import { useDispatch } from "react-redux"
import { login } from "../store/authSlice"
import { useNavigate } from "react-router-dom"

const esquemaRegistro = Yup.object().shape({
  nombre: Yup.string().min(2, "Muy corto").required("Campo obligatorio"),
  email: Yup.string().email("Correo inválido").required("Campo obligatorio"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("Campo obligatorio"),
})

export default function Registro() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (valores) => {
    // Simulación de registro exitoso
    const usuarioMock = {
      nombre: valores.nombre,
      email: valores.email,
    }

    dispatch(login(usuarioMock))
    navigate("/dashboard/perfil")
  }

  return (
    <>
      <Helmet>
        <title>Communities | Registro</title>
        <meta name="description" content="Crea tu cuenta para publicar negocios, ver eventos y conectar con tu comunidad migrante." />
      </Helmet>

      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Crear cuenta</h2>

          <Formik
            initialValues={{ nombre: "", email: "", password: "" }}
            validationSchema={esquemaRegistro}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
                <div>
                  <Field
                    name="nombre"
                    type="text"
                    placeholder="Nombre completo"
                    className="w-full border px-4 py-2 rounded"
                  />
                  <ErrorMessage name="nombre" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full border px-4 py-2 rounded"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <div>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    className="w-full border px-4 py-2 rounded"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Registrarse
                </button>

                <p className="text-sm text-center">
                  ¿Ya tienes cuenta? <a href="/login" className="text-blue-600 underline">Inicia sesión</a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}
