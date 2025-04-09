import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const signupUser = createAsyncThunk(
  "auth/RegisterUser",
  async (userData, { rejectWithValue }) => {
    try {
      console.log(import.meta.env.VITE_API_BASE_URL,"import.meta.env.VITE_API_BASE_URL")
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/signup`, userData);
      console.log(response,"response.data);")
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "SignUp failed");
    }
  }
);


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      console.log(import.meta.env.VITE_API_BASE_URL,"import.meta.env.VITE_API_BASE_URL")

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/login`, userData);
      console.log(response,"response.data);")
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);


