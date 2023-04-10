'use strict';

const userService = require('../services/users.js');

const getAll = (req, res) => {
  const allUsers = userService.getALl();

  res.send(allUsers);
};

const getOne = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  userService.update(foundUser, name);
  res.send(foundUser);
};

module.exports = {
  initUsers: () => userService.resetAll(),
  getAll,
  getOne,
  add,
  remove,
  update,
};
