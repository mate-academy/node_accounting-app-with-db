'use strict';

const userService = require('../services/user.service');
const { statusCode } = require('../statusCodes');

const get = async (req, res) => {
  res.send(await userService.getAllUsers());
};

const getOne = async (req, res) => {
  const { id } = req.params || undefined;

  const user = await userService.getUserById(id);

  if (!user) {
    res.status(statusCode.NOT_FOUND).send();
  } else {
    res.send(user);
  }
};

const create = async (req, res) => {
  const { name } = req.body || undefined;

  if (typeof name !== 'string') {
    res.status(statusCode.BAD_REQUEST);
    res.send();

    return;
  }

  const user = await userService.createUser(name);

  res.status(statusCode.CREATED);
  res.send(user);
};

const update = async (req, res) => {
  const { id } = req.params || undefined;
  const { name } = req.body || undefined;

  if (typeof name !== 'string') {
    res.status(statusCode.NOT_FOUND);
    res.send();

    return;
  }

  await userService.updateUser(id, name);

  res.send(await userService.getUserById(id));
};

const remove = async (req, res) => {
  const { id } = req.params || undefined;

  if (userService.getUserById(id) !== null) {
    await userService.deleteUser(id);
    res.status(statusCode.NO_CONTENT).send();
  } else {
    res.status(statusCode.NOT_FOUND).send();
  }
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
