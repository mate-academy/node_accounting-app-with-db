'use strict';

const userService = require('./../services/users.service');
const { notFoundResponse } = require('./../helpers/notFoundResponse');
const { badRequestResponse } = require('./../helpers/badRequestResponse');

const get = (req, res) => {
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;

  const user = userService.getById(id);

  if (!user) {
    return notFoundResponse(res, 'User');
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return badRequestResponse(res, 'name', 'string');
  }

  const newUser = userService.create(name);

  return res.status(201).json(newUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    return notFoundResponse(res, 'User');
  }

  userService.remove(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getById(id);

  if (!name || typeof name !== 'string') {
    return badRequestResponse(res, 'name', 'string');
  }

  if (!user) {
    return notFoundResponse(res, 'User');
  }

  userService.update(id, name);

  res.send(user);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
