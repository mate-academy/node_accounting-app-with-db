'use strict';

const usersServices = require('../services/users');

const getAllUsers = async(req, res) => {
  const users = await usersServices.getAllUsers();

  res.send(users);
};

const getUserById = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersServices.getUserById(userId);

  if (typeof +userId !== 'number'
    || +userId <= 0
  ) {
    res.sendStatus(400);

    return;
  }

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const createUser = async(req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string' || !name.length) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersServices.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const removeUser = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersServices.getUserById(userId);

  if (typeof +userId !== 'number'
    || userId <= 0
  ) {
    res.sendStatus(400);

    return;
  }

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await usersServices.removeUser(userId);

  res.sendStatus(204);
};

const updateUser = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = await usersServices.getUserById(userId);

  if (typeof +userId !== 'number' || Number.isInteger(userId)) {
    res.sendStatus(400);

    return;
  }

  if (typeof name !== 'string' || !name.length) {
    res.sendStatus(400);

    return;
  }

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await usersServices.updateUser(userId, name);

  res.send(foundUser);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
