import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../src/api/axiosInstance";
import { mostrarFeedback } from "./feedbackSlice";
import { resetApp } from "./appActions"; // ✅ Importación del reset global

// ✅ Estado inicial separado
const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchConversations = createAsyncThunk(
  "conversations/fetchAll",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.get("/conversations/me");
      return res.data;
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar tus conversaciones",
          type: "error",
        })
      );
      return rejectWithValue(
        err.response?.data?.msg || "Error al cargar conversaciones"
      );
    }
  }
);

const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetApp, () => initialState) // ✅ Reset total

      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default conversationsSlice.reducer;
