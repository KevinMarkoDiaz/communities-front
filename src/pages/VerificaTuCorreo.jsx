// src/pages/VerificaTuCorreo.jsx
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { resendVerification } from "../api/authApi";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function VerificaTuCorreo() {
  const q = useQuery();
  const emailFromQS = (q.get("email") || "").toLowerCase();
  const [email, setEmail] = useState(emailFromQS);
  const [status, setStatus] = useState({ loading: false, msg: "" });

  const providerLink = useMemo(() => {
    const domain = (email.split("@")[1] || "").toLowerCase();
    if (domain.includes("gmail")) return "https://mail.google.com/";
    if (
      domain.includes("outlook") ||
      domain.includes("hotmail") ||
      domain.includes("live")
    )
      return "https://outlook.live.com/";
    if (domain.includes("yahoo")) return "https://mail.yahoo.com/";
    return "https://www." + domain; // fallback
  }, [email]);

  const handleResend = async () => {
    if (!email) return setStatus({ loading: false, msg: "Ingresa tu email." });
    try {
      setStatus({ loading: true, msg: "" });
      await resendVerification(email);
      setStatus({
        loading: false,
        msg: "Te enviamos un nuevo correo de verificación.",
      });
    } catch (e) {
      console.error(e);
      setStatus({
        loading: false,
        msg: "No pudimos reenviar el correo. Intenta más tarde.",
      });
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md bg-white/40 backdrop-blur-md p-6 rounded-2xl">
        <h1 className="text-lg font-bold">Verifica tu correo</h1>
        <p className="text-sm mt-2">
          Te enviamos un correo a{" "}
          <strong>{email || "tu dirección de correo"}</strong>. Abre el mensaje
          y haz clic en
          <em> “Verificar mi correo”</em>.
        </p>

        <a
          href={providerLink}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Abrir mi correo
        </a>

        <div className="mt-6 space-y-2">
          <label className="text-xs block">
            ¿No te llegó? Reenviamos el enlace:
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
            type="email"
            placeholder="correo@ejemplo.com"
            className="w-full px-3 py-2 rounded-lg bg-black/10"
          />
          <button
            onClick={handleResend}
            disabled={status.loading}
            className="w-full bg-black/80 hover:bg-black text-white py-2 rounded-lg font-semibold"
          >
            {status.loading ? "Reenviando..." : "Reenviar verificación"}
          </button>
          {status.msg && <p className="text-xs mt-1">{status.msg}</p>}
        </div>

        <p className="text-xs mt-6">
          ¿Usas Gmail? Revisa la pestaña <em>Promociones</em> o la carpeta{" "}
          <em>Spam</em>.
        </p>
      </div>
    </div>
  );
}
