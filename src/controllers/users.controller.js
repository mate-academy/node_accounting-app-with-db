'use strict';

const userServices = require('../sevices/users.service');

const getAll = (req, res) => {
  res.send(userServices.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = userServices.getById(id);

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

    return;
  }

  const user = userServices.create(name);

  res.statusCode = 201;
  res.send(user);
};

const update = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userServices.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  const updatedUser = userServices.update({
    id,
    name,
  });

  res.send(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userServices.getById(id)) {
    res.sendStatus(404);

    return;
  }

  userServices.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
