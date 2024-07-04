const userService = require('../services/user.service');
const { validate: uuidValidate } = require('uuid');
const getUsers = async (_, res) => {
  const users = await userService.getUsers();

  res.json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!uuidValidate(id)) {
    res.status(404).json({ message: 'Invalid id' });

    return;
  }

  const user = await userService.getUserById(id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.json(user);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Field "name" is required' });
  }

  const user = await userService.createUser(name);

  res.status(201).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!uuidValidate(id)) {
    res.status(404).json({ message: 'Invalid id' });

    return;
  }

  const user = await userService.deleteUser(id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.status(204).end();
};

const patchUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!uuidValidate(id)) {
    res.status(404).json({ message: 'Invalid id' });

    return;
  }

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const user = await userService.patchUser(id, name);

  if (!user) {
    res.status(404).json({ message: 'User not found' });

    return;
  }

  res.json(user);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  patchUser,
};
