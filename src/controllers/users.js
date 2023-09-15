'use strict';

const usersService = require('../services/users.js');

const getAll = async(req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

const getOne = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const getUsersById = await usersService.getById(parseInt(userId));

  if (!getUsersById) {
    res.sendStatus(404);

    return;
  }

  res.send(getUsersById);
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersService.create(name);

  res.status(201).send(newUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const getUsersById = await usersService.getById(parseInt(userId));

  if (!getUsersById) {
    res.sendStatus(404);

    return;
  }

  await usersService.remove(parseInt(userId));
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const getUsersById = await usersService.getById(parseInt(userId));

  if (!getUsersById) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name && typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = await usersService.update({
    id: parseInt(userId),
    name,
  });

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
