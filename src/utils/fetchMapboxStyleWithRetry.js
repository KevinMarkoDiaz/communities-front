export const fetchMapboxStyleWithRetry = async (
  url,
  maxRetries = 3,
  delay = 800
) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Código HTTP: ${res.status}`);
      return await res.json();
    } catch (err) {
      const isLast = attempt === maxRetries;
      if (isLast || err.name === "AbortError") throw err;

      console.warn(`🔁 Reintentando carga de mapa... intento ${attempt}`);
      await new Promise((res) => setTimeout(res, delay * attempt));
    }
  }
};
