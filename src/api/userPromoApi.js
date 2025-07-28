// src/api/userPromoApi.js
import axiosInstance from "./axiosInstance";

export const claimPromo = async (promotionId) => {
  const { data } = await axiosInstance.post(`/user-promos/${promotionId}`);
  return data;
};

export const getMisPromos = async () => {
  const { data } = await axiosInstance.get(`/user-promos`);
  return data;
};

export const redeemPromoCode = async (code) => {
  const { data } = await axiosInstance.post(`/user-promos/redeem`, { code });
  return data;
};
