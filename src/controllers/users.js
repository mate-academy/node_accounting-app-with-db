'use strict';

const usersService = require('../services/users');

const getAllUsers = async(req, res) => {
  const users = await usersService.getAllUsers();

  res.send(users);
};

const getUserById = async(req, res) => {
  const { userId } = req.params;
  const findedUser = await usersService.getUserById(userId);

  if (!findedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(findedUser);
};

const addUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersService.addUser(name);

  res.statusCode = 201;

  res.send(newUser);
};

const deleteUser = async(req, res) => {
  const { userId } = req.params;
  const findedUser = await usersService.getUserById(userId);

  if (!findedUser) {
    res.sendStatus(404);

    return;
  }

  await usersService.deleteUser(userId);

  res.sendStatus(204);
};

const updateUser = async(req, res) => {
  const { userId } = req.params;

  const findedUser = await usersService.getUserById(userId);

  if (!findedUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  const updatedUser = await usersService.updateUser(findedUser, name);

  res.send(updatedUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
};
