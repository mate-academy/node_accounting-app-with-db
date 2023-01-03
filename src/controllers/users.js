'use strict';

const usersService = require('../services/users');

const getAllUsers = (req, res) => {
  const users = usersService.getAllUsers();

  res.send(users);
};

const getSingleUser = (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.sendStatus(400);

    return;
  }

  const requestedUser = usersService.getUserById(+userId);

  if (!requestedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(requestedUser);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (isNaN(+userId) || !name) {
    res.sendStatus(400);

    return;
  }

  const requestedUser = usersService.getUserById(+userId);

  if (!requestedUser) {
    res.sendStatus(404);

    return;
  }

  usersService.updateUser(+userId, name);

  res.send(requestedUser);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.sendStatus(400);

    return;
  }

  const requestedUser = usersService.getUserById(+userId);

  if (!requestedUser) {
    res.sendStatus(404);

    return;
  }

  usersService.removeUser(+userId);
  res.sendStatus(204);
};

module.exports = {
  getAllUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
};
