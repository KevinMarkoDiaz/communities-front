import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../src/api/axiosInstance";
import { mostrarFeedback } from "./feedbackSlice";

// Obtener todos los mensajes de una conversación
export const fetchMessages = createAsyncThunk(
  "messages/fetchAll",
  async (conversationId, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.get(`/messages/${conversationId}`);
      return res.data;
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: "No se pudieron cargar los mensajes",
          type: "error",
        })
      );
      return rejectWithValue(
        err.response?.data?.msg || "Error al cargar mensajes"
      );
    }
  }
);

// Enviar un mensaje
export const sendMessage = createAsyncThunk(
  "messages/send",
  async ({ conversationId, text }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.post("/messages", {
        conversationId,
        text,
      });
      return res.data;
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: "No se pudo enviar el mensaje",
          type: "error",
        })
      );
      return rejectWithValue(
        err.response?.data?.msg || "Error al enviar mensaje"
      );
    }
  }
);

// Marcar un mensaje como leído
export const markMessageRead = createAsyncThunk(
  "messages/markRead",
  async (messageId, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.put(`/messages/${messageId}/read`);
      return messageId;
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: "No se pudo marcar el mensaje como leído",
          type: "error",
        })
      );
      return rejectWithValue(
        err.response?.data?.msg || "Error al marcar mensaje"
      );
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    items: [],
    loading: false,
    error: null,
    sending: false,
  },
  reducers: {
    clearMessages: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send
      .addCase(sendMessage.pending, (state) => {
        state.sending = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sending = false;
        state.items.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload;
      })

      // Mark Read
      .addCase(markMessageRead.fulfilled, (state, action) => {
        const idx = state.items.findIndex((msg) => msg._id === action.payload);
        if (idx !== -1) {
          state.items[idx].isRead = true;
        }
      });
  },
});

export const { clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
