'use strict';

const userService = require('./../services/user.service');

const getAll = async(req, res) => {
  return res.send(await userService.getAll());
};

const getOne = async(req, res) => {
  const { id } = req.params;

  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.send(await user);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = userService.create(name);

  res.statusCode = 201;

  return res.send(await user);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const user = userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  userService.update(id, name);

  return res.send(await user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    return res.sendStatus(404);
  }

  userService.remove(id);

  return res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
