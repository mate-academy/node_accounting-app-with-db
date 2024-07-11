/* eslint-disable function-paren-newline */
const User = require('../models/User.model');

const getUsers = (req, res) => {
  User.getUsers().then((users) => res.send(users));
};

const addUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  try {
    const user = await User.addUser(name);

    res.status(201).send(user);
  } catch {
    res.status(500).send({ error: 'Failed to add user' });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await User.getUser(id);

    if (!response) {
      res.sendStatus(404);
    } else {
      res.send(response);
    }
  } catch {
    res.status(500).send({ error: 'Failed to get user' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await User.getUser(id);

    if (!response) {
      res.sendStatus(404);
    } else {
      User.deleteUser(id);
      res.sendStatus(204);
    }
  } catch {
    res.status(500).send({ error: 'Failed to delete user' });
  }
};

const updateUser = async (req, res) => {
  const properties = req.body;

  try {
    const response = User.getUser(req.params.id);

    if (!response) {
      res.sendStatus(404);
    } else {
      const updatedUser = await User.updateUser(req.params.id, properties);

      res.send(updatedUser);
    }
  } catch {
    res.status(500).send({ error: 'Failed to update user' });
  }
};

module.exports = {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
};
