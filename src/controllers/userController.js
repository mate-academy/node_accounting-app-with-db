'use strict';

const userServices = require('../services/userServices.js');

const getAll = async(_req, res) => {
  const users = await userServices.getAll();

  res.send(users.map(user => userServices.normalize(user)));
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userServices.createUser(name);

  res.status(201).send(userServices.normalize(newUser));
};

const getCurrentUser = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(userServices.normalize(foundUser));
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userServices.removeUser(userId);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const foundUser = await userServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userServices.updateUser(userId, name);

  const updateUser = await userServices.getUserById(userId);

  res.send(userServices.normalize(updateUser));
};

module.exports = {
  getAll,
  add,
  getCurrentUser,
  remove,
  update,
};
