import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import User from '../models/User.js';
import { generateAccessToken } from '../utils/tokenUtils.js';
import { sendOTPEmail } from '../services/emailService.js';

/**
 * @desc    Register new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
export const signup = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  // Validate fields
  if (!fullName || !email || !password) {
    throw new ApiError(400, 'All fields are required');
  }

  // Check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser && existingUser.isVerified) {
    throw new ApiError(400, 'User already exists with this email');
  }

  // Remove unverified old user
  if (existingUser && !existingUser.isVerified) {
    await User.findByIdAndDelete(existingUser._id);
  }

  // Create user
  const user = await User.create({
    fullName,
    email,
    password,
    isVerified: false,
  });

  // Generate OTP
  const otp = user.generateOTP();
  await user.save();

  // Send OTP email
  try {
    console.log('Sending OTP email...');
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);

    await sendOTPEmail(email, fullName, otp);

    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('EMAIL ERROR:', error);

    // Delete user if email sending fails
    await User.findByIdAndDelete(user._id);

    throw new ApiError(
      500,
      error.message || 'Failed to send OTP email'
    );
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        email: user.email,
      },
      'OTP sent to your email successfully'
    )
  );
});

/**
 * @desc    Verify OTP
 * @route   POST /api/auth/verify-otp
 * @access  Public
 */
export const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new ApiError(400, 'Email and OTP are required');
  }

  const user = await User.findOne({ email }).select('+otp +otpExpiry');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.isVerified) {
    throw new ApiError(400, 'Email already verified');
  }

  const isValidOTP = await user.verifyOTP(otp);

  if (!isValidOTP) {
    throw new ApiError(400, 'Invalid or expired OTP');
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;

  await user.save();

  const token = generateAccessToken(user._id);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          isVerified: user.isVerified,
        },
        token,
      },
      'Email verified successfully'
    )
  );
});

/**
 * @desc    Resend OTP
 * @route   POST /api/auth/resend-otp
 * @access  Public
 */
export const resendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, 'Email is required');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (user.isVerified) {
    throw new ApiError(400, 'Email already verified');
  }

  const otp = user.generateOTP();

  await user.save();

  try {
    await sendOTPEmail(email, user.fullName, otp);
  } catch (error) {
    console.error('RESEND OTP ERROR:', error);

    throw new ApiError(
      500,
      error.message || 'Failed to resend OTP'
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      { email },
      'OTP resent successfully'
    )
  );
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  if (!user.isVerified) {
    throw new ApiError(403, 'Please verify your email first');
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateAccessToken(user._id);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          isVerified: user.isVerified,
          role: user.role,
        },
        token,
      },
      'Login successful'
    )
  );
});

/**
 * @desc    Get current user
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      { user },
      'User retrieved successfully'
    )
  );
});