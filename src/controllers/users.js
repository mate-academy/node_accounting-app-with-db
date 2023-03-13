'use strict';

const userService = require('../services/users');

const getAll = async(req, res) => {
  const users = await userService.getUsers();

  res.send(users.map(userService.normalize));
};

const getOne = async(req, res) => {
  const { userId } = req.params;

  if (isNaN(+userId)) {
    res.sendStatus(422);

    return;
  }

  const foundUser = await userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(userService.normalize(foundUser));
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const newUser = await userService.createUser(name);

  res.status(201);
  res.send(userService.normalize(newUser));
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const foundUser = await userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.updateUser({
    id: userId,
    name,
  });

  res.send(userService.normalize(foundUser));
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
