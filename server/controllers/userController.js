import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import User from '../models/User.js';

/**
 * @desc    Get user profile
 * @route   GET /api/user/me
 * @access  Private
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.status(200).json(
    new ApiResponse(200, { user }, 'Profile retrieved successfully')
  );
});

/**
 * @desc    Update user profile
 * @route   PUT /api/user/update
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { fullName } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Update fields
  if (fullName) user.fullName = fullName;

  await user.save();

  res.status(200).json(
    new ApiResponse(200, { user }, 'Profile updated successfully')
  );
});