import axiosInstance from "./axiosInstance";

export const crearSesionStripe = async () => {
  const res = await axiosInstance.post("/stripe/create-checkout-session");
  return res.data.url;
};

export async function crearSesionStripeBanner(bannerId /*, months=1 */) {
  // El backend fija months=1 en metadata; si luego aceptas months dinámico, añade al body.
  const { data } = await axiosInstance.post(
    `/stripe/create-banner-checkout-session`,
    { bannerId },
    { withCredentials: true }
  );
  // data: { url, sessionId }
  return data?.url;
}
