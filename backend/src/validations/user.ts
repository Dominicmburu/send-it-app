import Joi from 'joi';

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username must be a string',
    'string.empty': 'Username cannot be empty',
    'string.min': 'Username must be at least 3 characters',
    'string.max': 'Username must be less than or equal to 30 characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Must be a valid email',
    'any.required': 'Email is required',
  }),
  phone_number: Joi.string().required().messages({
    'string.base': 'Phone number must be a string',
    'string.empty': 'Phone number cannot be empty',
    'any.required': 'Phone number is required',
  }),
  address: Joi.string().required().messages({
    'string.base': 'Address must be a string',
    'string.empty': 'Address cannot be empty',
    'any.required': 'Address is required',
  }),
  password: Joi.string().min(6).optional().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password must be at least 6 characters',
  }),
});
