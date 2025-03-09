import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { startLoading, stopLoading, setUser, setError } from './authSlice';

export const loginUser = createAsyncThunk(
  'auth/signin',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      const response = await axios.post('/auth/signin', credentials);
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

export const registerUser = createAsyncThunk(
  'auth/signup',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());

      userData = {
        username: userData.username,
        email: userData.email.toLowerCase(),
        password: userData.password
      };

      const response = await axios.post('/auth/signup', userData);

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

export const logoutUser = createAsyncThunk(
  'auth/signout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      const response = await axios.post('/auth/signout');
      dispatch(setUser({
        user: null,
        token: null,
        error: null,
      }));
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

export const sendOTP = createAsyncThunk(
  'auth/sendOTP',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/forgot-password/send-otp', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to send verification code' }
      );
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/forgot-password/verify-otp', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to verify code' }
      );
    }
  }
);


export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/forgot-password/reset-password', data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to reset password' }
      );
    }
  }
);