'use strict';

const userService = require('../services/user.service');

const getUsers = async(req, res) => {
  res.send(await userService.getAll());
};

const getUser = async(req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const createUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.create(name);

  res.status(201).send(newUser);
};

const removeUser = async(req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(id);

  res.sendStatus(204);
};

const updateUser = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const updetedUser = await userService.update(id, name);

  res.send(updetedUser);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  removeUser,
  updateUser,
};
