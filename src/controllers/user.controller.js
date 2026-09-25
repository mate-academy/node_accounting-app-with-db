/* eslint-disable no-console */
const { usersService } = require('../services/user.service');

async function getUsers(req, res) {
  const users = await usersService.getAll();

  res.send(users);
}

async function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const user = await usersService.createUser({ name });

  res.status(201).send(user);
}

async function getUser(req, res) {
  const { id } = req.params;

  const user = await usersService.getById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.send(user);
}

async function updateUser(req, res) {
  const { id } = req.params;

  const user = await usersService.getById(id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const updatedUser = await usersService.update({
    id,
    body: req.body,
  });

  res.send(updatedUser);
}

async function deleteUser(req, res) {
  const { id } = req.params;

  const user = await usersService.getById(id);

  if (!user) {
    return res.status(404).json({ error: 'User does not exist' });
  }

  await usersService.deleteById(id);

  res.sendStatus(204);
}

const usersController = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  usersController,
};
