'use strict';

const userService = require('../services/user.service');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const foundUser = await userService.getUserById(id);

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

  res.status(201).send(newUser);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name: editedName } = req.body;

  if (typeof editedName !== 'string' || !editedName) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = await userService.updateUser(id, editedName);

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(updatedUser);
};

const remove = async(req, res) => {
  const { id } = req.params;
  const foundUser = await userService.getUserById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userService.removeUser(id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
