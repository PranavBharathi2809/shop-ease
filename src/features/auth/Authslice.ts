import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../types/Auth";
import { signInAPI } from "../Apis/SignInAPis";
import { signUpAPI } from "../Apis/SignUpApis";

const initialState: AuthState = {
  isAuthentication: false,
  name: null,
  token: null,
  loading: false,
  error: null,
  message: null,
  email: null,
};

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.isAuthentication = false;
      state.name = null;
      state.token = null;
      state.email = null;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // signInAPI pending
    builder.addCase(signInAPI.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // signInAPI fulfilled
    builder.addCase(
  signInAPI.fulfilled,
  (
    state,
    action: PayloadAction<{
      message: string;
      accessToken: string;
      user: {
        Name: string;
        Email: string;
      };
    }>
  ) => {
    state.loading = false;
    state.isAuthentication = true;
    state.name = action.payload.user.Name;
    state.token = action.payload.accessToken;
    state.message = action.payload.message;
    state.email = action.payload.user.Email;
    state.error = null;
  }
);


    // signInAPI rejected
    builder.addCase(signInAPI.rejected, (state, action) => {
      state.loading = false;
      state.isAuthentication = false;
      state.name = null;
      state.token = null;
      state.email = null;                      // Clear email on failure
      // payload may be undefined, so fallback to error.message
      if (action.payload) {
        state.error = action.payload as string;
      } else {
        state.error = action.error.message || "Login failed";
      }
    });

    // signUpAPI pending
    builder.addCase(signUpAPI.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // signUpAPI fulfilled
    builder.addCase(
      signUpAPI.fulfilled,
      (
        state,
        action: PayloadAction<{
          message: string;
          email: string;
          name: string;
          token: string;
        }>
      ) => {
        state.loading = false;
        state.isAuthentication = true;
        state.name = action.payload.name;
        state.token = action.payload.token;
        state.message = action.payload.message;
        state.email = action.payload.email;
        state.error = null;
      }
    );

    // signUpAPI rejected
    builder.addCase(signUpAPI.rejected, (state, action) => {
      state.loading = false;
      state.isAuthentication = false;
      state.name = null;
      state.token = null;
      state.email = null;
      if (action.payload) {
        state.error = action.payload as string;
      } else {
        state.error = action.error.message || "Signup failed";
      }
    });
  },
});

export const { signOut } = authenticationSlice.actions;
export default authenticationSlice.reducer;
