const db = require('../models');
const theDbConnection = db.companies;
const generateId = require('./../helpers/generateId')

// Create a new element
const addElement = async (req, res, next) => {
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const zipCode = req.body.zipCode;
  const website = req.body.website;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;

  // Validate request
  if (!name) {
    res.status(400).send({ message: 'Company name can not be empty!' });
    return;
  }
  if (!address) {
    res.status(400).send({ message: 'Address can not be empty!' });
    return;
  }
  if (!city) {
    res.status(400).send({ message: 'City can not be empty!' });
    return;
  }
  if (!state) {
    res.status(400).send({ message: 'State can not be empty!' });
    return;
  }
  if (!zipCode) {
    res.status(400).send({ message: 'Zip Code can not be empty!' });
    return;
  }
  if (!website) {
    res.status(400).send({ message: 'Website can not be empty!' });
    return;
  }
  if (!phoneNumber) {
    res.status(400).send({ message: 'Phone Number can not be empty!' });
    return;
  }
  if (!email) {
    res.status(400).send({ message: 'Email can not be empty!' });
    return;
  }

  const company = new theDbConnection({
    _id: generateId(50),
    name,
    address,
    city,
    state,
    zipCode,
    website,
    phoneNumber,
    email
  });

  // Save Company to the database
  company
    .save(company)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while creating the new company.',
      });
    });
};

const getAllElements = async (req, res, next) => {
  theDbConnection.find(
    {},
    {
      name: 1,
      address: 1,
      city: 1,
      state: 1,
      zipCode: 1,
      website: 1,
      phoneNumber: 1,
      email: 1,
      _id: 1
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while retrieving the company.',
      });
    });
};

const getElementById = async (req, res, next) => {
  if (!req.params.id || req.params.id.length != 50) {
    res.status(400).json('You must use a valid company id to look up a record.');
  }
  const element_id = req.params.id;
  theDbConnection.find({ _id: element_id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'No company found with id ' + element_id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving the company with id=' + element_id,
        });
      });
};

// Delete an element with the specified id in the request
const deleteElement = async (req, res, next) => {
  if (!req.params.id || req.params.id.length != 50) {
    res.status(400).json('Must use a valid service id to delete a service.');
  }
  const element_id = req.params.id;
  theDbConnection.findByIdAndDelete(element_id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Unable to delete. No company with id=${element_id} found.`,
        });
      } else {
        res.send({
          message: 'Company was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete company with id=' + element_id,
      });
    });
  };

const updateElement = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Company data to update can not be empty!',
    });
  }
  if (!req.params.id || req.params.id.length != 50) {
    res.status(400).json('Must use a valid service id to delete a service.');
  }

  const element_id = req.params.id;
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const zipCode = req.body.zipCode;
  const website = req.body.website;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;

  // Validate request
  if (!name) {
    res.status(400).send({ message: 'Company name can not be empty!' });
    return;
  }
  if (!address) {
    res.status(400).send({ message: 'Address can not be empty!' });
    return;
  }
  if (!city) {
    res.status(400).send({ message: 'City can not be empty!' });
    return;
  }
  if (!state) {
    res.status(400).send({ message: 'State can not be empty!' });
    return;
  }
  if (!zipCode) {
    res.status(400).send({ message: 'Zip Code can not be empty!' });
    return;
  }
  if (!website) {
    res.status(400).send({ message: 'Website can not be empty!' });
    return;
  }
  if (!phoneNumber) {
    res.status(400).send({ message: 'Phone Number can not be empty!' });
    return;
  }
  if (!email) {
    res.status(400).send({ message: 'Email can not be empty!' });
    return;
  }

theDbConnection.findByIdAndUpdate(element_id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update company with id=${element_id}. Company not found!`,
        });
      } else res.send({ message: 'Company was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating company with id=' + element_id,
      });
    });
};

module.exports = {
  addElement,
  deleteElement,
  getAllElements,
  getElementById,
  updateElement
};
