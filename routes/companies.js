const routes = require('express').Router();
const theController = require('../controllers/companies.js');
const validation = require('../middleware/validate/companies.js');

routes.get('/', theController.getAllElements);
routes.get('/:id', theController.getElementById);
routes.post('/', validation.collection, theController.addElement);
routes.put('/:id', validation.collection, theController.updateElement);
routes.delete('/:id', theController.deleteElement);

module.exports = routes;