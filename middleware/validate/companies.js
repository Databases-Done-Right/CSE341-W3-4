const validator = require('../../helpers/validation');

const collection = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    address: 'required|string',
    city: 'required|string',
    state: 'required|string',
    zipCode: 'required|string',
    website: 'required|string',
    phoneNumber: 'required|string',
    email: 'required|email'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Data validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  collection
};