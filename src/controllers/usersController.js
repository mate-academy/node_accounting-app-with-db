'use strict';

const usersService = require('../services/usersService');

const getAll = async(req, res) => {
  const users = await usersService.getAllUsers();

  res.json(users);
};

const getOne = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersService.createUser(name);

  res.status(201).send(newUser);
};

const remove = async(req, res) => {
  const { userId } = req.params;
  const foundUser = await usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await usersService.removeUser(userId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name || !userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await usersService.getUserById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await usersService.updateUser(userId, name);

  const updatedUser = await usersService.getUserById(userId);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
