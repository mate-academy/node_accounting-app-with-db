'use strict';

const userService = require('../services/users.service');
const { instanceNotFound } = require('../utils/instanceNotFound');
const { invalidRequestData } = require('../utils/invalidRequestData');

const get = async(req, res) => {
  const allUsers = await userService.getAll();

  res.send(allUsers.map(user => userService.normalize(user)));
};

const getOne = async(req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  if (!user) {
    return instanceNotFound(res, 'User');
  }

  res.send(userService.normalize(user));
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return invalidRequestData(res, 'name');
  }

  const newUser = await userService.create(name);

  return res.status(201).json(userService.normalize(newUser));
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!(await userService.getById(id))) {
    return instanceNotFound(res, 'User');
  }

  await userService.remove(id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.normalize(await userService.getById(id));

  if (!name || typeof name !== 'string') {
    return invalidRequestData(res, 'name');
  }

  if (!user) {
    return instanceNotFound(res, 'User');
  }

  await userService.update(id, name);

  const updatedUser = userService.normalize(await userService.getById(id));

  res.send(updatedUser);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
