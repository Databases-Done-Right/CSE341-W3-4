const validator = require('../../helpers/validation');

const contact = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    favoriteColor: 'required|string',
    birthday: 'string'
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
  contact
};