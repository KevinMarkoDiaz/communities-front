// store/mobileMenuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const mobileMenuSlice = createSlice({
  name: "mobileMenu",
  initialState: {
    isOpen: false,
  },
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
});

export const { abrirMenu, cerrarMenu, toggleMenu } = mobileMenuSlice.actions;
export default mobileMenuSlice.reducer;
