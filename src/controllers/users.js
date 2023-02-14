'use strict';

const usersService = require('../services/users');

const getAllUsers = (req, res) => {
  const users = usersService.getAllUsers();

  res.send(users);
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  const findedUser = usersService.getUserById(userId);

  if (!findedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(findedUser);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.addUser(name);

  res.statusCode = 201;

  res.send(newUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  const findedUser = usersService.getUserById(userId);

  if (!findedUser) {
    res.sendStatus(404);

    return;
  }

  usersService.deleteUser(userId);

  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;

  const findedUser = usersService.getUserById(userId);

  if (!findedUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  const updatedUser = usersService.updateUser(findedUser, name);

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
};
