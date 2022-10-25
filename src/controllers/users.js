'use strict';

const userService = require('../services/users.js');

const getAll = async(req, res) => {
  const user = await userService.getAll();

  res.send(user);
};

const getOne = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getUserById(userId);

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

  const newUser = await userService.createUser(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.removeUser(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(404);

    return;
  }

  userService.updateUser({
    id: userId, name,
  });
  res.send(foundUser);
};

module.exports = {
  getOne,
  getAll,
  add,
  remove,
  update,
};
