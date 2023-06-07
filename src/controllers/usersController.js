'use strict';

const userService = require('../services/users');

const getAll = async(req, res) => {
  const users = await userService.getUsers();

  res.send(users);
};

const getOne = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(200);
  res.send(foundUser);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.createUser(name);

  res.sendStatus(201);
  res.send(newUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await userService.getUser(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(userId);

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

  const updateUser = await userService.update({
    id: userId,
    name,
  });

  res.sendStatus(200);
  res.send(updateUser);
};

module.exports = {
  getAll,
  getOne,
  remove,
  update,
  create,
};
