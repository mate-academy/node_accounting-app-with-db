'use strict';

const usersServices = require('../services/users.services');

const get = (req, res) => {
  res.send(usersServices.getAllUsers());
};

const getOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  const user = usersServices.getByIdUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const user = usersServices.createUser(name);

  res.statusCode = 201;
  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = usersServices.getByIdUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  usersServices.updateUser(id, name);

  res.send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = usersServices.getByIdUser(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  usersServices.deleteUser(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
