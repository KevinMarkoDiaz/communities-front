import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const esquemaValidacion = Yup.object().shape({
  email: Yup.string().email("Correo inválido").required("Campo obligatorio"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("Campo obligatorio"),
})

export default function Login() {
  const handleSubmit = (valores) => {
    console.log("Login con Formik:", valores)
    // Aquí conectarías con tu API
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
  )
}
