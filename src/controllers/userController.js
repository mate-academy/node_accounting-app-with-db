'use strict';

const userService = require('../services/userService');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.send(user);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.create(name);

  res.statusCode = 201;

  res.send(user);
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.update(id, name);

  res.sendStatus(200);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
