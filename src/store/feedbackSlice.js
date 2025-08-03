// store/feedbackSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { resetApp } from "./appActions"; // ✅ Importado resetApp

const initialState = {
  visible: false,
  message: "",
  type: "success", // 'success' | 'error' | 'loading'
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    mostrarFeedback: (state, action) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = action.payload.type || "success";
    },
    ocultarFeedback: (state) => {
      state.visible = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetApp, () => initialState);
  },
});

export const { mostrarFeedback, ocultarFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
