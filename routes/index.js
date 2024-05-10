const routes = require('express').Router();
const contacts = require('./contacts');
//const getProfessionalDataController = require('../controllers/professionalData');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../swagger.json');

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.use('/contacts', contacts);
//routes.get('/professional', getProfessionalDataController.getData);

module.exports = routes;
