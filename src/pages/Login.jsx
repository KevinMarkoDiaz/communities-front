import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Helmet } from 'react-helmet-async'
import { useDispatch } from "react-redux"
import { login } from "../store/authSlice"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../api/authApi"

const esquemaValidacion = Yup.object().shape({
  email: Yup.string().email("Correo inválido").required("Campo obligatorio"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("Campo obligatorio"),
})

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (valores, { setSubmitting, setErrors }) => {
    try {
      const usuario = await loginUser(valores) // 🔁 Axios simulation (luego será real)
      dispatch(login(usuario))
      navigate("/dashboard/perfil")
    } catch (error) {
      console.error("Error en login:", error)
      setErrors({ email: "Correo o contraseña incorrectos" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Communities | Iniciar sesión</title>
        <meta name="description" content="Accede a tu cuenta para gestionar negocios, eventos y servicios comunitarios." />
      </Helmet>

      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Iniciar sesión</h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={esquemaValidacion}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">
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
                  Entrar
                </button>

                <p className="text-sm text-center">
                  ¿No tienes cuenta? <a href="/registro" className="text-blue-600 underline">Regístrate</a>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}
