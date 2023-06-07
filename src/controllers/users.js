'use strict';

const usersServices = require('../models/users');

const getAll = async(req, res) => {
  const users = await usersServices.getAllUsers();

  return res.send(users);
};

const getOne = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.sendStatus(400);
  }

  const foundUser = await usersServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await usersServices.createUser(name);

  res.statusCode = 201;
  res.send(user);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = await usersServices.getUserById(userId);

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await usersServices.updateUser(userId, name);

  res.send(foundUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;

  if (!Number(userId)) {
    return res.sendStatus(400);
  }

  const foundUser = await usersServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await usersServices.removeUser(userId);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
