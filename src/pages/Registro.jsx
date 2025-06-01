// src/pages/Registro.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

const esquemaRegistro = Yup.object().shape({
  name: Yup.string().min(2, "Muy corto").required("Campo obligatorio"),
  lastName: Yup.string().max(100, "Máximo 100 caracteres").optional(),
  email: Yup.string().email("Correo inválido").required("Campo obligatorio"),
  password: Yup.string()
    .min(8, "Mínimo 8 caracteres")
    .required("Campo obligatorio"),
  role: Yup.string()
    .oneOf(["user", "admin", "business_owner"], "Rol inválido")
    .required("Selecciona un rol"),
  profileImage: Yup.string().url("Debe ser una URL válida").optional(),
  title: Yup.string().max(100, "Máximo 100 caracteres").optional(),
  description: Yup.string().max(1000, "Máximo 1000 caracteres").optional(),
  location: Yup.string().max(100, "Máximo 100 caracteres").optional(),
  country: Yup.string().max(100, "Máximo 100 caracteres").optional(),
  community: Yup.string()
    .matches(/^[0-9a-fA-F]{24}$/, "ID de comunidad inválido")
    .optional(),
});

export default function Registro() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (valores, { setSubmitting, setErrors }) => {
    try {
      const nuevoUsuario = await registerUser(valores);
      dispatch(login(nuevoUsuario));
      navigate("/dashboard/perfil");
    } catch (error) {
      console.error("Error al registrar:", error);
      setErrors({
        email: "No se pudo registrar el usuario. Intenta más tarde.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Communities | Registro</title>
        <meta
          name="description"
          content="Crea tu cuenta para publicar negocios, ver eventos y conectar con tu comunidad migrante."
        />
      </Helmet>

      <div className="flex flex-col md:flex-row min-h-screen bg-[#f1f5f9]">
        <div
          className="hidden md:flex flex-col justify-end p-10 w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('https://cdn.usegalileo.ai/replicate/ec5a84a8-d15f-4980-8b17-9d8559c062c9.png')",
          }}
        >
          <h1 className="text-white text-4xl font-black leading-tight tracking-tight mb-10 text-center">
            Crea tu cuenta en Communities
          </h1>
        </div>

        <div className="flex justify-center items-center flex-1 px-4 py-10">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-[#1980e6] text-2xl font-bold text-center mb-6">
              Registro
            </h2>

            <Formik
              initialValues={{
                name: "",
                lastName: "",
                email: "",
                password: "",
                role: "user",
                profileImage: "",
                title: "",
                description: "",
                location: "",
                country: "",
                community: "",
              }}
              validationSchema={esquemaRegistro}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[#0e141b] mb-1">
                      Nombre
                    </label>
                    <Field
                      name="name"
                      placeholder="Kevin"
                      className="w-full px-4 py-3 border border-[#d0dbe7] bg-[#f8fafc] rounded-xl placeholder:text-[#4e7397] focus:outline-none"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0e141b] mb-1">
                      Apellido
                    </label>
                    <Field
                      name="lastName"
                      placeholder="Díaz"
                      className="w-full px-4 py-3 border border-[#d0dbe7] bg-[#f8fafc] rounded-xl placeholder:text-[#4e7397] focus:outline-none"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0e141b] mb-1">
                      Correo electrónico
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className="w-full px-4 py-3 border border-[#d0dbe7] bg-[#f8fafc] rounded-xl placeholder:text-[#4e7397] focus:outline-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0e141b] mb-1">
                      Contraseña
                    </label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border-none bg-[#e7edf3] rounded-xl placeholder:text-[#4e7397] focus:outline-none"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0e141b] mb-1">
                      Rol
                    </label>
                    <Field
                      as="select"
                      name="role"
                      className="w-full px-4 py-3 border border-[#d0dbe7] bg-white rounded-xl text-[#0e141b] focus:outline-none"
                    >
                      <option value="user">Usuario</option>
                      <option value="admin">Administrador</option>
                      <option value="business_owner">Dueño de negocio</option>
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0e141b] mb-1">
                      URL de imagen de perfil
                    </label>
                    <Field
                      name="profileImage"
                      placeholder="https://..."
                      className="w-full px-4 py-3 border border-[#d0dbe7] bg-[#f8fafc] rounded-xl placeholder:text-[#4e7397] focus:outline-none"
                    />
                    <ErrorMessage
                      name="profileImage"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0e141b] mb-1">
                      Título (opcional)
                    </label>
                    <Field
                      name="title"
                      placeholder="Chef venezolano"
                      className="w-full px-4 py-3 border border-[#d0dbe7] bg-[#f8fafc] rounded-xl placeholder:text-[#4e7397] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0e141b] mb-1">
                      Descripción (opcional)
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      placeholder="Breve descripción personal"
                      className="w-full px-4 py-3 border border-[#d0dbe7] bg-[#f8fafc] rounded-xl placeholder:text-[#4e7397] focus:outline-none"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0e141b] mb-1">
                      Ubicación (opcional)
                    </label>
                    <Field
                      name="location"
                      placeholder="Dallas, TX"
                      className="w-full px-4 py-3 border border-[#d0dbe7] bg-[#f8fafc] rounded-xl placeholder:text-[#4e7397] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0e141b] mb-1">
                      País (opcional)
                    </label>
                    <Field
                      name="country"
                      placeholder="Estados Unidos"
                      className="w-full px-4 py-3 border border-[#d0dbe7] bg-[#f8fafc] rounded-xl placeholder:text-[#4e7397] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#0e141b] mb-1">
                      ID de comunidad (opcional)
                    </label>
                    <Field
                      name="community"
                      placeholder="665e30bd11cbfd23e9853c3c"
                      className="w-full px-4 py-3 border border-[#d0dbe7] bg-[#f8fafc] rounded-xl placeholder:text-[#4e7397] focus:outline-none"
                    />
                    <ErrorMessage
                      name="community"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1980e6] text-white py-3 rounded-xl font-bold hover:bg-[#136fca] transition"
                  >
                    Registrarse
                  </button>

                  <p className="text-sm text-center text-[#4e7397] mt-4">
                    ¿Ya tienes cuenta?{" "}
                    <a href="/login" className="underline">
                      Inicia sesión
                    </a>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
