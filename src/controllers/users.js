'use strict';

const usersServise = require('../services/users.js');

const getAll = (req, res) => {
  const users = usersServise.getAll();

  res.send(users);
};

const getOne = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersServise.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(foundUser);
};

const add = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = usersServise.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

const remove = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersServise.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  usersServise.remove(userId);
  res.sendStatus(204);
};

const update = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const foundUser = usersServise.getById(userId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;

  if (!name && typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const updatedUser = usersServise.update({
    id: userId,
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
