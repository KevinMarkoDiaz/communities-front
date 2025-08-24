import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";
import icono from "../assets/logo_icono.svg";
import { registerUser } from "../api/authApi";

// ✅ Validación mínima
const validationSchema = Yup.object().shape({
  name: Yup.string().min(2, "Muy corto").required("Campo obligatorio"),
  email: Yup.string().email("Correo inválido").required("Campo obligatorio"),
  password: Yup.string()
    .min(8, "Mínimo 8 caracteres")
    .required("Campo obligatorio"),
});

export default function Registro() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const payload = {
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        password: values.password,
      };
      const resp = await registerUser(payload);
      // Mantenemos el flujo probado: actualizar estado auth en el store
      dispatch(login(resp));

      // Si el backend aún no marcó verificación, mandamos a "Revisa tu correo"
      const isVerified = resp?.user?.isVerified === true;
      const nextUrl = isVerified
        ? "/dashboard/perfil"
        : `/verifica-tu-correo?email=${encodeURIComponent(payload.email)}`;

      navigate(nextUrl);
    } catch (err) {
      console.error("Error al registrar:", err);
      const backendMsg =
        err?.response?.data?.msg || "No se pudo registrar. Intenta más tarde.";
      setErrors({ email: backendMsg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Communities | Registro</title>
      </Helmet>

      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative gap-2 py-7 px-2"
        style={{ backgroundImage: `url(/images/1.png)` }}
      >
        <div className="relative w-full max-w-md mx-auto p-8 bg-white/40 backdrop-blur-md rounded-2xl shadow-2xl text-black">
          <h2 className="text-lg font-bold text-center mb-6 tracking-wide">
            Crear cuenta
          </h2>

          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs font-medium block mb-1"
                  >
                    Nombre
                  </label>
                  <Field
                    id="name"
                    name="name"
                    placeholder="Tu nombre"
                    autoComplete="given-name"
                    autoFocus
                    className="w-full px-4 py-2 border border-black/10 bg-black/30 rounded-lg placeholder:text-gray-300 focus:outline-none"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-400 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-xs font-medium block mb-1"
                  >
                    Correo electrónico
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    autoComplete="email"
                    className="w-full px-4 py-2 border border-black/10 bg-black/30 rounded-lg placeholder:text-gray-300 focus:outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-400 text-xs mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="text-xs font-medium block mb-1"
                  >
                    Contraseña
                  </label>
                  <div className="relative">
                    <Field
                      id="password"
                      name="password"
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="w-full pr-10 px-4 py-2 border border-black/10 bg-black/30 rounded-lg placeholder:text-gray-300 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/80"
                      aria-label={
                        showPass ? "Ocultar contraseña" : "Mostrar contraseña"
                      }
                    >
                      {showPass ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-400 text-xs mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2 rounded-lg font-semibold transition"
                >
                  {isSubmitting ? "Creando cuenta..." : "Registrarse"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-4">
            <p className="text-gray-900 text-xs mb-2">¿Ya tienes cuenta?</p>
            <Link
              to="/login"
              className="block text-xs md:text-sm text-center border border-black/10 bg-black/30 text-white py-2 rounded-lg font-semibold hover:bg-white/20 transition"
            >
              Volver al inicio de sesión
            </Link>
          </div>

          <div className="flex justify-center mt-8">
            <img
              src={icono}
              alt="Logo Communities"
              className="h-20 opacity-90 logo-pulse select-none pointer-events-none"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </>
  );
}
