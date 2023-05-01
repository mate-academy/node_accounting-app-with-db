'use strict';

const userService = require('../services/users.js');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async(req, res) => {
  const userId = +req.params.userId;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const addUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.addUser(name);

  res.status(201);
  res.send(newUser);
};

const removeUser = async(req, res) => {
  const userId = +req.params.userId;
  const foundUser = await userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userService.removeUser(foundUser.id);

  res.sendStatus(204);
};

const updateUser = async(req, res) => {
  const userId = +req.params.userId;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await userService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (typeof name !== 'string' || !name) {
    res.sendStatus(422);

    return;
  }

  const updatedUser = await userService.updateUser(userId, name);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  addUser,
  removeUser,
  updateUser,
};
