'use strict';

const userService = require('../services/user.service');

const get = async(req, res) => {
  res.send(await userService.getAll());
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await userService.create(name);

  res.status(201).json(user);
};

const getOne = async(req, res) => {
  const id = parseInt(req.params.id);
  const neededUser = await userService.getOne(id);

  if (!neededUser) {
    return res.sendStatus(404);
  }

  res.status(200).send(neededUser);
};

const remove = async(req, res) => {
  const id = parseInt(req.params.id);
  const user = await userService.getOne(id);

  if (!user) {
    return res.sendStatus(404);
  }

  await userService.remove(id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const user = await userService.getOne(id);

  if (typeof name !== 'string' || !name.length) {
    return res.sendStatus(400);
  }

  if (!user) {
    return res.sendStatus(404);
  }

  const [, updatedUser] = await userService.update(id, name);

  res.status(200).json(updatedUser);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
