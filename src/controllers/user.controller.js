'use strict';

const userService = require('../services/user.service');

const NOT_FOUND_CODE = 404;
const NOT_FOUND_MESSAGE = 'Expected entity does not exist';
const REQUIRED_CODE = 400;
const REQUIRED_MESSAGE = 'Required parameter is not passed';

const getAll = (req, res) => {
  res.send(userService.getAllUsers());
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(REQUIRED_CODE).send(REQUIRED_MESSAGE);

    return;
  }

  res.statusCode = 201;
  res.send(userService.createUser(name));
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getUser(id);

  if (!user) {
    res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

    return;
  }

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getUser(id)) {
    res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

    return;
  }

  userService.deleteUser(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getUser(id);

  if (!user) {
    res.status(NOT_FOUND_CODE).send(NOT_FOUND_MESSAGE);

    return;
  }

  if (!name) {
    res.status(REQUIRED_CODE).send(REQUIRED_MESSAGE);

    return;
  }

  userService.updateUser({
    user,
    name,
  });

  res.send(user);
};

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
};
