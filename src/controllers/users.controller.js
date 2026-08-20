'use strict';

const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
};

const getOne = async (req, res) => {
  const user = await usersService.getById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersService.create(name);

  res.status(201).json(user);
};

const update = async (req, res) => {
  const user = await usersService.getById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  await usersService.update(user, req.body.name);

  res.json(user);
};

const remove = async (req, res) => {
  const user = await usersService.getById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  await usersService.remove(user);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
