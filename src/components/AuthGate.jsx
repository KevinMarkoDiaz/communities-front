// src/components/AuthGate.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../store/authSlice";
import Loading from "./Loading";

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

  if (booting) {
    return (
      <div className="w-full min-h-screen grid place-items-center bg-white">
        <Loading />
      </div>
    );
  }
  return <>{children}</>;
}
