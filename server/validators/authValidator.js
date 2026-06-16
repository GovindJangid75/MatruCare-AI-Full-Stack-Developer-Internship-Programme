import Joi from 'joi';

/**
 * Signup validation schema
 */
export const signupSchema = Joi.object({
  fullName: Joi.string()
    .min(3)
    .max(50)
    .required()
    .trim()
    .messages({
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name cannot exceed 50 characters',
      'any.required': 'Full name is required',
    }),
  email: Joi.string()
    .email()
    .required()
    .lowercase()
    .trim()
    .messages({
      'string.email': 'Please enter a valid email',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required',
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Please confirm your password',
    }),
});

/**
 * Login validation schema
 */
export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .lowercase()
    .trim()
    .messages({
      'string.email': 'Please enter a valid email',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required',
    }),
});

/**
 * OTP verification schema
 */
export const verifyOtpSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .lowercase()
    .trim(),
  otp: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.length': 'OTP must be 6 digits',
      'string.pattern.base': 'OTP must contain only numbers',
      'any.required': 'OTP is required',
    }),
});

/**
 * Resend OTP schema
 */
export const resendOtpSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .lowercase()
    .trim()
    .messages({
      'string.email': 'Please enter a valid email',
      'any.required': 'Email is required',
    }),
});