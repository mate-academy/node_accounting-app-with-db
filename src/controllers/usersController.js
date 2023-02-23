'use strict';

const userService = require('../services/usersServices');

async function getAll(req, res) {
  const users = await userService.getAll();

  res.send(
    users.map(userService.normalize)
  );
}

async function getById(req, res) {
  const { userId } = req.params;

  const foundUser = await userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(userService.normalize(foundUser));
}

async function create(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.create(name);

  res.statusCode = 201;
  res.send(userService.normalize(newUser));
}

async function remove(req, res) {
  const { userId } = req.params;

  const foundUser = await userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(userId);
  res.sendStatus(204);
}

async function update(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  const foundUser = await userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userService.update({
    userId, name,
  });

  res.send(userService.normalize(foundUser));
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
