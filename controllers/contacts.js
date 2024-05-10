const db = require('../models');
const Contact = db.contacts;

// Create a new contact
const addNewContact = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const favoriteColor = req.body.favoriteColor;
  const birthday = req.body.birthday;

  // Validate request
  if (!firstName) {
    res.status(400).send({ message: 'First name can not be empty!' });
    return;
  }
  if (!lastName) {
    res.status(400).send({ message: 'Last name can not be empty!' });
    return;
  }
  if (!email) {
    res.status(400).send({ message: 'Email can not be empty!' });
    return;
  }
  if (!favoriteColor) {
    res.status(400).send({ message: 'Favorite color can not be empty!' });
    return;
  }
  if (!birthday) {
    res.status(400).send({ message: 'Birthday can not be empty!' });
    return;
  }

  const contact = new Contact({
    _id: generateId(50),
    firstName: firstName,
    lastName: lastName,
    email: email,
    favoriteColor: favoriteColor,
    birthday: birthday
  });
  // Save Contact in the database
  contact
    .save(contact)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the new Contact.',
      });
    });
};

const generateId = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const getAllContacts = async (req, res, next) => {
  Contact.find(
    {},
    {
      firstName: 1,
      lastName: 1,
      email: 1,
      favoriteColor: 1,
      birthday: 1,
      // _id: 0 // We don't want to see the id in the results
      _id: 1
    }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving contacts.',
      });
    });
};

const getSingleContact = async (req, res, next) => {
  if (!req.params.id || req.params.id.length != 50) {
    res.status(400).json('Must use a valid contact id to look up a contact.');
  }
  const contact_id = req.params.id;
    Contact.find({ _id: contact_id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'Not found Contact with id ' + contact_id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving Contact with id=' + contact_id,
        });
      });
};

// Delete a Contact with the specified id in the request
const deleteContact = async (req, res, next) => {
  if (!req.params.id || req.params.id.length != 50) {
    res.status(400).json('Must use a valid contact id to delete a contact.');
  }
  const id = req.params.id;
  Contact.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else {
        res.send({
          message: 'Contact was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Contact with id=' + id,
      });
    });
  };

const updateContact = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const favoriteColor = req.body.favoriteColor;
  const birthday = req.body.birthday;

// Validate request
if (!firstName) {
  res.status(400).send({ message: 'First name can not be empty!' });
  return;
}
if (!lastName) {
  res.status(400).send({ message: 'Last name can not be empty!' });
  return;
}
if (!email) {
  res.status(400).send({ message: 'Email can not be empty!' });
  return;
}
if (!favoriteColor) {
  res.status(400).send({ message: 'Favorite color can not be empty!' });
  return;
}
if (!birthday) {
  res.status(400).send({ message: 'Birthday can not be empty!' });
  return;
}

  Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else res.send({ message: 'Contact was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Contact with id=' + id,
      });
    });
};

module.exports = {
  addNewContact,
  deleteContact,
  getAllContacts,
  getSingleContact,
  updateContact
};
