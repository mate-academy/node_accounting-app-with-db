'use strict';

const userService = require('./../services/users.service');
const { notFoundResponse } = require('./../helpers/notFoundResponse');
const { badRequestResponse } = require('./../helpers/badRequestResponse');

const get = async(req, res) => {
  res.send(await userService.getAll());
};

const getOne = async(req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  if (!user) {
    return notFoundResponse(res, 'User');
  }

  res.send(user);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return badRequestResponse(res, 'name', 'string');
  }

  const newUser = await userService.create(name);

  return res.status(201).json(newUser);
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!(await userService.getById(id))) {
    return notFoundResponse(res, 'User');
  }

  await userService.remove(id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return badRequestResponse(res, 'name', 'string');
  }

  if (!(await userService.getById(id))) {
    return notFoundResponse(res, 'User');
  }

  await userService.update(id, name);

  res.send(await userService.getById(id));
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
