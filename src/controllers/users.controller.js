'use strict';

const userServices = require('../services/users.services');

const getAll = (_req, res) => {
  res.send(userServices.getAll());
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.status(201).send(userServices.createUser(name));
};

const getCurrentUser = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const remove = (req, res) => {
  const { userId } = req.params;
  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userServices.removeUser(userId);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  res.send(userServices.updateUser(userId, name));
};

module.exports = {
  getAll,
  add,
  getCurrentUser,
  remove,
  update,
};
