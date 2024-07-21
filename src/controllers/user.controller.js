/* eslint-disable function-paren-newline */
const User = require('../models/User.model');
const { STATUS_CODES } = require('../constants');

const getUsers = (req, res) => {
  User.getUsers().then((users) => res.status(STATUS_CODES.OK).send(users));
};

const addUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(STATUS_CODES.BAD_REQUEST);
  }

  try {
    const user = await User.addUser(name);

    res.status(STATUS_CODES.CREATED).send(user);
  } catch {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ error: 'Failed to add user' });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await User.getUser(id);

    if (!response) {
      res.sendStatus(STATUS_CODES.NOT_FOUND);
    } else {
      res.status(STATUS_CODES.OK).send(response);
    }
  } catch {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ error: 'Failed to get user' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await User.getUser(id);

    if (!response) {
      res.sendStatus(STATUS_CODES.NOT_FOUND);
    } else {
      await User.deleteUser(id);
      res.sendStatus(STATUS_CODES.NO_CONTENT);
    }
  } catch {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ error: 'Failed to delete user' });
  }
};

const updateUser = async (req, res) => {
  const properties = req.body;

  try {
    const response = await User.getUser(req.params.id);

    if (!response) {
      res.sendStatus(STATUS_CODES.NOT_FOUND);
    } else {
      const updatedUser = await User.updateUser(req.params.id, properties);

      res.status(STATUS_CODES.OK).send(updatedUser);
    }
  } catch {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send({ error: 'Failed to update user' });
  }
};

module.exports = {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
};
