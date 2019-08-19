const debug = require('debug');

const log = debug('http:controller');

const { Contact, validateContact } = require('../models/contact.model');

const contactLib = {};

contactLib.getAllContact = async (request, response) => {
  try {
    const contacts = await Contact.find({});
    response.json(contacts);
  } catch (error) {
    response.json(error);
  }
};

contactLib.getOneContact = async (request, response) => {
  try {
    const contact = await Contact.findById(request.params.id);
    response.json(contact);
  } catch (error) {
    response.json(error);
  }
};

contactLib.createContact = async (request, response) => {
  try {
    const { error } = validateContact(request.body);
    if (error) {
      return response.json(error.message);
    }

    const newcontact = await new Contact({
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email,
      phone_number: request.body.phone_number,
    });
    await newcontact.save();
    return response.json({ message: 'Contact created!' });
  } catch (error) {
    return response.json(error);
  }
};

contactLib.deleteContact = async (request, response) => {
  try {
    await Contact.findByIdAndDelete(request.params.id);
    response.json({ message: 'Contact deleted' });
  } catch (error) {
    response.json(error);
  }
};

contactLib.updateContact = async (request, response) => {
  try {
    const contact = await Contact.findById(request.params.id);
    await Contact.findByIdAndUpdate(request.params.id, {
      firstname: request.body.firstname || contact.firstname,
      lastname: request.body.lastname || contact.lastname,
      email: request.body.email || contact.email,
      phone_number: request.body.phone_number || contact.phone_number,
    });
    response.json({ message: 'Contact updated' });
  } catch (error) {
    response.json(error);
  }
}
module.exports = contactLib;
