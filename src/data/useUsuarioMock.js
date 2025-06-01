import { useEffect, useState } from "react";

export function useUsuarioMock() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula fetch
    const timeout = setTimeout(() => {
      setUsuario({
        name: "Juan Sánchez",
        location: "New York, NY",
        role: "business_owner",
        profileImage:
          "https://cdn.usegalileo.ai/sdxl10/6158dcf0-61b2-4f3a-b7f5-f5cc02494053.png",
      });
      setLoading(false);
    }, 800); // Tiempo simulado

    return () => clearTimeout(timeout);
  }, []);

  return { usuario, loading };
}
