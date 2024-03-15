'use strict';

const userService = require('../services/user.service');
const { NOT_FOUND, BAD_REQUEST, NO_CONTENT, CREATED } = require('../variables');

const get = async (req, res) => {
  res.send(await userService.getAllUsers());
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const user = await userService.createUser(name);

  res.status(CREATED).send(user);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  await userService.deleteUser(id);
  res.sendStatus(NO_CONTENT);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  const updatedUser = await userService.updateUser(id, name);

  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
