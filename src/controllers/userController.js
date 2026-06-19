'use strict';

const userService = require('../services/userService');

const getUsers = async (req, res) => {
  const users = await userService.getAll();

  res.json(users);
};

const getUser = async (req, res) => {
  const id = Number(req.params.id);
  const user = await userService.getById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const user = await userService.create(name);

  res.status(201).json(user);
};

const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const user = await userService.update(id, name);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  const deleted = await userService.remove(id);

  if (!deleted) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.sendStatus(204);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
