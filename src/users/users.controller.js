'use strict';

const usersController = require('./users.services');

const getAll = async(req, res) => {
  res.status(200).send(await usersController.getAll());
};

const getById = async(req, res) => {
  const user = await usersController.getByID(req.params.id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(user);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersController.create(name);

  res.status(201).send(newUser);
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!(await usersController.getByID(id))) {
    res.sendStatus(404);

    return;
  }

  await usersController.remove(id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  if (!(await usersController.getByID(id))) {
    res.sendStatus(404);

    return;
  }

  const user = await usersController.update(id, name);

  res.status(204).send(user);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
