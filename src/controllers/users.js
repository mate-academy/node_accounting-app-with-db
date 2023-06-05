'use strict';

const usersServices = require('../services/users');

const getAll = async(req, res) => {
  const users = await usersServices.getAllUsers();

  res.send(users);
};

const getOne = async(req, res) => {
  const { userId } = req.params;
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

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundUser = usersServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await usersServices.removeUser(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = await usersServices.updateUser(userId, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
