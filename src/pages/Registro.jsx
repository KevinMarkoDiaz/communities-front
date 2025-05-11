import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Helmet } from "react-helmet-async"
import { useDispatch } from "react-redux"
import { login } from "../store/authSlice"
import { useNavigate } from "react-router-dom"

const esquemaRegistro = Yup.object().shape({
  name: Yup.string().min(2, "Muy corto").required("Campo obligatorio"),
  email: Yup.string().email("Correo inválido").required("Campo obligatorio"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("Campo obligatorio"),
  role: Yup.string().required("Selecciona un rol"),
  profileImage: Yup.string().url("Debe ser una URL válida").required("Campo obligatorio"),
  community: Yup.string(), // opcional
})

export default function Registro() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (valores) => {
    // Simulación de usuario creado
    const usuarioMock = {
      ...valores,
      isVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
            initialValues={{
              name: "",
              email: "",
              password: "",
              role: "user",
              profileImage: "",
              community: "",
            }}
            validationSchema={esquemaRegistro}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-4">

                <Field name="name" placeholder="Nombre completo" className="w-full border px-4 py-2 rounded" />
                <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />

                <Field name="email" type="email" placeholder="Correo electrónico" className="w-full border px-4 py-2 rounded" />
                <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />

                <Field name="password" type="password" placeholder="Contraseña" className="w-full border px-4 py-2 rounded" />
                <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />

                <div>
                  <label className="block mb-1 font-medium text-sm">Rol</label>
                  <Field as="select" name="role" className="w-full border px-4 py-2 rounded">
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                    <option value="business_owner">Dueño de negocio</option>
                  </Field>
                  <ErrorMessage name="role" component="div" className="text-red-600 text-sm" />
                </div>

                <Field name="profileImage" placeholder="URL de imagen de perfil" className="w-full border px-4 py-2 rounded" />
                <ErrorMessage name="profileImage" component="div" className="text-red-600 text-sm" />

                <Field name="community" placeholder="ID de comunidad (opcional)" className="w-full border px-4 py-2 rounded" />
                <ErrorMessage name="community" component="div" className="text-red-600 text-sm" />

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
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
