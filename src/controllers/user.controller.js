'use strict';

const userService = require('../services/user.service');

const getUsers = async(req, res) => {
  const users = await userService.getUsers();

  res.status(200).send(
    users.map(user => userService.normalize(user))
  );
};

const getUser = async(req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.status(200).send(userService.normalize(user));
};

const createUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.postUser(name);

  res.status(201).send(userService.normalize(newUser));
};

const deleteUser = async(req, res) => {
  const { id } = req.params;

  if (!userService.getUserById(id)) {
    res.sendStatus(404);

    return;
  }

  await userService.removeUser(id);

  res.status(204);
};

const updateUser = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  await userService.updateUser({
    id: id, name,
  });

  const updatedUser = await userService.getById(id);

  res.status(200).send(userService.normalize(updatedUser));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
