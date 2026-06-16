import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import Contact from '../models/Contact.js';
import { sendContactEmail } from '../services/emailService.js';

/**
 * @desc    Submit contact form
 * @route   POST /api/contact
 * @access  Public
 */
export const submitContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Save to database
  const contact = await Contact.create({
    name,
    email,
    subject,
    message,
  });

  // Send email notification
  try {
    await sendContactEmail(contact);
  } catch (error) {
    console.error('Failed to send contact email:', error);
    // Don't throw error, contact submission is still successful
  }

  res.status(201).json(
    new ApiResponse(
      201,
      { contact },
      'Thank you for contacting us. We will get back to you soon.'
    )
  );
});

/**
 * @desc    Get all contact submissions (Admin only)
 * @route   GET /api/contact/all
 * @access  Private/Admin
 */
export const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(
      200,
      { contacts, count: contacts.length },
      'Contacts retrieved successfully'
    )
  );
});