'use strict';

const userService = require('../service/users');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const newUser = await userService.create(name);

  res.statusCode = 201;

  res.send(newUser);
};

const findById = async(req, res) => {
  const { userId } = req.params;

  const foundPerson = await userService.findById(userId);

  if (!foundPerson) {
    res.sendStatus(404);

    return;
  }

  res.send(foundPerson);
};

const remove = async(req, res) => {
  const { userId } = req.params;

  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);

  res.sendStatus(204);
};

const change = async(req, res) => {
  const { userId } = req.params;

  const foundUser = userService.findById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  userService.change(
    userId, name,
  );

  res.statusCode = 200;
  res.send(foundUser);
};

module.exports = {
  getAll,
  create,
  findById,
  remove,
  change,
};
