import express from 'express';
import {
  signup,
  verifyOTP,
  resendOTP,
  login,
  getCurrentUser,
} from '../controllers/authController.js';
import { validate } from '../middleware/validator.js';
import {
  signupSchema,
  loginSchema,
  verifyOtpSchema,
  resendOtpSchema,
} from '../validators/authValidator.js';
import { authLimiter, otpLimiter } from '../middleware/rateLimiter.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signup', authLimiter, validate(signupSchema), signup);
router.post('/verify-otp', authLimiter, validate(verifyOtpSchema), verifyOTP);
router.post('/resend-otp', otpLimiter, validate(resendOtpSchema), resendOTP);
router.post('/login', authLimiter, validate(loginSchema), login);

// Protected routes
router.get('/me', protect, getCurrentUser);

export default router;