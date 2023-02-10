'use strict';

const userService = require('../services/users');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getById = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const update = async(req, res) => {
  const { name } = req.body;
  const { userId } = req.params;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const userToUpdate = await userService.getById(userId);

  if (!userToUpdate) {
    res.sendStatus(404);

    return;
  }

  const user = await userService.update(userId, name);

  res.statusCode = 200;
  res.send(user[1]);
};

const remove = async(req, res) => {
  const { userId } = req.params;

  const userToDelete = userService.getById(userId);

  if (!userToDelete) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(userId);
  res.sendStatus(204);
};

module.exports = {
  getAll, getById, add, update, remove,
};
