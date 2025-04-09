import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "auth/RegisterUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8002/user/signup", userData);
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
      const response = await axios.post("http://localhost:8002/user/login", userData);
      console.log(response,"response.data);")
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);


