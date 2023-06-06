'use strict';

const userService = require('../services/users');

async function getAll(req, res) {
  const users = await userService.getAllUsers();

  res.send(users);
};

async function getOne(req, res) {
  const { userId } = req.params;
  const foundUser = await userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

async function add(req, res) {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.createUser(name);

  res.status(201);
  res.send(newUser);
};

async function remove(req, res) {
  const { userId } = req.params;
  const foundUser = await userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  userService.removeUser(userId);

  res.sendStatus(204);
};

async function update(req, res) {
  const { userId } = req.params;
  const foundUser = await userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userService.updateUser(userId, req.body);

  res.send(foundUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
