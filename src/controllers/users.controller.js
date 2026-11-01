'use strict';

const usersService = require('../services/users.service');

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await usersService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
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
  const { id } = req.params;
  const { name } = req.body;

  const user = await usersService.update(id, name);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const deleted = await usersService.remove(id);

  if (!deleted) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

module.exports = {
  getOne,
  getAll,
  create,
  update,
  remove,
};
