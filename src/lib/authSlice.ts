import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the shape of the state
interface AuthState {
  token: string | null;
  userData: unknown;
  isloading: boolean;
  isError: boolean;
  error: string | null;
}

// Get the token safely (browser check)
const getTokenFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Define the initial state
let initialState: AuthState = {
  token: getTokenFromLocalStorage(), // Safely get token
  userData: null,
  isloading: false,
  isError: false,
  error: null,
};

// Async thunk for login
export const handlelogin = createAsyncThunk(
  "auth/login",
  async (formData: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        formData
      );
      return response.data; 
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearData(state) {
      state.token = null;
      state.userData = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token"); // Safely remove token
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handlelogin.fulfilled, (state, action) => {
        console.log("Login fulfilled:", action.payload);
        state.token = action.payload?.token; // Assuming the token comes from the API response
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload?.token); // Safely set token
        }
        state.userData = action.payload?.user; // Update with user data from response
        state.isloading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(handlelogin.rejected, (state, action) => {
        console.log("Login rejected:", action.error);
        state.isloading = false;
        state.isError = true;
        state.error = action.error.message || "An error occurred";
      })
      .addCase(handlelogin.pending, (state) => {
        console.log("Login pending...");
        state.isloading = true;
        state.isError = false;
        state.error = null;
      });
  },
});

export const { clearData } = authSlice.actions; // Export the actions
export const authReducer = authSlice.reducer; // Export the reducer
