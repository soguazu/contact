const Joi = require('joi');
const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    unique: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  phone_number: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line one-var
const Contact = mongoose.model('Contact', contactSchema);

function validateContact(contact) {
  const Schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    phone_number: Joi.string().required(),
  };

  return Joi.validate(contact, Schema);
}
module.exports = { Contact, validateContact };
