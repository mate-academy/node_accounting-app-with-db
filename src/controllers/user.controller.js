'use strict';

const userService = require('../services/user.service');

const NOT_FOUND_CODE = 404;
const NOT_FOUND_MESSAGE = 'Expected entity does not exist';
const REQUIRED_CODE = 400;
const REQUIRED_MESSAGE = 'Required parameter is not passed';

const getAll = async(req, res) => {
  const users = await userService.getAllUsers();

  res.send(users.map(user => userService.normalize(user)));
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

  res.send(userService.normalize(user));
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
    id,
    name,
  });

  res.send(userService.normalize(user));
};

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
};
