import Joi from 'joi';

export const createParcelSchema = Joi.object({
  sender_id: Joi.number().integer().required().messages({
    'number.base': 'Sender ID must be a number',
    'any.required': 'Sender ID is required',
  }),
  receiver_id: Joi.number().integer().required().messages({
    'number.base': 'Receiver ID must be a number',
    'any.required': 'Receiver ID is required',
  }),
  pickup_location: Joi.string().required().messages({
    'string.base': 'Pickup location must be a string',
    'any.required': 'Pickup location is required',
  }),
  destination: Joi.string().required().messages({
    'string.base': 'Destination must be a string',
    'any.required': 'Destination is required',
  }),
});

export const updateParcelStatusSchema = Joi.object({
  parcel_id: Joi.number().integer().required().messages({
    'number.base': 'Parcel ID must be a number',
    'any.required': 'Parcel ID is required',
  }),
  status: Joi.string()
    .valid('pending', 'in transit', 'delivered', 'cancelled')
    .required()
    .messages({
      'string.base': 'Status must be a string',
      'any.only': 'Status must be one of [pending, in transit, delivered, cancelled]',
      'any.required': 'Status is required',
    }),
});
