import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,          // { id, name, role, permissions }
  isAuthenticated: false,
  loading: true
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const {
  setUser,
  clearUser,
  setAuthLoading
} = userSlice.actions;

export default userSlice.reducer;