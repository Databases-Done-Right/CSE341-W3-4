const routes = require('express').Router();
const companies = require('./companies');
const services = require('./services');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../swagger.json');

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.use('/companies', companies);
routes.use('/services', services);

module.exports = routes;
