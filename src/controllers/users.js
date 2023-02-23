'use strict';

const userService = require('../services/users');

async function getAllUsers(req, res) {
  const users = await userService.getAllUsers();

  res.send(users.map(user => userService.normalize(user)));
};

async function getUserById(req, res) {
  const { userId } = req.params;

  const foundUser = await userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  };

  res.send(userService.normalize(foundUser));
};

async function createUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  };

  const newUser = await userService.c(name);

  res.statusCode = 201;
  res.send(userService.normalize(newUser));
};

async function removeUser(req, res) {
  const { userId } = req.params;

  const foundUser = await userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  };

  userService.removeUser(userId);

  res.sendStatus(204);
};

async function updateUser(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = await userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  };

  userService.updateUser(userId, name);

  res.statusCode = 200;
  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
