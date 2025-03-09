import jwt from 'jsonwebtoken';
import { errorHandler } from './errorHandler.js';

export const generateTokenAndSetCookie = (userId, res) => {

  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Secure in production
    sameSite: 'lax', // CSRF protection
    expires: new Date(Date.now() +  6 * 60 * 60 * 1000), // 1 day
    maxAge: 1 * 6 * 60 * 60 * 1000, // 1 days
  });

  return token;
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};


// Clear JWT token from cookie
export const clearCookie = (res) => {
  res.clearCookie('access_token').status(200).json({ message: 'Signout successfully' });
};


// Get user ID from JWT token
export const getUserIdFromToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};