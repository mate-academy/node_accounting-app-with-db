'use strict';

const usersServices = require('../services/users');

const getAllUsers = async(req, res) => {
  const users = await usersServices.getAllUsers();

  res.send(users);
};

const getUserById = async(req, res) => {
  const { userId } = req.params;

  if (isNaN(parseInt(userId))) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await usersServices.getUserById(userId);

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

  if (isNaN(parseInt(userId))) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await usersServices.getUserById(userId);

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

  if (isNaN(parseInt(userId))) {
    res.sendStatus(400);

    return;
  }

  if (typeof name !== 'string' || !name.length) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await usersServices.getUserById(userId);

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
