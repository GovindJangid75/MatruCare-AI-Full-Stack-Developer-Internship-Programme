import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import Hackathon from '../models/Hackathon.js';
import { sendRegistrationEmail } from '../services/emailService.js';

/**
 * @desc    Register for hackathon
 * @route   POST /api/hackathon/register
 * @access  Private
 */
export const registerHackathon = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  // Check if user already registered
  const existingRegistration = await Hackathon.findOne({ userId });

  if (existingRegistration) {
    throw new ApiError(400, 'You have already registered for the hackathon');
  }

  // Validate team members count
  const { teamSize, teamMembers } = req.body;
  
  if (teamSize === 1 && teamMembers && teamMembers.length > 0) {
    throw new ApiError(400, 'Solo participants should not have team members');
  }

  if (teamSize > 1 && (!teamMembers || teamMembers.length !== teamSize - 1)) {
    throw new ApiError(
      400,
      `Please provide exactly ${teamSize - 1} team member(s) (max team size is 5)`
    );
  }

  // Create registration
  const registration = await Hackathon.create({
    userId,
    ...req.body,
  });

  // Send confirmation email
  try {
    await sendRegistrationEmail(registration);
  } catch (error) {
    console.error('Failed to send registration email:', error);
    // Don't throw error, registration is still successful
  }

  res.status(201).json(
    new ApiResponse(
      201,
      { registration },
      'Hackathon registration successful'
    )
  );
});

/**
 * @desc    Get user's hackathon entry
 * @route   GET /api/hackathon/my-entry
 * @access  Private
 */
export const getMyEntry = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const registration = await Hackathon.findOne({ userId });

  if (!registration) {
    return res.status(200).json(
      new ApiResponse(200, { registration: null }, 'No registration found')
    );
  }

  res.status(200).json(
    new ApiResponse(200, { registration }, 'Registration retrieved successfully')
  );
});

/**
 * @desc    Update hackathon entry
 * @route   PUT /api/hackathon/update/:id
 * @access  Private
 */
export const updateEntry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const registration = await Hackathon.findById(id);

  if (!registration) {
    throw new ApiError(404, 'Registration not found');
  }

  // Check if user owns this registration
  if (registration.userId.toString() !== userId) {
    throw new ApiError(403, 'Not authorized to update this registration');
  }

  // Validate team members count if teamSize is being updated
  const { teamSize, teamMembers } = req.body;
  
  if (teamSize) {
    if (teamSize === 1 && teamMembers && teamMembers.length > 0) {
      throw new ApiError(400, 'Solo participants should not have team members');
    }

    if (teamSize > 1 && (!teamMembers || teamMembers.length !== teamSize - 1)) {
      throw new ApiError(
        400,
        `Please provide exactly ${teamSize - 1} team member(s) (max team size is 5)`
      );
    }
  }

  // Update registration
  Object.assign(registration, req.body);
  await registration.save();

  res.status(200).json(
    new ApiResponse(200, { registration }, 'Registration updated successfully')
  );
});

/**
 * @desc    Delete hackathon entry
 * @route   DELETE /api/hackathon/:id
 * @access  Private
 */
export const deleteEntry = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const registration = await Hackathon.findById(id);

  if (!registration) {
    throw new ApiError(404, 'Registration not found');
  }

  // Check if user owns this registration
  if (registration.userId.toString() !== userId) {
    throw new ApiError(403, 'Not authorized to delete this registration');
  }

  await registration.deleteOne();

  res.status(200).json(
    new ApiResponse(200, null, 'Registration deleted successfully')
  );
});

/**
 * @desc    Get all registrations (Admin only)
 * @route   GET /api/hackathon/all
 * @access  Private/Admin
 */
export const getAllRegistrations = asyncHandler(async (req, res) => {
  const registrations = await Hackathon.find()
    .populate('userId', 'fullName email')
    .sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(
      200,
      { registrations, count: registrations.length },
      'Registrations retrieved successfully'
    )
  );
});