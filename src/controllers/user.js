'use strict';

const userService = require('../services/user');

const getAll = (req, res) => {
  const users = userService.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.addUser(name);

  res.status(201);
  res.send(user);
};

const removeUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.removeUser(+userId);
  res.sendStatus(204);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name || !userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = userService.getById(+userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.updateUser(+userId, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  addUser,
  getOne,
  removeUser,
  updateUser,
};
