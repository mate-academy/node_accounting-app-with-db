'use strict';

const usersServices = require('../services/users');

async function getAll(req, res) {
  const users = await usersServices.getAll();

  res.statusCode = 200;
  res.send(users.map(usersServices.normalize));
}

async function addUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersServices.addUser(name);

  res.statusCode = 201;
  res.send(usersServices.normalize(newUser));
}

async function getById(req, res) {
  const { userId } = req.params;

  const foundUser = await usersServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(usersServices.normalize(foundUser));
}

async function removeUser(req, res) {
  const { userId } = req.params;

  const userToRemove = await usersServices.getById(userId);

  if (!userToRemove) {
    res.sendStatus(404);

    return;
  }

  await usersServices.removeUser(userId);
  res.sendStatus(204);
}

async function updateUser(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  const userToUpdate = await usersServices.getById(userId);

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await usersServices.updateUser(userId, name);

  res.statusCode = 200;
  res.send(usersServices.normalize(updatedUser));
}

module.exports = {
  getAll,
  addUser,
  getById,
  removeUser,
  updateUser,
};
