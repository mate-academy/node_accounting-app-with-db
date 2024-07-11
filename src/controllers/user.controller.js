'use strict';

const {
  normalize,
  getAll,
  getById,
  create,
  remove,
  update,
} = require('../services/user.service');

const get = async (req, res) => {
  try {
    const users = await getAll();

    res.send(users.map(normalize));
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
};

const getByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getById(id);

    if (!user) {
      res.status(404).send({ message: 'User not found' });

      return;
    }
    res.send(normalize(user));
  } catch (error) {
    res.status(500).send('Error fetching user by id');
  }
};

const createController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).send({ message: 'Name is required' });

      return;
    }

    const user = await create(name);

    res.status(201).send(normalize(user));
  } catch (error) {
    res.status(500).send('Error creating user');
  }
};

const removeController = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await remove(id);

    if (!success) {
      res.status(404).send({ message: 'User not found' });

      return;
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send('Error removing user');
  }
};

const updateController = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!updates.name && updates.name !== '') {
      res.status(400).send({ message: 'Name is required' });

      return;
    }

    const user = await update(id, updates);

    if (!user) {
      res.status(404).send({ message: 'User not found' });

      return;
    }
    res.send(normalize(user));
  } catch (error) {
    res.status(500).send('Error updating user');
  }
};

module.exports = {
  get,
  getById: getByIdController,
  create: createController,
  remove: removeController,
  update: updateController,
};
