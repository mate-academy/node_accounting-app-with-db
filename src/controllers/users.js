'use strict';

const userService = require('../services/users.js');

const getAll = async(req, res) => {
  const allUsers = await userService.getALl();

  res.send(allUsers.map(userService.normalize));
};

const getOne = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await userService.getById(userId);

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

    return;
  }

  const newUser = await userService.create(name);

  res.statusCode = 201;
  res.send(userService.normalize(newUser));
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
  const { name } = req.body;
  const foundUser = userService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  await userService.update(userId, name);

  const updatedUser = await userService.getById(userId);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
