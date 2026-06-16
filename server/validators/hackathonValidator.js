import Joi from 'joi';

/**
 * Hackathon registration validation schema
 */
export const hackathonSchema = Joi.object({
  fullName: Joi.string()
    .required()
    .trim()
    .messages({
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
  mobile: Joi.string()
    .pattern(/^[6-9]\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Please enter a valid Indian mobile number',
      'any.required': 'Mobile number is required',
    }),
  college: Joi.string()
    .required()
    .trim()
    .messages({
      'any.required': 'College name is required',
    }),
  course: Joi.string()
    .required()
    .trim()
    .messages({
      'any.required': 'Course is required',
    }),
  branch: Joi.string()
    .required()
    .trim()
    .messages({
      'any.required': 'Branch is required',
    }),
  year: Joi.string()
    .valid('1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate')
    .required()
    .messages({
      'any.only': 'Please select a valid year',
      'any.required': 'Year of study is required',
    }),
  domain: Joi.string()
    .required()
    .trim()
    .messages({
      'any.required': 'Domain/Track is required',
    }),
  projectName: Joi.string()
    .min(5)
    .required()
    .trim()
    .messages({
      'string.min': 'Project name must be at least 5 characters long',
      'any.required': 'Project name is required',
    }),
  pptLink: Joi.string()
    .uri()
    .required()
    .trim()
    .messages({
      'string.uri': 'Please enter a valid URL for PPT',
      'any.required': 'PPT link is required',
    }),
  prototypeLink: Joi.string()
    .uri()
    .required()
    .trim()
    .messages({
      'string.uri': 'Please enter a valid URL for prototype',
      'any.required': 'Prototype link is required',
    }),
  demoVideoLink: Joi.string()
    .uri()
    .allow('')
    .trim()
    .messages({
      'string.uri': 'Please enter a valid URL for demo video',
    }),
  teamSize: Joi.number()
    .integer()
    .min(1)
    .max(4)
    .required()
    .messages({
      'number.min': 'Team size must be at least 1',
      'number.max': 'Team size cannot exceed 4',
      'any.required': 'Team size is required',
    }),
  teamMembers: Joi.array()
    .items(
      Joi.object({
        memberName: Joi.string().required().trim(),
        memberEmail: Joi.string().email().required().lowercase().trim(),
      })
    )
    .default([]),
});

/**
 * Contact form validation schema
 */
export const contactSchema = Joi.object({
  name: Joi.string()
    .required()
    .trim()
    .messages({
      'any.required': 'Name is required',
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
  subject: Joi.string()
    .required()
    .trim()
    .messages({
      'any.required': 'Subject is required',
    }),
  message: Joi.string()
    .min(10)
    .required()
    .trim()
    .messages({
      'string.min': 'Message must be at least 10 characters long',
      'any.required': 'Message is required',
    }),
});