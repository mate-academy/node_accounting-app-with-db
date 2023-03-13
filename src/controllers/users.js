'use strict';

const usersServices = require('../services/users');

async function getAll(req, res) {
  const users = await usersServices.getAll();

  res.send(users.map(usersServices.normalizeUser));
}

async function getOne(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await usersServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(usersServices.normalizeUser(foundUser));
}

async function addNewUser(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersServices.createNewUser(name);

  res.statusCode = 201;
  res.send(usersServices.normalizeUser(newUser));
}

async function deleteUser(req, res) {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await usersServices.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await usersServices.deleteUser(userId);
  res.sendStatus(204);
}

async function updateUserInfo(req, res) {
  const { userId } = req.params;
  const { name } = req.body;
  const hasInvalidData = !name || (typeof name !== 'string');

  if (hasInvalidData || !userId) {
    res.sendStatus(400);

    return;
  }

  const userToUpdate = await usersServices.getUserById(userId);

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await usersServices.updateUserInfo({
    id: userId,
    name,
  });

  res.send(usersServices.normalizeUser(updatedUser));
}

module.exports = {
  getAll,
  getOne,
  addNewUser,
  deleteUser,
  updateUserInfo,
};
