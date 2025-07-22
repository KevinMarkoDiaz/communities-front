import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { mostrarFeedback } from "./feedbackSlice";
import { resetApp } from "./appActions"; // ✅ Importación del reset global

export const fetchFollowings = createAsyncThunk(
  "follow/fetchFollowings",
  async (type = null, { rejectWithValue, dispatch }) => {
    try {
      const query = type ? `?type=${type}` : "";
      const res = await axiosInstance.get(`/users/me/following${query}`);
      return res.data.items; // El backend devuelve { items: [...] }
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar tus seguimientos",
          type: "error",
        })
      );
      return rejectWithValue("Error fetching followings");
    }
  }
);

// ✅ Estado inicial centralizado
const initialState = {
  items: [],
  loading: false,
  error: null,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    clearFollowings(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetApp, () => initialState) // ✅ Reset al cerrar sesión

      .addCase(fetchFollowings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFollowings.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFollowings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFollowings } = followSlice.actions;
export default followSlice.reducer;
