import axiosInstance from "./axiosInstance";

export const crearSesionStripe = async () => {
  const res = await axiosInstance.post("/stripe/create-checkout-session");
  return res.data.url;
};
