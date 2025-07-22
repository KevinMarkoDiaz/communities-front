// store/mobileMenuSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { resetApp } from "./appActions"; // ✅

const initialState = {
  isOpen: false,
};

const mobileMenuSlice = createSlice({
  name: "mobileMenu",
  initialState,
  reducers: {
    abrirMenu: (state) => {
      state.isOpen = true;
    },
    cerrarMenu: (state) => {
      state.isOpen = false;
    },
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetApp, () => initialState); // ✅
  },
});

export const { abrirMenu, cerrarMenu, toggleMenu } = mobileMenuSlice.actions;
export default mobileMenuSlice.reducer;
