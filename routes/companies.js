const routes = require('express').Router();
const theController = require('../controllers/companies.js');
const validation = require('../middleware/validate/companies.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

routes.get('/', theController.getAllElements);
routes.get('/:id', theController.getElementById);
routes.post('/', isAuthenticated, validation.collection, theController.addElement);
routes.put('/:id', isAuthenticated, validation.collection, theController.updateElement);
routes.delete('/:id', isAuthenticated, theController.deleteElement);

module.exports = routes;