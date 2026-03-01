// blogThunks.js — ONLY thunks
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/blogs?published=true");
      return Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed");
    }
  },
);
