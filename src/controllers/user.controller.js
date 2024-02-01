'use strict';

const userService = require('../services/user.service');

const get = async(req, res) => {
  res.send(await userService.getAllUsers());
};

const getOne = async(req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const post = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.createUser(name);

  res.status(201).send(newUser);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = await userService.updateUser(id, name);

  res.send(updatedUser);
};

const remove = async(req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.deleteUser(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  post,
  update,
  remove,
};
