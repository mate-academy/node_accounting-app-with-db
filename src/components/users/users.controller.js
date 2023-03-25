'use strict';

const usersService = require('./users.service');

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  const newUser = await usersService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const getAll = async(req, res) => {
  const users = await usersService.findAll();

  if (!users) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(users);
};

const getUserById = async(req, res) => {
  const { id } = req.params;

  const user = await usersService.findByUserId(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(user);
};

const update = async(req, res) => {
  const { id } = req.params;

  const user = await usersService.findByUserId(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name) {
    res.sendStatus(422);

    return;
  }

  await usersService.updateByUserId(id, name);

  res.statusCode = 200;
  res.send();
};

const remove = async(req, res) => {
  const { id } = req.params;

  const user = await usersService.findByUserId(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await usersService.removeByUserId(id);

  res.statusCode = 204;
  res.send();
};

module.exports = {
  create,
  getAll,
  getUserById,
  update,
  remove,
};
