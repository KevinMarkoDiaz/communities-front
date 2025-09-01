import { useEffect, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser, getCurrentUser, resendVerification } from "../api/authApi";
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
   Helper de fondo responsive
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
     Mensajes por verificación
  ========================= */
  const params = new URLSearchParams(location.search);
  const verified = params.get("verified"); // "1" | "0" | null
  const reason = params.get("reason"); // "expired" | "bad_link" | null

  const [infoMsg, setInfoMsg] = useState("");

  useEffect(() => {
    if (verified === "1") {
      setInfoMsg("¡Correo verificado! Ya puedes iniciar sesión.");
    } else if (verified === "0") {
      setInfoMsg(
        reason === "expired"
          ? "Tu enlace de verificación expiró. Podemos reenviártelo."
          : "El enlace de verificación no es válido. Podemos reenviártelo."
      );
    } else {
      setInfoMsg("");
    }
  }, [verified, reason]);

  /* =========================
     Fondo responsive
  ========================= */
  const [bgImage, setBgImage] = useState(() => {
    if (typeof window === "undefined") return "/images/3.png"; // SSR-safe fallback
    return pickBg(window.innerWidth);
  });

  useEffect(() => {
    setBgImage(pickBg(window.innerWidth));
    const saveData = navigator.connection?.saveData;
    if (saveData) setBgImage("/images/1.png");

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
      const payload = {
        email: valores.email.trim().toLowerCase(),
        password: valores.password,
      };
      const usuario = await loginUser(payload);
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
      // Tu backend hace: window.opener.postMessage({ type: "oauth:success" }, ORIGIN)
      if (!event?.data || event.data?.type !== "oauth:success") return;
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

  /* =========================
     Reenviar verificación
  ========================= */
  const [resendEmail, setResendEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const handleResend = async () => {
    if (!resendEmail) return;
    try {
      setResendLoading(true);
      await resendVerification(resendEmail.trim().toLowerCase());
      setInfoMsg("Listo, te reenviamos el correo de verificación.");
    } catch (e) {
      console.error(e);
      setInfoMsg("No pudimos reenviar el correo. Intenta más tarde.");
    } finally {
      setResendLoading(false);
    }
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
          <h2 className="text-md md:text-lg font-bold text-center mb-6 tracking-wide">
            ¡Qué alegría tenerte de vuelta!
          </h2>

          {infoMsg && (
            <div className="mb-4 p-3 rounded-lg bg-black/10 text-black text-xs">
              {infoMsg}
              {verified === "0" && (
                <div className="mt-2 space-y-2">
                  <input
                    type="email"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    className="w-full px-3 py-2 rounded-lg bg-black/10"
                  />
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendLoading}
                    className="w-full bg-black/80 hover:bg-black disabled:opacity-60 disabled:cursor-not-allowed text-white py-2 rounded-lg font-semibold"
                  >
                    {resendLoading ? "Reenviando..." : "Reenviar verificación"}
                  </button>
                </div>
              )}
            </div>
          )}

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={esquemaValidacion}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
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
                    autoFocus
                    className="w-full px-4 py-1 border border-black/10 bg-black/30 rounded-lg placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
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
                  disabled={isSubmitting}
                  className="w-full text-xs md:text-sm bg-orange-600 hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2 rounded-lg font-semibold transition"
                >
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </button>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full text-xs md:text-sm border border-black/10 bg-black/30 text-white py-2 rounded-lg font-semibold hover:bg-white/20 transition flex items-center justify-center gap-3"
                >
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

                <div className="text-center text-gray-900 text-xs">
                  ¿No tienes cuenta?
                </div>
                <Link
                  to="/registro"
                  className="block text-xs md:text-sm text-center border border-black/10 bg-black/30 border-white/20 text-white py-2 rounded-lg font-semibold hover:bg-white/20 transition"
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
                alt="Logo Communidades"
                className="h-24 opacity-90 relative z-20 logo-pulse select-none pointer-events-none"
                draggable="false"
              />
              <span className="orbit-sphere sphere1" />
              <span className="orbit-sphere sphere2" />
              <span className="orbit-sphere sphere3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
