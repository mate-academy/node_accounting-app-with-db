'use strict';

const userService = require('../services/user');
const { createErrorStatus } = require('../entity/createErrorStatus');

async function getAll(req, res) {
  const users = await userService.getAll();

  res.send(users);
};

async function getOne(req, res) {
  const { userId } = req.params;
  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
}

async function add(req, res) {
  const { name } = req.body;

  if (!name) {
    createErrorStatus(res, 400, 'name');
  }

  const newUser = await userService.create(name);

  res.status(201).send(newUser);
}

async function remove(req, res) {
  const { userId } = req.params;

  if (!userId) {
    createErrorStatus(res, 400, 'userId');

    return;
  }

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(userId);
  res.sendStatus(204);
}

async function update(req, res) {
  const { userId } = req.params;
  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    createErrorStatus(res, 404, 'userId');

    return;
  }

  const updatedUser = await userService.update({
    id: +userId,
    name: req.body.name,
  });

  res.status(200).send(updatedUser);
}

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
