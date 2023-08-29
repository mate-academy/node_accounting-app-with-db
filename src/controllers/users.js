'use strict';

const usersService = require('../services/users');

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.create(req.body);

  res.statusCode = 201;
  res.send(user);
};

const getAll = async(req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

const getById = async(req, res) => {
  const foundUser = await usersService.getById(req.params.userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersService.remove(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;

  const foundUser = await usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await usersService.update(userId, req.body);

  res.send(updatedUser);
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
