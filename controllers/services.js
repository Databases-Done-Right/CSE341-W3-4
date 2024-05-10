const db = require('../models');
const theDbConnection = db.services;
const generateId = require('./../helpers/generateId')

// Create a new element
const addElement = async (req, res, next) => {
  const name = req.body.name;
  const companyName = req.body.companyName;
  const cost = req.body.cost;

  // Validate request
  if (!name) {
    res.status(400).send({ message: 'Service name can not be empty!' });
    return;
  }
  if (!companyName) {
    res.status(400).send({ message: 'Company name field can not be empty!' });
    return;
  }
  if (!cost) {
    res.status(400).send({ message: 'Cost can not be empty!' });
    return;
  }

  const service = new theDbConnection({
    _id: generateId(50),
    name,
    companyName,
    cost
  });

  // Save Service to the database
  service
    .save(service)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while creating the new service.',
      });
    });
};

const getAllElements = async (req, res, next) => {
  theDbConnection.find(
    {},
    {
      name: 1,
      companyName: 1,
      cost: 1,
      _id: 1
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while retrieving the service.',
      });
    });
};

const getElementById = async (req, res, next) => {
  if (!req.params.id || req.params.id.length != 50) {
    res.status(400).json('You must use a valid service id to look up a record.');
  }
  const element_id = req.params.id;
  theDbConnection.find({ _id: element_id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'No service found with id ' + element_id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving the service with id=' + element_id,
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
          message: `Unable to delete. No service with id=${element_id} found.`,
        });
      } else {
        res.send({
          message: 'Service was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete the service with id=' + element_id,
      });
    });
  };

const updateElement = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Service data to update can not be empty!',
    });
  }
  if (!req.params.id || req.params.id.length != 50) {
    res.status(400).json('Must use a valid service id to delete a service.');
  }
  const element_id = req.params.id;

  const name = req.body.name;
  const companyName = req.body.companyName;
  const cost = req.body.cost;

  // Validate request
  if (!name) {
    res.status(400).send({ message: 'Service name can not be empty!' });
    return;
  }
  if (!companyName) {
    res.status(400).send({ message: 'Company name field can not be empty!' });
    return;
  }
  if (!cost) {
    res.status(400).send({ message: 'Cost can not be empty!' });
    return;
  }

theDbConnection.findByIdAndUpdate(element_id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update service with id=${element_id}. Service not found!`,
        });
      } else res.send({ message: 'Service was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating service with id=' + element_id,
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
