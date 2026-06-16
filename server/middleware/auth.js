import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/User.js';

/**
 * Protect routes - Verify JWT token
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    throw new ApiError(401, 'Not authorized, no token provided');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token (exclude password)
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      throw new ApiError(401, 'User not found');
    }

    // Check if user is verified
    if (!req.user.isVerified) {
      throw new ApiError(403, 'Please verify your email first');
    }

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new ApiError(401, 'Invalid token');
    } else if (error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Token expired');
    }
    throw new ApiError(401, 'Not authorized');
  }
});

/**
 * Admin only access
 */
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    throw new ApiError(403, 'Not authorized as admin');
  }
};

/**
 * Optional authentication - doesn't block if no token
 */
export const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      // Token invalid, but continue anyway
      req.user = null;
    }
  }

  next();
});