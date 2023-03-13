'use strict';

const userServices = require('../services/users');

const getAll = (req, res) => {
  const users = userServices.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  const user = userServices.getOne(+userId);

  if (isNaN(+userId)) {
    res.sendStatus(400);

    return;
  }

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const addUser = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const newUser = userServices.addUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const updateUser = (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const user = userServices.getOne(+userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  userServices.updateUser(+userId, name);
  res.send(user);
};

const deleteUser = (req, res) => {
  const { userId } = req.params;

  const user = userServices.getOne(+userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userServices.deleteUser(+userId);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  addUser,
  updateUser,
  deleteUser,
};
