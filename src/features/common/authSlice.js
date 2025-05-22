import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    citizenId: null,
    accessToken: null,
  },
  reducers: {
    setAuthData: (state, action) => {
      state.citizenId = action.payload.id;
      state.accessToken = action.payload.accessToken;
    },
    clearAuthData: (state) => {
      state.citizenId = null;
      state.accessToken = null;
    },
  },
});
export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
