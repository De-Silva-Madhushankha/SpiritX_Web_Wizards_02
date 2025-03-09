import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { startLoading, stopLoading, setUser, setError } from './authSlice';

// Login user
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      const response = await axios.post('/api/auth/login', credentials);
      dispatch(setUser(response.data));
      dispatch(stopLoading());
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      dispatch(setError(errorMessage));
      dispatch(stopLoading());
      return rejectWithValue(errorMessage);
    }
  }
);

// Register user
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      const response = await axios.post('/api/auth/register', userData);
      dispatch(setUser(response.data));
      dispatch(stopLoading());
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      dispatch(setError(errorMessage));
      dispatch(stopLoading());
      return rejectWithValue(errorMessage);
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      await axios.post('/api/auth/logout');
      dispatch(setUser(null));
      dispatch(stopLoading());
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Logout failed';
      dispatch(setError(errorMessage));
      dispatch(stopLoading());
      return rejectWithValue({ success: false, error: errorMessage });
    }
  }
);

// Send OTP for password reset
export const sendOTP = createAsyncThunk(
  'auth/sendOTP',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/forgot-password/send-otp', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to send verification code' }
      );
    }
  }
);

// Verify OTP
export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/forgot-password/verify-otp', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to verify code' }
      );
    }
  }
);

// Reset password with verified OTP
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/forgot-password/reset-password', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to reset password' }
      );
    }
  }
);