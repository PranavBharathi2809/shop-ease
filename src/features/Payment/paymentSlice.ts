import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sendTransaction = createAsyncThunk(
  "payment/sendTransaction",
  async (payload: { email: string; transaction: { id: string } }) => {
    const response = await axios.post("http://localhost:4005/transactions", payload);
    return response.data;
  }
);

interface PaymentState {
  loading: boolean;
  error: string | null; // ✅ Allow both string and null
  success: boolean;
}

const initialState: PaymentState = {
  loading: false,
  error: null,
  success: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendTransaction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to send transaction";
        state.success = false;
      });
  },
});

export default paymentSlice.reducer;
