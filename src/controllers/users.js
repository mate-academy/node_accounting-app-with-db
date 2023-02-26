'use strict';

const usersService = require('../services/users');

const getAll = async(req, res) => {
  const users = await usersService.getAll();

  res.send(users.map(usersService.normalize));
};

const findById = async(req, res) => {
  const { userId } = req.params;
  const wantedUser = await usersService.findById(userId);

  if (!wantedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(usersService.normalize(wantedUser));
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersService.create(name);

  res.statusCode = 201;
  res.send(usersService.normalize(newUser));
};

const update = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const wantedUser = await usersService.findById(userId);

  if (!wantedUser) {
    res.sendStatus(404);

    return;
  }

  if (!name) {
    res.sendStatus(400);

    return;
  }

  await usersService.update(userId, name);

  res.send(usersService.normalize(wantedUser));
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const userToDelete = await usersService.findById(userId);

  if (!userToDelete) {
    res.sendStatus(404);

    return;
  }

  await usersService.remove(userId);
  res.sendStatus(204);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};
