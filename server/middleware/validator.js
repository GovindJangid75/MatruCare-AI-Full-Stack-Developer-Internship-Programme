import ApiError from '../utils/ApiError.js';

/**
 * Joi validation middleware
 */
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const message = error.details.map((detail) => detail.message).join(', ');
      throw new ApiError(400, message);
    }

    next();
  };
};