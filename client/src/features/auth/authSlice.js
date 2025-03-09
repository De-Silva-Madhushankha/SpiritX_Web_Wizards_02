import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userType: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { startLoading, stopLoading, setUser, setError, logout } = authSlice.actions;
export default authSlice.reducer;