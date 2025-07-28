// src/store/userPromosSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { claimPromo, getMisPromos, redeemPromoCode } from "../api/userPromoApi";
import { mostrarFeedback } from "./feedbackSlice";

export const fetchMisPromos = createAsyncThunk(
  "userPromos/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMisPromos();
      return data;
    } catch (error) {
      return rejectWithValue("Error al obtener tus promociones guardadas");
    }
  }
);

export const claimPromoThunk = createAsyncThunk(
  "userPromos/claim",
  async (promotionId, { dispatch, rejectWithValue }) => {
    try {
      const data = await claimPromo(promotionId);
      dispatch(
        mostrarFeedback({
          message: "¡Promoción guardada!",
          type: "success",
        })
      );
      return data.userPromo;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message:
            error?.response?.data?.message || "No se pudo guardar la promoción",
          type: "error",
        })
      );
      return rejectWithValue("Error al guardar promoción");
    }
  }
);

export const redeemPromoThunk = createAsyncThunk(
  "userPromos/redeem",
  async (code, { dispatch, rejectWithValue }) => {
    try {
      const data = await redeemPromoCode(code);
      dispatch(
        mostrarFeedback({
          message: "Código redimido con éxito",
          type: "success",
        })
      );
      return data.userPromo;
    } catch (error) {
      dispatch(
        mostrarFeedback({
          message: error?.response?.data?.message || "Error al redimir código",
          type: "error",
        })
      );
      return rejectWithValue("Error al redimir código");
    }
  }
);

const userPromosSlice = createSlice({
  name: "userPromos",
  initialState: {
    lista: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMisPromos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMisPromos.fulfilled, (state, action) => {
        state.loading = false;
        state.lista = action.payload;
      })
      .addCase(fetchMisPromos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(claimPromoThunk.fulfilled, (state, action) => {
        state.lista.push(action.payload);
      })
      .addCase(redeemPromoThunk.fulfilled, (state, action) => {
        const index = state.lista.findIndex(
          (p) => p.code === action.payload.code
        );
        if (index !== -1) {
          state.lista[index] = action.payload;
        }
      });
  },
});

export default userPromosSlice.reducer;
