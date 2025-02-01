'use strict';

const userService = require('../services/user.service');

const get = async (req, res) => {
  const users = await userService.getAll();

  res.statusCode = 200;
  res.send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.getByID(id);

  if (!newUser) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(newUser);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!(await userService.getByID(id))) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!(await userService.getByID(id))) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await userService.update({ id, name });

  res.statusCode = 200;
  res.send(updatedUser);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
