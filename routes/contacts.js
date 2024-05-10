const routes = require('express').Router();
const contactsController = require('../controllers/contacts.js');
const validation = require('../middleware/validate/contacts');

routes.get('/', contactsController.getAllContacts);
routes.get('/:id', contactsController.getSingleContact);

routes.post('/', validation.contact, contactsController.addNewContact);
routes.put('/:id', validation.contact, contactsController.updateContact);
routes.delete('/:id', contactsController.deleteContact);

module.exports = routes;