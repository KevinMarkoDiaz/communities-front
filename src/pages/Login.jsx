import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

const esquemaValidacion = Yup.object().shape({
  email: Yup.string().email("Correo inválido").required("Campo obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("Campo obligatorio"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (valores, { setSubmitting, setErrors }) => {
    try {
      const usuario = await loginUser(valores);
      dispatch(login(usuario));
      navigate("/dashboard/perfil");
    } catch (error) {
      console.error("Error en login:", error);
      setErrors({ email: "Correo o contraseña incorrectos" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Communities | Iniciar sesión</title>
        <meta
          name="description"
          content="Accede a tu cuenta para gestionar negocios, eventos y servicios comunitarios."
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
            Bienvenido a Comunidades
          </h1>
        </div>

        <div className="flex justify-center items-center flex-1 px-4 py-10">
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-[#1980e6] text-2xl font-bold text-center mb-6">
              Iniciar sesión
            </h2>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={esquemaValidacion}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-[#0e141b] block mb-1">
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
                    <label className="text-sm font-medium text-[#0e141b] block mb-1">
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

                  <button
                    type="submit"
                    className="w-full bg-[#1980e6] text-white py-3 rounded-xl font-bold hover:bg-[#136fca] transition"
                  >
                    Entrar
                  </button>

                  <div className="text-center">
                    <a href="#" className="text-[#4e7397] text-sm underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <div className="text-center text-[#4e7397] text-sm">
                    ¿No tienes cuenta?
                  </div>

                  <a
                    href="/registro"
                    className="block text-center bg-[#e7edf3] text-[#0e141b] py-3 rounded-xl font-bold hover:bg-[#dbe3ea] transition"
                  >
                    Regístrate
                  </a>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
