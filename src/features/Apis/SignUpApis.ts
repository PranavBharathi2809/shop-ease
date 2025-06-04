import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// defines async thunk based API call for sign-up
export const signUpAPI = createAsyncThunk(
  "auth/signup",
  async (
    credentials: { Name: string; Email: string; Password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        credentials
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "signup failed"
      );
    }
  }
);
