'use strict';

const { userService } = require('../services/user.service.js');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users.map(userService.normalizeUser));
};

const getOne = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }
  res.send(userService.normalizeUser(foundUser));
};

const add = async(req, res) => {
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
  res.send(userService.normalizeUser(newUser));
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(userId);
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

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = await userService.update({
    id: userId,
    name,
  });

  res.send(userService.normalizeUser(updatedUser));
};

module.exports = {
  userController: {
    getAll,
    add,
    getOne,
    remove,
    update,
  },
};
