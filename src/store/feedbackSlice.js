// store/feedbackSlice.js
import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    visible: false,
    message: "",
    type: "success", // 'success' | 'error'
  },
  reducers: {
    mostrarFeedback: (state, action) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    ocultarFeedback: (state) => {
      state.visible = false;
      state.message = "";
    },
  },
});

export const { mostrarFeedback, ocultarFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
