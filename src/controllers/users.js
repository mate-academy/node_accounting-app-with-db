'use strict';

const usersService = require('../services/users');

const getAllUsers = async(req, res) => {
  const users = await usersService.getAllUsers();

  res.send(
    users.map(usersService.normalize)
  );
};

const getUserById = async(req, res) => {
  const { userId } = req.params;

  const user = await usersService.getUserById(userId);

  res.send(
    usersService.normalize(user)
  );
};

const createUser = async(req, res) => {
  const { name } = req.body;

  const newUser = await usersService.createUser(name);

  res.send(
    usersService.normalize(newUser)
  );
};

const removeUser = (req, res) => {
  const { userId } = req.params;

  usersService.removeUser(userId);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  usersService.updateUser(userId, name);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
