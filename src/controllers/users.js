'use strict';

const usersServices = require('../services/users');

async function getAll(req, res) {
  const users = await usersServices.getAll();

  res.send(
    users.map(usersServices.normalize)
  );
}

async function getById(req, res) {
  const { userId } = req.params;

  const foundUser = await usersServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(usersServices.normalize(foundUser));
}

async function add(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersServices.create(name);

  res.statusCode = 201;
  res.send(usersServices.normalize(newUser));
}

async function remove(req, res) {
  const { userId } = req.params;
  const foundUser = await usersServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await usersServices.remove(userId);
  res.sendStatus(204);
}

async function update(req, res) {
  const { userId } = req.params;
  const foundUser = await usersServices.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  await usersServices.update(userId, name);

  const updatedUser = await usersServices.getById(userId);

  res.send(usersServices.normalize(updatedUser));
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
