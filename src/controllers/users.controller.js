'use strict';

const User = require('../models/User.model');

async function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  try {
    const user = await User.create({ name });

    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).send('Server error');
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).send('Server error');
  }
}

async function getUserById(req, res) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send('Invalid ID');
  }

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send('Server error');
  }
}

async function patchUserById(req, res) {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (isNaN(id)) {
    return res.status(400).send('Invalid ID');
  }

  if (!name) {
    return res.status(400).send('Name is required');
  }

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    await user.update({ name }, { silent: true });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send('Server error');
  }
}

async function deleteUserById(req, res) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send('Invalid ID');
  }

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send('Not found');
    }

    await user.destroy();

    return res.status(204).send();
  } catch (err) {
    return res.status(500).send('Server error');
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  patchUserById,
  deleteUserById,
};
