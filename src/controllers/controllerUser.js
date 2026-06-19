'use strict';

const userService = require('../services/serviceUsers');

const getAll = async (_req, res) => {
  const users = await userService.getAllUsers();

  res.json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.json(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const newUser = await userService.createUser(name);

  res.status(201).json(newUser);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Name is required');
  }

  const user = await userService.updateUser(id, name);

  if (!user) {
    return res.status(404).send('User not found');
  }

  res.json(user);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const isDeleted = await userService.deleteUser(id);

  if (!isDeleted) {
    return res.status(404).send('User not found');
  }

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
