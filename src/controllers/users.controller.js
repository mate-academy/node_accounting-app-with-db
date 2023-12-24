'use strict';

const userService = require('../services/users.service');

const get = (req, res) => {
  res.send(userService.getUsers());
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = userService.createUser(name);

  res.sendStatus(201);
  res.send(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  userService.deleteUser(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    res.sendStatus(400);
  }

  if (!userService.getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = userService.updateUser({
    id, name,
  });

  res.sendStatus(201);
  res.send(updatedUser);
};

module.exports = {
  get, getOne, create, remove, update,
};
