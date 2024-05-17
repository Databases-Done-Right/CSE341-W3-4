const routes = require('express').Router();
const companies = require('./companies');
const services = require('./services');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../swagger.json');
const passport = require('passport');

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.use('/companies', companies);
routes.use('/services', services);

routes.get('/login', passport.authenticate('github'), (req, res) => {});

routes.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if(err) {
            return next(err);
        }
        res.redirect('/');
    })
});

module.exports = routes;
