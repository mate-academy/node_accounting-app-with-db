'use strict';

const serviceUser = require('./../service/users.service');

const getAllUsers = async (req, res) => {
  try {
    const users = await serviceUser.getAllUsers();

    res.statusCode = 200;
    res.send(users);
  } catch (err) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await serviceUser.getUserById(id);

    if (!user) {
      return res.status(404).send('User with this id does not exist');
    }

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Name parameter is required');
    }

    const newUser = await serviceUser.createUser(name);

    return res.status(201).send(newUser);
  } catch (err) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await serviceUser.getUserById(id);

    if (!user) {
      return res.status(404).send('User with this id does not exist');
    }

    await serviceUser.deleteUser(id);

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).send('Invalid id');
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send('Empty body');
    }

    const { name } = req.body;

    if (typeof name !== 'string') {
      return res.status(400).send('Invalid name');
    }

    const user = await serviceUser.getUserById(id);

    if (!user) {
      return res.status(404).send('User with this id does not exist');
    }

    await serviceUser.updateUser(id, { name });

    const updatedUser = await serviceUser.getUserById(id);

    return res.status(200).send(updatedUser);
  } catch (err) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
