import axiosInstance from "./axiosInstance";

export const crearSesionStripe = async () => {
  const res = await axiosInstance.post("/stripe/create-checkout-session");
  return res.data.url;
};

export const crearSesionStripeBanner = async (bannerId, months = 1) => {
  const { data } = await axiosInstance.post(
    "/stripe/create-banner-checkout-session",
    { bannerId, months }
  );
  return data.url; // devuelve la URL de Checkout
};
