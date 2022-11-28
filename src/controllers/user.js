'use strict';

const userService = require('../data-services/user');

async function getAll(req, res) {
  res.send(await userService.getAll());
}

async function getOne(req, res) {
  const { userId } = req.params;

  if (isNaN(parseInt(userId))) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getOne(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
}

async function create(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(await userService.create(name));
}

async function remove(req, res) {
  const { userId } = req.params;

  if (isNaN(parseInt(userId))) {
    res.sendStatus(400);

    return;
  }

  const userToDelete = await userService.getOne(userId);

  if (!userToDelete) {
    res.sendStatus(404);

    return;
  }

  await userService.deleteOne(userId);
  res.sendStatus(204);
}

async function modify(req, res) {
  const { userId } = req.params;
  const { name } = req.body;

  if (isNaN(parseInt(userId))) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getOne(userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  await userService.modifyOne(userId, name);

  res.statusCode = 200;
  res.send(await userService.getOne(userId));
}

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  modify,
};
