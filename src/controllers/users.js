'use strict';

const userService = require('../services/users');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(
    users.map(userService.normalize)
  );
};

const getOne = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(
    userService.normalize(foundUser)
  );
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

  res.send(
    userService.normalize(newUser)
  );
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.remove(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  await userService.update({
    userId,
    name,
  });

  const updatedUser = await userService.getById(userId);

  res.send(
    userService.normalize(updatedUser)
  );
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
