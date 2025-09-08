// src/components/LoaderGate.jsx
import { useEffect, useRef, useState } from "react";
import Loading from "./Loading";

export default function LoaderGate({
  ready, // boolean: ya está lista la app/parte
  minDuration = 700, // ms mínimos de splash
  onceKey, // string opcional: si existe en sessionStorage, NO volver a mostrar
  children,
}) {
  const [show, setShow] = useState(() => {
    if (!onceKey) return true;
    try {
      return !sessionStorage.getItem(onceKey);
    } catch {
      return true;
    }
  });
  const startRef = useRef(Date.now());
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!show) return; // ya no se muestra nunca más
    if (!ready) return; // aún no está lista ⇒ mantener

    const elapsed = Date.now() - startRef.current;
    const remain = Math.max(0, minDuration - elapsed);
    const t = setTimeout(() => setFading(true), remain);
    return () => clearTimeout(t);
  }, [ready, minDuration, show]);

  // cuando termina el fade-out, desmonta y marca en sessionStorage
  const handleTransitionEnd = () => {
    if (!fading) return;
    setShow(false);
    if (onceKey) {
      try {
        sessionStorage.setItem(onceKey, "1");
      } catch {}
    }
  };

  return (
    <>
      {show && (
        <div
          className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
          onTransitionEnd={handleTransitionEnd}
        >
          <Loading
            main
            variant="splash"
            bgColor="bg-orange-500"
            message="Preparando tu experiencia…"
          />
        </div>
      )}
      {children}
    </>
  );
}
