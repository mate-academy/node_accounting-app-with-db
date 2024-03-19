'use strict';

const { NOT_FOUND, BAD_REQUEST, NO_CONTENT, CREATED } = require('../constants');

const userService = require('../services/users.service');

const getAll = async (req, res) => {
  res.send(await userService.getAllUsers());
};

const getOneUser = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (!user) {
    res.status(NOT_FOUND).send();

    return;
  }

  res.send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.status(BAD_REQUEST).send();

    return;
  }

  const user = await userService.createUser(name);

  res.status(CREATED).send(user);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name || !id || typeof name !== 'string') {
    res.sendStatus(BAD_REQUEST);
  }

  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  const updatedUser = await userService.updateUser(id, name);

  res.send(updatedUser);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) {
    res.status(NOT_FOUND).send();

    return;
  }

  await userService.removeUser(+id);
  res.status(NO_CONTENT).send();
};

module.exports = {
  getAll,
  getOneUser,
  create,
  update,
  remove,
};
