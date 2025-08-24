import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resendVerification, getCurrentUser } from "../api/authApi";
import icono from "../assets/logo_icono.svg"; // 👈 importa el logo (Vite lo resuelve como URL)

export default function VerificaTuCorreo() {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const emailFromQuery = search.get("email") || "";
  const [email, setEmail] = useState(emailFromQuery);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const canResend = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);

  const handleResend = async () => {
    if (!canResend) return;
    try {
      setLoading(true);
      await resendVerification(email.trim().toLowerCase());
      setMsg("Listo, te reenviamos el correo. Revisa tu bandeja y Spam.");
    } catch (e) {
      const code = e?.response?.status;
      setMsg(
        code === 429
          ? "Demasiados intentos. Prueba en unos minutos."
          : "No pudimos reenviar. Intenta más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAlreadyVerified = async () => {
    try {
      setLoading(true);
      const { usuario } = await getCurrentUser();
      if (usuario?.isVerified) return navigate("/dashboard/perfil");
      setMsg("Aún no vemos tu correo verificado. Revisa el enlace del email.");
    } catch {
      setMsg("Inicia sesión de nuevo para continuar.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen grid place-items-center bg-cover bg-center px-4 py-10"
      style={{ backgroundImage: "url(/images/1.png)" }}
    >
      <div className="w-full max-w-md bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow">
        <h1 className="text-lg font-bold mb-1 text-center">
          Verifica tu correo
        </h1>
        <p className="text-sm text-center mb-5">
          Te enviamos un enlace de verificación
          {emailFromQuery ? ` a ${emailFromQuery}` : ""}.
        </p>

        <label className="text-xs font-medium block mb-1">Correo</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@ejemplo.com"
          autoComplete="email"
          className="w-full px-3 py-2 rounded-lg bg-black/10 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <div className="flex gap-2">
          <button
            onClick={handleResend}
            disabled={!canResend || loading}
            className="flex-1 bg-black/80 text-white py-2 rounded-lg font-semibold disabled:opacity-60"
          >
            {loading ? "Reenviando..." : "Reenviar verificación"}
          </button>
          <button
            onClick={handleAlreadyVerified}
            disabled={loading}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold disabled:opacity-60"
          >
            Ya verifiqué
          </button>
        </div>

        {msg && (
          <p className="text-xs mt-3 text-center" aria-live="polite">
            {msg}
          </p>
        )}

        {/* 👇 Logo en la parte inferior del contenido */}
        <div className="mt-6 flex justify-center">
          <img
            src={icono}
            alt="Logo Communidades"
            className="h-16 opacity-90 select-none pointer-events-none"
            draggable="false"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
