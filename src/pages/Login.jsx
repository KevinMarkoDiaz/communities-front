import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser, getCurrentUser } from "../api/authApi";
import icono from "../assets/logo_icono.svg";

/* =========================
   Validación
========================= */
const esquemaValidacion = Yup.object().shape({
  email: Yup.string().email("Correo inválido").required("Campo obligatorio"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("Campo obligatorio"),
});

/* =========================
   Helper de fondo responsive (sin imports)
========================= */
const pickBg = (w) => {
  if (w >= 1024) return "/images/3.png"; // desktop
  if (w >= 768) return "/images/2.png"; // tablet
  return "/images/1.png"; // mobile
};

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/dashboard/perfil";

  /* =========================
     Fondo responsive (solo descarga el actual)
  ========================= */
  const [bgImage, setBgImage] = useState(() => {
    if (typeof window === "undefined") return "/images/3.png"; // SSR-safe fallback
    return pickBg(window.innerWidth);
  });

  useEffect(() => {
    // Corrige en el primer render del cliente
    setBgImage(pickBg(window.innerWidth));

    // Respeta ahorro de datos si está activo (opcional)
    const saveData = navigator.connection?.saveData;
    if (saveData) setBgImage("/images/1.png");

    // Resize con rAF para evitar spam
    let ticking = false;
    const onResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const next = pickBg(window.innerWidth);
          setBgImage((prev) => (prev === next ? prev : next));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* =========================
     Handlers de auth
  ========================= */
  const handleSubmit = async (valores, { setSubmitting, setErrors }) => {
    try {
      const usuario = await loginUser(valores);
      dispatch(login(usuario));
      navigate(redirectTo);
    } catch (error) {
      console.error("Error en login:", error);
      setErrors({ email: "Correo o contraseña incorrectos" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      `${import.meta.env.VITE_API_URL}/auth/google`,
      "_blank",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    const handleMessage = async (event) => {
      if (!event.data) return;
      if (event.data === "failure") {
        console.error("Error al autenticar con Google.");
        return;
      }
      try {
        const { usuario } = await getCurrentUser();
        dispatch(login(usuario));
        navigate(redirectTo);
      } catch (err) {
        console.error(
          "Error al obtener usuario después de login con Google:",
          err
        );
      } finally {
        window.removeEventListener("message", handleMessage);
      }
    };

    window.addEventListener("message", handleMessage);
  };

  return (
    <>
      <Helmet>
        <title>Communidades | Iniciar sesión</title>
      </Helmet>

      {/* Fondo dinámico según dispositivo (solo descarga el actual) */}
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative px-2 py-10 gap-2"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="relative w-full max-w-md mx-auto p-8 bg-white/40 backdrop-blur-md rounded-2xl shadow-2xl text-black">
          <h2 className="text-md md: text-lg font-bold text-center mb-6 tracking-wide">
            ¡Qué alegría tenerte de vuelta!
          </h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={esquemaValidacion}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-6">
                <div>
                  <label className="text-xs font-medium block mb-1">
                    Correo electrónico
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="w-full px-4 py-1 border border-black/10 bg-black/30 rounded-lg placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-400 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium block mb-1">
                    Contraseña
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-1 border border-black/10 bg-black/30 rounded-lg placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-400 text-xs mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-xs md:text-sm bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold transition"
                >
                  Entrar
                </button>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full text-xs md:text-sm border border-black/10 bg-black/30  text-white py-2 rounded-lg font-semibold hover:bg-white/20 transition flex items-center justify-center gap-3"
                >
                  {/* Ícono Google destacado */}
                  <span className="relative flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-md">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.6 20.5H42V20H24v8h11.3C34.2 32.5 29.5 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.9 6.8 29.7 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.5-.4-3.5z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.3 14.7l6.6 4.8C14.2 16.2 18.8 14 24 14c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.9 6.8 29.7 4 24 4 16.1 4 9.1 8.6 6.3 14.7z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24 44c5.4 0 10.3-2.1 14-5.4l-6.5-5.3C29.9 35.5 27.1 36 24 36c-5.5 0-10.2-3.5-11.9-8.3l-6.6 5.1C9.1 39.4 16.1 44 24 44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.6 20.5H42V20H24v8h11.3c-1.7 4.1-5.6 7-10.3 7-5.5 0-10.2-3.5-11.9-8.3l-6.6 5.1C9.1 39.4 16.1 44 24 44c11 0 20-8 20-20 0-1.3-.1-2.5-.4-3.5z"
                      />
                    </svg>
                  </span>
                  <span className="relative z-10">
                    Iniciar sesión con Google
                  </span>
                </button>

                <div className="text-center text-gray-00 text-xs">
                  ¿No tienes cuenta?
                </div>

                <Link
                  to="/registro"
                  className="block text-xs md:text-sm text-center border border-black/10 bg-black/30  border-white/20 text-white py-2 rounded-lg font-semibold hover:bg-white/20 transition"
                >
                  Regístrate
                </Link>
              </Form>
            )}
          </Formik>
          <div className="flex justify-center mt-8 relative z-10">
            <div className="relative inline-block orbit-wrapper">
              <img
                src={icono}
                alt="Logo Communities"
                className="h-24 opacity-90 relative z-20 logo-pulse select-none pointer-events-none"
                draggable="false"
              />
              <span className="orbit-sphere sphere1" />
              <span className="orbit-sphere sphere2" />
              <span className="orbit-sphere sphere3" />
            </div>
          </div>
        </div>

        {/* Icono + órbitas (mantén tu CSS actual) */}
      </div>
    </>
  );
}
