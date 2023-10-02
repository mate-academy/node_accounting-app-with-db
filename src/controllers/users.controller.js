'use strict';

const usersServices = require('../services/users.service');

const get = async(req, res) => {
  const users = await usersServices.getAllUsers();

  res.send(users
    .map(user => usersServices.normalizeUser(user)));
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  const user = await usersServices.getByIdUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(usersServices.normalizeUser(user));
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const user = await usersServices.createUser(name);

  res.statusCode = 201;
  res.send(usersServices.normalizeUser(user));
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!await usersServices.getByIdUser(id)) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = await usersServices.updateUser(id, name);

  res.send(usersServices.normalizeUser(updatedUser));
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!await usersServices.getByIdUser(id)) {
    res.sendStatus(404);

    return;
  }

  await usersServices.deleteUser(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
