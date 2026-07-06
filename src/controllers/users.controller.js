const usersService = require('../services/users.services');

const getUsers = async (req, res) => {
  const users = await usersService.getAll();

  res.status(200).json(users);
};

const createUser = async (req, res) => {
  if (!req.body.name) {
    return res.sendStatus(400);
  }

  const newUser = await usersService.create(req.body.name);

  res.status(201).json(newUser);
};

const getUserById = async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.sendStatus(404);
  }

  const searchedUser = await usersService.getById(id);

  if (!searchedUser) {
    return res.sendStatus(404);
  }

  res.status(200).json(searchedUser);
};

const deleteUser = async (req, res) => {
  const userId = Number(req.params.id);

  if (Number.isNaN(userId)) {
    return res.sendStatus(404);
  }

  const deletedUser = await usersService.remove(userId);

  if (!deletedUser) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const userId = Number(req.params.id);
  const userName = req.body.name?.trim();

  if (Number.isNaN(userId) || !userName) {
    return res.sendStatus(404);
  }

  const updatedUser = await usersService.update(userId, userName);

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  res.status(200).json(updatedUser);
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
