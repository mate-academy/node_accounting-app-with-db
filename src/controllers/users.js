'use strict';

const userService = require('../services/users');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async(req, res) => {
  const userId = Number(req.params.userId);

  if (isNaN(userId)) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await userService.getById(userId);

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

  const newUser = await userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = async(req, res) => {
  const userId = Number(req.params.userId);
  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(userId);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const userId = Number(req.params.userId);
  const { name } = req.body;

  if (!name || isNaN(userId) || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const [, updatedUser] = await userService.update({
    id: userId,
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
