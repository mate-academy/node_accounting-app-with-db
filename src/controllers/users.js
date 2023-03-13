'use strict';

const usersService = require('../services/users');
const { ApiError } = require('../exceptions/ApiError');

const getAll = async(req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

const getById = async(req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);

  if (!user) {
    throw ApiError.NotFound();
  }

  res.send(user);
};

const add = async(req, res) => {
  const data = req.body;
  const user = await usersService.add(data);

  res.status(201).send(user);
};

const remove = async(req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);

  if (!user) {
    throw ApiError.NotFound();
  }

  await usersService.remove(id);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const data = req.body;
  const user = await usersService.update(id, data);

  if (!user) {
    throw ApiError.NotFound();
  }

  res.send(user);
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
