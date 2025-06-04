import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// This thunk sends PayPal transaction data to your transaction microservice
export const sendTransaction = createAsyncThunk(
  "payment/sendTransaction",
  async (payload: { email: string; transaction: { id: string } }, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:4005/transactions", payload);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to send transaction");
    }
  }
);
