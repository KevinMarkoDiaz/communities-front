// src/components/AuthGate.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../store/authSlice";
import LoaderGate from "./LoaderGate"; // ← el que maneja minDuration + fade

export default function AuthGate({ children }) {
  const dispatch = useDispatch();
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await dispatch(fetchCurrentUser()); // lee cookie y setea auth
      } finally {
        if (mounted) setBooting(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return (
    <LoaderGate
      ready={!booting}
      minDuration={800} // evita “flash”
    >
      {children}
    </LoaderGate>
  );
}
