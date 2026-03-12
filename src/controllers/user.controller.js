'use strict';

const userService = require('../services/user.service');

const getAll = async (req, res) => {
  const users = await userService.getAll();

  res.json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getById(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (err) {
    res.status(400).send('Invalid ID format');
  }
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const user = await userService.create(name);

  res.status(201).json(user);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  try {
    const updatedUser = await userService.update(id, name);

    if (updatedUser === null) {
      return res.status(404).send('User not found');
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).send('Invalid ID format');
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await userService.remove(id);

    if (deletedRows === 0) {
      return res.status(404).send('User not found');
    }

    res.status(204).send();
  } catch (err) {
    res.status(400).send('Invalid ID format');
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
